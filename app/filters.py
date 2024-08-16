from app.models import Companies
from sqlalchemy import func

def apply_oda_sicil_no_filters(query, filters):
    if filters.get('oda_sicil_no_contains'):
        query = query.filter(Companies.oda_sicil_no.like(f"%{filters['oda_sicil_no_contains']}%"))
    if filters.get('oda_sicil_no_not_contains'):
        query = query.filter(~Companies.oda_sicil_no.like(f"%{filters['oda_sicil_no_not_contains']}%"))
    if filters.get('oda_sicil_no_start'):
        query = query.filter(Companies.oda_sicil_no.like(f"{filters['oda_sicil_no_start']}%"))
    if filters.get('oda_sicil_no_end'):
        query = query.filter(Companies.oda_sicil_no.like(f"%{filters['oda_sicil_no_end']}"))
    if filters.get('oda_sicil_no_exact'):
        query = query.filter(Companies.oda_sicil_no == filters['oda_sicil_no_exact'])
    if filters.get('oda_sicil_no_length'):
        query = query.filter(func.length(Companies.oda_sicil_no) == filters['oda_sicil_no_length'])
    return query

def apply_ticari_sicil_no_filters(query, filters):
    if filters.get('ticari_sicil_no_contains'):
        query = query.filter(Companies.ticari_sicil_no.like(f"%{filters['ticari_sicil_no_contains']}%"))
    if filters.get('ticari_sicil_no_not_contains'):
        query = query.filter(~Companies.ticari_sicil_no.like(f"%{filters['ticari_sicil_no_not_contains']}%"))
    if filters.get('ticari_sicil_no_start'):
        query = query.filter(Companies.ticari_sicil_no.like(f"{filters['ticari_sicil_no_start']}%"))
    if filters.get('ticari_sicil_no_end'):
        query = query.filter(Companies.ticari_sicil_no.like(f"%{filters['ticari_sicil_no_end']}"))
    if filters.get('ticari_sicil_no_exact'):
        query = query.filter(Companies.ticari_sicil_no == filters['ticari_sicil_no_exact'])
    if filters.get('ticari_sicil_no_length'):
        query = query.filter(func.length(Companies.ticari_sicil_no) == filters['ticari_sicil_no_length'])
    return query

def apply_meslek_grubu_adi_filters(query, filters):
    if filters.get('meslek_grubu_adi_contains'):
        query = query.filter(Companies.meslek_grubu_adi.like(f"%{filters['meslek_grubu_adi_contains']}%"))
    if filters.get('meslek_grubu_adi_not_contains'):
        query = query.filter(~Companies.meslek_grubu_adi.like(f"%{filters['meslek_grubu_adi_not_contains']}%"))
    if filters.get('meslek_grubu_adi_start'):
        query = query.filter(Companies.meslek_grubu_adi.like(f"{filters['meslek_grubu_adi_start']}%"))
    if filters.get('meslek_grubu_adi_end'):
        query = query.filter(Companies.meslek_grubu_adi.like(f"%{filters['meslek_grubu_adi_end']}"))
    if filters.get('meslek_grubu_adi_exact'):
        query = query.filter(Companies.meslek_grubu_adi == filters['meslek_grubu_adi_exact'])
    if filters.get('meslek_grubu_adi_length'):
        query = query.filter(func.length(Companies.meslek_grubu_adi) == filters['meslek_grubu_adi_length'])
    return query

def apply_ilce_adi_filters(query, filters):
    if filters.get('ilce_adi_contains'):
        query = query.filter(Companies.ilce_adi.like(f"%{filters['ilce_adi_contains']}%"))
    if filters.get('ilce_adi_not_contains'):
        query = query.filter(~Companies.ilce_adi.like(f"%{filters['ilce_adi_not_contains']}%"))
    if filters.get('ilce_adi_start'):
        query = query.filter(Companies.ilce_adi.like(f"{filters['ilce_adi_start']}%"))
    if filters.get('ilce_adi_end'):
        query = query.filter(Companies.ilce_adi.like(f"%{filters['ilce_adi_end']}"))
    if filters.get('ilce_adi_exact'):
        query = query.filter(Companies.ilce_adi == filters['ilce_adi_exact'])
    if filters.get('ilce_adi_length'):
        query = query.filter(func.length(Companies.ilce_adi) == filters['ilce_adi_length'])
    return query

