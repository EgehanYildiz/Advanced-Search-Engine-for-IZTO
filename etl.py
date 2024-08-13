import os
import pandas as pd
import warnings

########################################## VERİYİ TEMİZLEME İLE İLGİLİ FONKSİYONLAR VE OBJELER - START ###########################################3

# Çok fazla uyarı veriyordu, bunu konsolda görmek istemediğim için kapattım
warnings.simplefilter("ignore", UserWarning)

# Script'in bulunduğu dizini alalım ilk önce
current_dir = os.path.dirname(os.path.abspath(__file__))

# Excel dosyalarının bulunduğu dizin, relative path olarak tutulacak çünkü projeyi kendi lokalinde çalıştıran insan için kendi path'imi kullanamam
excel_dir = os.path.join(current_dir, 'Üye Bilgi Liste')

# Temizlenmiş dosyaların kaydedileceği dizin (relative path)
cleaned_dir = os.path.join(current_dir, 'Temizlenmiş Üye Bilgi Liste')

# Eğer 'Temizlenmiş Üye Bilgi Liste' dizini yoksa oluştur
if not os.path.exists(cleaned_dir):
    os.makedirs(cleaned_dir)

def clean_data():
    cleaned_data_frames = []
    for filename in os.listdir(excel_dir):
        if filename.endswith('.xlsx'):
            file_path = os.path.join(excel_dir, filename)
            df = pd.read_excel(file_path)
            
            # "Ünvanı" sütununda "LİMİTED" veya "ANONİM" içermeyen satırları filtreleme
            df_cleaned = df[df['Ünvanı'].str.contains('LİMİTED|ANONİM', na=False)].copy()
            
            # "Şirket Türü" adında yeni bir sütun ekleme ve değerleri atama
            df_cleaned['Şirket Türü'] = df_cleaned['Ünvanı'].apply(
                lambda x: 'ANONİM' if 'ANONİM' in x else 'LİMİTED' if 'LİMİTED' in x else None
            )
            
            # Temizlenmiş DataFrame'i saklama
            cleaned_data_frames.append((df_cleaned, filename))
    
    return cleaned_data_frames

def save_cleaned_data(cleaned_data_frames):
    # Temizlenmiş veriyi yeni Excel dosyalarına kaydet
    for df, original_filename in cleaned_data_frames:
        try:
            # Dosya adını oluştur
            komite_no = original_filename.split(" - ")[1].replace(".xlsx", "").strip()  # Örneğin: '1. komite'
            output_filename = f'Temizlenmiş Üye Bilgi Liste - {komite_no}.xlsx'
            output_path = os.path.join(cleaned_dir, output_filename)
            
            # Dosyayı kaydet
            df.to_excel(output_path, index=False)
        except IndexError:
            print(f"Dosya adı formatı beklenmiyor: {original_filename}. Dosya atlanıyor.")

########################################## VERİYİ TEMİZLEME İLE İLGİLİ FONKSİYONLAR VE OBJELER - END ###########################################3







# SCRIPT BAŞLANGIÇ NOKTASI VE AŞAMALARIN TEK TEK ÇAĞIRILDIĞI YER
if __name__ == "__main__":
    cleaned_data_frames = clean_data()
    save_cleaned_data(cleaned_data_frames)
    print(f"Veri temizleme işlemi tamamlandı ve temizlenmiş veriler '{cleaned_dir}' dizinine kaydedildi.")
