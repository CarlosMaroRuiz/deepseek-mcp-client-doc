# Instalación

## Requisitos del Sistema
- **Python**: 3.8 o superior
- **pip**: Gestor de paquetes de Python
- **DeepSeek API Key**: [Obtener aquí](https://platform.deepseek.com)

## Instalación Principal

### Desde PyPI (Recomendado)
```bash
pip install deepseek-mcp-client
```

# Configuración de API Key

### Opción 1: Variable de Entorno
```bash
export DEEPSEEK_API_KEY="tu_clave_api_aqui"
```

### Opción 2: Archivo .env
```bash
# Crear archivo .env en tu proyecto
DEEPSEEK_API_KEY=tu_clave_api_aqui"
```

### Opción 3: Configuración en Código
```python
import os
os.environ["DEEPSEEK_API_KEY"] = "tu_clave_api_aqui"
```