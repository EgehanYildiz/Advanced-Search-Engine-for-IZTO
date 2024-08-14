import os
import pandas as pd

# File Description: This file converts all the excel files into CSV format so that we can automate database integration.

directory = r'C:\Users\CASPER\Desktop\2-3. sınıf stajı\MyFlaskProject\Temizlenmiş Üye Bilgi Liste'

csv_directory = os.path.join(os.path.dirname(directory), 'CSV Temizlenmiş Üye Bilgi Liste')

if not os.path.exists(csv_directory):
    os.makedirs(csv_directory)

def convert_excel_to_csv(directory, csv_directory):
    for filename in os.listdir(directory):
        if filename.endswith('.xlsx'):
            file_path = os.path.join(directory, filename)
            df = pd.read_excel(file_path)
            
            komite_no = filename.split(" - ")[1].replace(".xlsx", "").strip()
            csv_filename = f'CSV Temizlenmiş Üye Bilgi Liste - {komite_no}.csv'
            csv_file_path = os.path.join(csv_directory, csv_filename)
            
            df.to_csv(csv_file_path, index=False, encoding='utf-8-sig')
            print(f"Converted {filename} to {csv_filename} and saved to {csv_directory}")

convert_excel_to_csv(directory, csv_directory)