def apply_mahalle_adi_filters(query, filters):
    if filters.get('mahalle_adi_contains'):
        query = query.filter(Companies.mahalle_adi.like(f"%{filters['mahalle_adi_contains']}%"))
    if filters.get('mahalle_adi_not_contains'):
        query = query.filter(~Companies.mahalle_adi.like(f"%{filters['mahalle_adi_not_contains']}%"))
    if filters.get('mahalle_adi_start'):
        query = query.filter(Companies.mahalle_adi.like(f"{filters['mahalle_adi_start']}%"))
    if filters.get('mahalle_adi_end'):
        query = query.filter(Companies.mahalle_adi.like(f"%{filters['mahalle_adi_end']}"))
    if filters.get('mahalle_adi_exact'):
        query = query.filter(Companies.mahalle_adi == filters['mahalle_adi_exact'])
    if filters.get('mahalle_adi_length'):
        query = query.filter(func.length(Companies.mahalle_adi) == filters['mahalle_adi_length'])
    return query

def apply_unvani_filters(query, filters):
    if filters.get('unvani_contains'):
        query = query.filter(Companies.unvani.like(f"%{filters['unvani_contains']}%"))
    if filters.get('unvani_not_contains'):
        query = query.filter(~Companies.unvani.like(f"%{filters['unvani_not_contains']}%"))
    if filters.get('unvani_exact'):
        query = query.filter(Companies.unvani == filters['unvani_exact'])
    return query

def apply_tescilli_adresi_filters(query, filters):
    if filters.get('tescilli_adresi_contains'):
        query = query.filter(Companies.tescilli_adresi.like(f"%{filters['tescilli_adresi_contains']}%"))
    if filters.get('tescilli_adresi_not_contains'):
        query = query.filter(~Companies.tescilli_adresi.like(f"%{filters['tescilli_adresi_not_contains']}%"))
    if filters.get('tescilli_adresi_exact'):
        query = query.filter(Companies.tescilli_adresi == filters['tescilli_adresi_exact'])
    return query

def apply_sirket_turu_filters(query, filters):
    sirket_turu_filters = []
    if filters.get('sirket_turu_anonim'):
        sirket_turu_filters.append('ANONİM')
    if filters.get('sirket_turu_limited'):
        sirket_turu_filters.append('LİMİTED')
    if sirket_turu_filters:
        query = query.filter(Companies.sirket_turu.in_(sirket_turu_filters))    
    return query

def apply_meslek_grubu_numarasi_filters(query, filters):
    if filters.get('meslek_grubu_numarasi_equals'):
        query = query.filter(Companies.meslek_grubu_numarasi == int(filters['meslek_grubu_numarasi_equals']))
    if filters.get('meslek_grubu_numarasi_before'):
        query = query.filter(Companies.meslek_grubu_numarasi < int(filters['meslek_grubu_numarasi_before']))
    if filters.get('meslek_grubu_numarasi_after'):
        query = query.filter(Companies.meslek_grubu_numarasi > int(filters['meslek_grubu_numarasi_after']))
    if filters.get('meslek_grubu_numarasi_before_inclusive'):
        query = query.filter(Companies.meslek_grubu_numarasi <= int(filters['meslek_grubu_numarasi_before_inclusive']))
    if filters.get('meslek_grubu_numarasi_after_inclusive'):
        query = query.filter(Companies.meslek_grubu_numarasi >= int(filters['meslek_grubu_numarasi_after_inclusive']))
    if filters.get('meslek_grubu_numarasi_between'):
        lower_bound, upper_bound = map(int, filters['meslek_grubu_numarasi_between'].split('-'))
        query = query.filter(Companies.meslek_grubu_numarasi > lower_bound, Companies.meslek_grubu_numarasi < upper_bound)
    if filters.get('meslek_grubu_numarasi_between_inclusive'):
        lower_bound, upper_bound = map(int, filters['meslek_grubu_numarasi_between_inclusive'].split('-'))
        query = query.filter(Companies.meslek_grubu_numarasi >= lower_bound, Companies.meslek_grubu_numarasi <= upper_bound)
    return query
