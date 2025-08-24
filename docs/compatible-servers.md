# Servidores compatibles

## Lista de servidores soportados

### Servidores HTTP

- FastAPI
- Flask
- Express.js
- Spring Boot

### Servidores STDIO

- Node.js scripts
- Python scripts
- Shell scripts

### Configuración por servidor

#### FastAPI

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}
```
