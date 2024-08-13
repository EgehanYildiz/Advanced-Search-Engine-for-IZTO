import os
import pandas as pd
import warnings

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
            
            # Add a new column named "Şirket Türü" and assign values
            df_cleaned['Şirket Türü'] = df_cleaned['Ünvanı'].apply(
                lambda x: 'ANONİM' if 'ANONİM' in x else 'LİMİTED' if 'LİMİTED' in x else None
            )
            
            # Add two new columns "Meslek Grubu Sayı" and "Meslek Grubu Adı"
            df_cleaned['Meslek Grubu Numarası'] = df_cleaned['Meslek Grubu'].apply(lambda x: x.split(" - ")[0])
            df_cleaned['Meslek Grubu Adı'] = df_cleaned['Meslek Grubu'].apply(lambda x: x.split(" - ")[1] if ' - ' in x else '')
            
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
            
            # Save the file
            df.to_excel(output_path, index=False)
        except IndexError:
            print(f"File name format is not as expected: {original_filename}. File is skipped.")

########################################## FUNCTIONS AND OBJECTS RELATED TO DATA CLEANING - END ###########################################




# SCRIPT START POINT AND WHERE THE STAGES ARE CALLED ONE BY ONE
if __name__ == "__main__":
    cleaned_data_frames = clean_data()
    save_cleaned_data(cleaned_data_frames)
    print(f"Data cleaning is complete, and the cleaned data has been saved to the '{cleaned_dir}' directory.")
