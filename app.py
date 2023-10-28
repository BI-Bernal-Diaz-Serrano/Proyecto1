import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import matplotlib.pyplot as plt
import seaborn as sns
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from flask import Flask, request, jsonify
from flask_cors import CORS

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

app = Flask(__name__)
CORS(app) 
stop_words = set(stopwords.words('spanish'))
lematizador = WordNetLemmatizer()

def tokenizar_y_limpiar(texto):
    texto = texto.lower()
    palabras = word_tokenize(texto)
    palabras = [lematizador.lemmatize(palabra) for palabra in palabras if palabra.isalnum() and palabra not in stop_words]
    return palabras

pipeline = joblib.load('text_classification_pipeline.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data['text']
    prediction = pipeline.predict([text])
    return jsonify({'prediction': str(prediction[0])})  # Convertimos la predicción a string por seguridad.

if __name__ == '__main__':
    app.run(port=5000)
