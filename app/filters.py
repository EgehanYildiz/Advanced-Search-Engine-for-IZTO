from app.models import Companies
from sqlalchemy import func

def apply_oda_sicil_no_filters(query, filters):
    if filters.get('oda_sicil_no_start'):
        query = query.filter(Companies.oda_sicil_no.like(f"{filters['oda_sicil_no_start']}%"))
    if filters.get('oda_sicil_no_end'):
        query = query.filter(Companies.oda_sicil_no.like(f"%{filters['oda_sicil_no_end']}"))
    if filters.get('oda_sicil_no_contains'):
        query = query.filter(Companies.oda_sicil_no.like(f"%{filters['oda_sicil_no_contains']}%"))
    if filters.get('oda_sicil_no_length'):
        query = query.filter(func.length(Companies.oda_sicil_no) == filters['oda_sicil_no_length'])
    return query

def apply_ticari_sicil_no_filters(query, filters):
    if filters.get('ticari_sicil_no_start'):
        query = query.filter(Companies.ticari_sicil_no.like(f"{filters['ticari_sicil_no_start']}%"))
    if filters.get('ticari_sicil_no_end'):
        query = query.filter(Companies.ticari_sicil_no.like(f"%{filters['ticari_sicil_no_end']}"))
    if filters.get('ticari_sicil_no_contains'):
        query = query.filter(Companies.ticari_sicil_no.like(f"%{filters['ticari_sicil_no_contains']}%"))
    if filters.get('ticari_sicil_no_length'):
        query = query.filter(func.length(Companies.ticari_sicil_no) == filters['ticari_sicil_no_length'])
    return query

# Diğer filtreleme fonksiyonlarını da buraya ekleyebilirsiniz...
