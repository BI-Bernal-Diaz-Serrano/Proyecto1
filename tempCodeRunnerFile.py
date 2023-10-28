import requests
import json

# URL del endpoint que deseas probar
URL = "http://127.0.0.1:5000/predict"

# Tu texto de prueba
data = {
    "text": "Aquí va el texto que deseas clasificar"
}

# Hacer la solicitud POST
response = requests.post(URL, json=data)

# Decodificar la respuesta
response_data = response.json()

# Imprimir la respuesta
print(f"Predicción: {response_data['prediction']}")

