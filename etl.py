import os
import pandas as pd
import warnings
import openpyxl
from openpyxl.styles import Alignment

########################################## FUNCTIONS AND OBJECTS RELATED TO DATA CLEANING - START ###########################################

# Too many warnings were appearing, I disabled them because I didn't want to see them in the console
warnings.simplefilter("ignore", UserWarning)

# First, let's get the directory where the script is located
current_dir = os.path.dirname(os.path.abspath(__file__))

# The directory where the Excel files are located, it will be kept as a relative path because I cannot use my own path for someone running the project on their own local machine
excel_dir = os.path.join(current_dir, 'Üye Bilgi Liste')

# I determined the directory where the cleaned files will be saved this way so that they have a similar name
cleaned_dir = os.path.join(current_dir, 'Temizlenmiş Üye Bilgi Liste')

# If the 'Temizlenmiş Üye Bilgi Liste' folder does not exist, I want it to be created first; this folder will be at the same level as the directory where the script is located.
if not os.path.exists(cleaned_dir):
    os.makedirs(cleaned_dir)

#### MODIFYING AND CLEANING PART ####
def clean_data():
    cleaned_data_frames = []
    for filename in os.listdir(excel_dir):
        if filename.endswith('.xlsx'):
            file_path = os.path.join(excel_dir, filename)
            df = pd.read_excel(file_path)
            
            # Filter rows where the "Ünvanı" column does not contain "LİMİTED" or "ANONİM"
            df_cleaned = df[df['Ünvanı'].str.contains('LİMİTED|ANONİM', na=False)].copy()
            
            # Filter rows where "İZMİR" isn't existent in "Tescilli Adresi Column"
            df_cleaned = df_cleaned[df_cleaned['Tescilli Adresi'].str.contains('İZMİR', na=False)]
            
            # Add a new column named "Şirket Türü" and assign values
            df_cleaned['Şirket Türü'] = df_cleaned['Ünvanı'].apply(
                lambda x: 'ANONİM' if 'ANONİM' in x else 'LİMİTED' if 'LİMİTED' in x else None
            )
            
            # Filter rows where "Tescilli Adresi" column contains "MAH." or "MAHALLESİ"
            df_cleaned = df_cleaned[df_cleaned['Tescilli Adresi'].str.contains(r'MAH\.|MAHALLESİ', na=False)]

            # Extract the neighborhood name (Mahalle Adı) and add a new column for it
            df_cleaned['Mahalle Adı'] = df_cleaned['Tescilli Adresi'].apply(
                lambda x: x.split('MAH.')[0].strip() if 'MAH.' in x else x.split('MAHALLESİ')[0].strip()
            )
            
            # Remove trailing "/" characters from the end of the address
            df_cleaned['Tescilli Adresi'] = df_cleaned['Tescilli Adresi'].apply(
                lambda x: x.strip().rstrip("/").strip()
            )
            
            # Extract the district name (İlçe Adı) by getting the first word before the last "/"
            def extract_district_name(address):
                if '/' in address:
                    parts = address.rsplit('/', 1)[0]  # Split and take the part before the last "/"
                    district_name = parts.strip().split()[-1]  # Take the last word
                    return district_name
                return ''

            df_cleaned['İlçe Adı'] = df_cleaned['Tescilli Adresi'].apply(extract_district_name)
            
            # Drop rows where "İlçe Adı" is empty (NaN)
            df_cleaned = df_cleaned.dropna(subset=['İlçe Adı'])
            
            # Add two new columns "Meslek Grubu Sayı" and "Meslek Grubu Adı"
            df_cleaned['Meslek Grubu Sayı'] = df_cleaned['Meslek Grubu'].apply(lambda x: x.split(" - ")[0])
            df_cleaned['Meslek Grubu Adı'] = df_cleaned['Meslek Grubu'].apply(lambda x: x.split(" - ")[1] if ' - ' in x else '')

            # Move "Ünvanı" and "Tescilli Adresi" columns to the end
            columns_order = [col for col in df_cleaned.columns if col not in ['Ünvanı', 'Tescilli Adresi', 'Meslek Grubu']]
            columns_order.extend(['Ünvanı', 'Tescilli Adresi', 'Meslek Grubu'])
            df_cleaned = df_cleaned[columns_order]
            
            # Store the cleaned DataFrame
            cleaned_data_frames.append((df_cleaned, filename))
    
    return cleaned_data_frames


#### SAVING PART ####
def save_cleaned_data(cleaned_data_frames):
    # Save the cleaned data to new Excel files
    for df, original_filename in cleaned_data_frames:
        try:
            # Generate the file name
            komite_no = original_filename.split(" - ")[1].replace(".xlsx", "").strip()  # Example: '1. komite'
            output_filename = f'Temizlenmiş Üye Bilgi Liste - {komite_no}.xlsx'
            output_path = os.path.join(cleaned_dir, output_filename)
            
            # Ensure only one space between words in the "Tescilli Adresi" column
            df['Tescilli Adresi'] = df['Tescilli Adresi'].apply(lambda x: ' '.join(x.split()))
            
            # Save the file
            with pd.ExcelWriter(output_path, engine='openpyxl') as writer:
                df.to_excel(writer, index=False)
                worksheet = writer.sheets['Sheet1']  # Default sheet name is "Sheet1"
                adjust_columns(worksheet)
        except IndexError:
            print(f"File name format is not as expected: {original_filename}. File is skipped.")

#### HELPER FUNCTION FOR SAVING DATA####
# Purpose: The goal is to make sure that all data is visible and no cells are cut off, without having to manually adjust the column widths.
# Description: The working principle of this function may not be clear to the first observer, especially the column[0].column_letter part may confuse people.
    # At this point it is important to know the following: Each column is assigned a unique letter or combination of letters. In other words, the unique identifiers of the columns are assigned as letter
    # For example: 1st column A, 2nd column B, 3rd C ... 26. Z, 27. AA. In other words, the first letter of the first line of the column is not actually taken as a string value, the unique identifier is being dealt with. 
def adjust_columns(worksheet):
    for column in worksheet.columns:
        max_length = 0
        column_letter = column[0].column_letter 
        for cell in column:
            try:
                if len(str(cell.value)) > max_length:
                    max_length = len(cell.value)
                cell.alignment = Alignment(horizontal='left')
            except:
                pass
        adjusted_width = (max_length + 3)
        worksheet.column_dimensions[column_letter].width = adjusted_width
        
        
        
        
        
        
########################################## FUNCTIONS AND OBJECTS RELATED TO DATA CLEANING - END ###########################################

# SCRIPT START POINT AND WHERE THE STAGES ARE CALLED ONE BY ONE
if __name__ == "__main__":
    cleaned_data_frames = clean_data()
    save_cleaned_data(cleaned_data_frames)
    print(f"Data cleaning is complete, and the cleaned data has been saved to the '{cleaned_dir}' directory.")
