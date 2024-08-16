#router.py
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
    return jsonify([result.as_dict() for result in results])

def search_companies(**filters):
    query = Companies.query

    print("oda_sicil_no_enabled:", filters.get('oda_sicil_no_enabled', 'false'))
    print("ticari_sicil_no_enabled:", filters.get('ticari_sicil_no_enabled', 'false'))
    print("meslek_grubu_adi_enabled:", filters.get('meslek_grubu_adi_enabled', 'false'))
    print("ilce_adi_enabled:", filters.get('ilce_adi_enabled', 'false'))
    print("mahalle_adi_enabled:", filters.get('mahalle_adi_enabled', 'false'))
    print("unvani_enabled:", filters.get('unvani_enabled', 'false'))
    print("tescilli_adresi_enabled:", filters.get('tescilli_adresi_enabled', 'false'))
    print("sirket_turu_enabled:", filters.get('sirket_turu_enabled', 'false'))
    print("meslek_grubu_numarasi_enabled:", filters.get('meslek_grubu_numarasi_enabled', 'false'))
    
    if filters.get('oda_sicil_no_enabled', 'false').lower() == 'true':
        query = apply_oda_sicil_no_filters(query, filters)
    
    if filters.get('ticari_sicil_no_enabled', 'false').lower() == 'true':
        query = apply_ticari_sicil_no_filters(query, filters)
    
    if filters.get('meslek_grubu_adi_enabled', 'false').lower() == 'true':
        query = apply_meslek_grubu_adi_filters(query, filters)
    
    if filters.get('ilce_adi_enabled', 'false').lower() == 'true':
        query = apply_ilce_adi_filters(query, filters)
    
    if filters.get('mahalle_adi_enabled', 'false').lower() == 'true':
        query = apply_mahalle_adi_filters(query, filters)
    
    if filters.get('unvani_enabled', 'false').lower() == 'true':
        query = apply_unvani_filters(query, filters)
    
    if filters.get('tescilli_adresi_enabled', 'false').lower() == 'true':
        query = apply_tescilli_adresi_filters(query, filters)
    
    if filters.get('sirket_turu_enabled', 'false').lower() == 'true':
        query = apply_sirket_turu_filters(query, filters)
    
    if filters.get('meslek_grubu_numarasi_enabled', 'false').lower() == 'true':
        query = apply_meslek_grubu_numarasi_filters(query, filters)

    # Return the filtered results
    return query.all()



