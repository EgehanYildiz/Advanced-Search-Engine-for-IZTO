#__init__.py

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from app.config import Config

db = SQLAlchemy() # -> a popular Object-Relational Mapping (ORM) library for Python, yani databasedeki şeyleri class'a maplicek.
# Database connection for the app.

# Application factory. Flask uygulamalarında, uygulamanın kendisini oluşturmak için iyi bir practice olarak geçer.
# Çokça kullanılır, özellikle development, production ve deployment safhaları olan uygulamalar için scalable bir yapı sağlar.
# Aynı zamanda modüler kılar işleri tek bir yerde konfigürasyonların oluşturup uygulamanın yönetilmesini ve en sonda return edilmesini sağlar.
# Bundan sonra ise run.py'a aslında bir app oluşturuyor olacağız. Yani aslında run.py çalıştırıldığında app instance'ı ile çalışacak
# App instance'ını oluşturan create_app içerisinde ise app zaten konfigüre bir şekilde iletilecek run.py'a bu sayede modüler ve yönlendirmeli bir yapı ile uygulama kurulacak.

def create_app():
    app = Flask(__name__)
    CORS(app)  # This will enable CORS for all routes
    app.config.from_object(Config) # -> imports your configuration settings from a Config class, bu class içerisinde database'e bağlanmak için gereken bilgileri taşıyor.

    # Importing the models, SQLAlchemy might not know about your models.
    from app.models import Companies
    
    db.init_app(app) # -> line attaches the db object (our SQLAlchemy instance) to the Flask app.

    # Register Blueprints
    from .routes import main
    app.register_blueprint(main)

    return app
