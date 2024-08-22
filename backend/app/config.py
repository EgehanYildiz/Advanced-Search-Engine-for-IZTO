#config.py

import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL', 
        'mysql+pymysql://admin:egehan2004@advance-search-iztodb.cd2myey0qssm.eu-north-1.rds.amazonaws.com/iztoDb'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
