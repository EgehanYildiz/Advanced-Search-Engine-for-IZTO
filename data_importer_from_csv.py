import os
import pandas as pd
import mysql.connector

# Database connection details
db_config = {
    'user': 'root',
    'password': 'egehan2004',
    'host': 'localhost',
    'database': 'iztoDb',
    'raise_on_warnings': True
}

# Path to the directory containing the CSV files
csv_directory = r'C:\Users\CASPER\Desktop\2-3. sınıf stajı\MyFlaskProject\CSV Temizlenmiş Üye Bilgi Liste'

# Establishing the connection to the database
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

# Step 1: Create the table if it doesn't exist
try:
    create_table_query = '''
    CREATE TABLE IF NOT EXISTS şirketler (
        `oda_sicil_no` VARCHAR(255),
        `ticari_sicil_no` VARCHAR(255),
        `sirket_turu` ENUM('ANONİM', 'LİMİTED'),
        `mahalle_adi` VARCHAR(255),
        `ilce_adi` VARCHAR(255),
        `meslek_grubu_numarasi` INT,
        `meslek_grubu_adi` VARCHAR(255),
        `unvani` TEXT,
        `tescilli_adresi` TEXT
    );
    '''
    cursor.execute(create_table_query)
    print("Table 'şirketler' created or already exists.")
except mysql.connector.errors.DatabaseError as e:
    if "1050" in str(e):
        print("Table 'şirketler' already exists. Skipping table creation.")
    else:
        raise

# Step 2: Iterate over all files in the CSV directory
for filename in os.listdir(csv_directory):
    if filename.endswith('.csv'):
        file_path = os.path.join(csv_directory, filename)
        # Read the CSV file
        df = pd.read_csv(file_path)
        
        # Rename the columns to match the SQL table
        df.columns = ['oda_sicil_no', 'ticari_sicil_no', 'sirket_turu', 'mahalle_adi', 
                      'ilce_adi', 'meslek_grubu_numarasi', 
                      'meslek_grubu_adi',  'unvani', 'tescilli_adresi']
        
        # Replace NaN values with None (which is translated to NULL in SQL)
        df = df.where(pd.notnull(df), None)
        
        # Dynamically create the insert query based on the CSV columns
        columns = df.columns.tolist()
        # Enclose each column name in backticks
        columns_string = ', '.join([f"`{col}`" for col in columns])
        values_string = ', '.join(['%s' for _ in columns])
        
        insert_query = f"INSERT INTO şirketler ({columns_string}) VALUES ({values_string})"
        
        # Insert each row into the MySQL table
        for _, row in df.iterrows():
            cursor.execute(insert_query, tuple(row))
        
        # Commit the transaction after each file
        conn.commit()
        print(f"Successfully imported {filename} into the database.")

# Closing the cursor and connection
cursor.close()
conn.close()

print("All CSV files have been successfully imported.")
