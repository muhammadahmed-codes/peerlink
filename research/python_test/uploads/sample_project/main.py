import preprocessing
import regression
import image_processing
import nlp_processing

def main():
    print("\n📌 Running Data Preprocessing...")
    preprocessing.clean_data("data.csv")

    print("\n📌 Running Linear Regression...")
    regression.train_model("data.csv")

    print("\n📌 Running Image Processing...")
    image_processing.process_image("sample.jpg")

    print("\n📌 Running NLP Task...")
    nlp_processing.process_text("SpaCy is great for NLP tasks!")

if __name__ == "__main__":
    main()