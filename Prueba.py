import requests
import json

# URL del endpoint que deseas probar
URL = "http://127.0.0.1:5000/predict"

# Tu texto de prueba relacionado con el ODS 3 "Salud y bienestar"
data = {
    "text": "Promovemos programas de vacunación para asegurar la salud de todos los niños en nuestra comunidad."
}

# Hacer la solicitud POST
response = requests.post(URL, json=data)

# Decodificar la respuesta
response_data = response.json()

# Imprimir la respuesta
print(f"Predicción: {response_data['prediction']}")
