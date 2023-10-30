import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Cargamos el archivo .xlsx en un DataFrame
df = pd.read_excel('ConClasificaciones.xlsx')

# Verificamos si la columna 'SDG' existe en el DataFrame
if 'sdg' in df.columns:
    # Estadísticas básicas
    mean = df['sdg'].mean()
    median = df['sdg'].median()
    std_dev = df['sdg'].std()
    min_val = df['sdg'].min()
    max_val = df['sdg'].max()
    unique_values = df['sdg'].nunique()
    mode = df['sdg'].mode()[0]  

    print(f"Media: {mean}")
    print(f"Mediana: {median}")
    print(f"Desviación estándar: {std_dev}")
    print(f"Valor mínimo: {min_val}")
    print(f"Valor máximo: {max_val}")
    print(f"Número de valores únicos: {unique_values}")
    print(f"Moda: {mode}")

    # Histograma
    plt.figure(figsize=(10,6))
    sns.histplot(df['sdg'], kde=True, bins=30)
    plt.title('Histograma de la columna SDG')
    plt.xlabel('Valores de SDG')
    plt.ylabel('Frecuencia')
    plt.grid(True)
    plt.show()
else:
    print("La columna 'SDG' no se encuentra en el archivo.")
