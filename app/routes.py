from flask import Blueprint, request, jsonify
from app.models import Companies
from app import db

# Importing filter functions from filters.py
from app.filters import (
    apply_oda_sicil_no_filters,
    apply_ticari_sicil_no_filters,
    apply_meslek_grubu_adi_filters,
    apply_ilce_adi_filters,
    apply_mahalle_adi_filters,
    apply_unvani_filters,
    apply_tescilli_adresi_filters,
    apply_sirket_turu_filters,
    apply_meslek_grubu_numarasi_filters,
)

# Creating a Blueprint
main = Blueprint('main', __name__)

@main.route('/search', methods=['GET'])
def search():
    filters = request.args.to_dict()
    results = search_companies(**filters)
    return jsonify([result.__dict__ for result in results])

# Burasının değiştirilmesi lazım, userdan aynı zamanda büyük on off tuşu bilgisi gelecek, 
    # filters kısmında o yüzden filters.get ile alakalı bir if block sekansı oluşturalım ona göre uygulayacak filtreleri.
    
def search_companies(**filters):
    query = Companies.query

    # Apply all the filtering functions
    query = apply_oda_sicil_no_filters(query, filters)
    query = apply_ticari_sicil_no_filters(query, filters)
    query = apply_meslek_grubu_adi_filters(query, filters)
    query = apply_ilce_adi_filters(query, filters)
    query = apply_mahalle_adi_filters(query, filters)
    query = apply_unvani_filters(query, filters)
    query = apply_tescilli_adresi_filters(query, filters)
    query = apply_sirket_turu_filters(query, filters)
    query = apply_meslek_grubu_numarasi_filters(query, filters)

    # Return the filtered results
    return query.all()
