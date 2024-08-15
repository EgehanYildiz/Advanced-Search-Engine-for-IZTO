from flask import Blueprint, request, jsonify
from app.models import Companies
from app import db

main = Blueprint('main', __name__)

@main.route('/api/companies/search', methods=['GET'])
def search_companies():
    query = Companies.query

    # Oda Sicil No Filter
    oda_sicil_no_starts = request.args.get('oda_sicil_no_starts', None)
    if oda_sicil_no_starts:
        query = query.filter(Companies.oda_sicil_no.startswith(oda_sicil_no_starts))

    # Ticari Sicil No Filter
    ticari_sicil_no_starts = request.args.get('ticari_sicil_no_starts', None)
    if ticari_sicil_no_starts:
        query = query.filter(Companies.ticari_sicil_no.startswith(ticari_sicil_no_starts))

    # Şirket Türü Filter
    sirket_turu = request.args.get('sirket_turu', None)
    if sirket_turu:
        query = query.filter(Companies.sirket_turu == sirket_turu)

    # Diğer filtreleme koşulları buraya eklenecek...

    # Sonuçları döndür
    results = query.all()
    results_list = [
        {
            "oda_sicil_no": company.oda_sicil_no,
            "ticari_sicil_no": company.ticari_sicil_no,
            "meslek_grubu_numarasi": company.meslek_grubu_numarasi,
            "meslek_grubu_adi": company.meslek_grubu_adi,
            "sirket_turu": company.sirket_turu,
            "mahalle_adi": company.mahalle_adi,
            "ilce_adi": company.ilce_adi,
            "unvani": company.unvani,
            "tescilli_adresi": company.tescilli_adresi,
        }
        for company in results
    ]

    return jsonify(results_list)
