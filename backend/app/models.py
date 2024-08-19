#models.py
from app import db
from flask_sqlalchemy import SQLAlchemy

""" Every entry in my database is represented as a class in Flask for Object Relational Mapping. 
So, here we need exact matches in data types, we pull the data from 'şirketler' so we defined the tablename like that
which is a special keyword, the other ones are attributes of the class that are pulled from the database that we are connected
from the table 'şirketler' we are looking for exact matches but we're currently just defining the attributes not mapped yet."""

class Companies(db.Model):
    __tablename__ = 'şirketler'

    oda_sicil_no = db.Column(db.String(255), primary_key=True)
    ticari_sicil_no = db.Column(db.String(255), primary_key=True)
    meslek_grubu_numarasi = db.Column(db.Integer)
    meslek_grubu_adi = db.Column(db.String(255))
    sirket_turu = db.Column(db.Enum('ANONİM', 'LİMİTED'))
    mahalle_adi = db.Column(db.String(255))
    ilce_adi = db.Column(db.String(255))
    unvani = db.Column(db.Text)
    tescilli_adresi = db.Column(db.Text)

    def __repr__(self):
        return f'<Company Named: {self.unvani}, that has oda sicil no of: {self.oda_sicil_no} & ticari sicil no of: {self.ticari_sicil_no}>'
    
    def as_dict(self):
            return {
                'oda_sicil_no': self.oda_sicil_no,
                'ticari_sicil_no': self.ticari_sicil_no,
                'meslek_grubu_numarasi': self.meslek_grubu_numarasi,
                'meslek_grubu_adi': self.meslek_grubu_adi,
                'sirket_turu': self.sirket_turu,
                'mahalle_adi': self.mahalle_adi,
                'ilce_adi': self.ilce_adi,
                'unvani': self.unvani,
                'tescilli_adresi': self.tescilli_adresi,
            }
