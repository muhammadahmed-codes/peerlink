import pandas as pd

def clean_data(file_path):
    print("📊 Loading data...")
    df = pd.read_csv(file_path)

    print("🔍 Checking for missing values...")
    df.fillna(df.mean(), inplace=True)

    print("✅ Data cleaned successfully!")
    return df
