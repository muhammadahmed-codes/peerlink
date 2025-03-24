import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

def train_model(file_path):
    print("📊 Loading dataset...")
    df = pd.read_csv(file_path)

    X = df[['feature']].values
    y = df['target'].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = LinearRegression()
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    print(f"📈 Model trained with score: {model.score(X_test, y_test):.2f}")

    plt.scatter(X_test, y_test, color='red')
    plt.plot(X_test, y_pred, color='blue')
    plt.title("Linear Regression")
    plt.xlabel("Feature")
    plt.ylabel("Target")
    plt.show()
