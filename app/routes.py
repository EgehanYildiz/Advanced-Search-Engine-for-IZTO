from flask import Blueprint, request, jsonify
from app.models import Companies
from app import db



# filters.py dosyasından fonksiyonları import ediyoruz
from app.filters import (
    apply_oda_sicil_no_filters,
    apply_ticari_sicil_no_filters,
    
    # Diğer filtre fonksiyonları da buraya import edilecek...
)



# Blueprint oluşturulması
main = Blueprint('main', __name__)




@main.route('/search', methods=['GET'])
def search():
    # Tüm filtre parametrelerini request'ten al
    filters = request.args.to_dict()

    # Ana sorgu fonksiyonunu kullanarak sonuçları al
    results = search_companies(**filters)

    # Sonuçları JSON formatında döndür
    return jsonify([result.__dict__ for result in results])




def search_companies(**filters):
    query = Companies.query

    # Filtreleme fonksiyonlarını uygula
    query = apply_oda_sicil_no_filters(query, filters)
    query = apply_ticari_sicil_no_filters(query, filters)
    # Diğer filtreleme fonksiyonları burada kullanılacak...

    # Sonuçları döndür
    return query.all()
