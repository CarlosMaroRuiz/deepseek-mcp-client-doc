# Guía Rápida

## Uso Básico (Sin MCP)
```python
from deepseek_mcp_client import DeepSeekClient
import asyncio

async def ejemplo_basico():
    client = DeepSeekClient(model='deepseek-chat')
    
    result = await client.execute('¿Cuál es la capital de Francia?')
    print(result.output)
    
    await client.close()

asyncio.run(ejemplo_basico())
```

## Con Servidor HTTP MCP
```python
from deepseek_mcp_client import DeepSeekClient
import asyncio

async def ejemplo_http():
    client = DeepSeekClient(
        model='deepseek-chat',
        mcp_servers=['http://localhost:8000/mcp/']
    )
    
    result = await client.execute('¿Qué herramientas tienes disponibles?')
    print(result.output)
    print(f"Herramientas usadas: {result.tools_used}")
    
    await client.close()

asyncio.run(ejemplo_http())
```

## Con Servidor STDIO
```python
from deepseek_mcp_client import DeepSeekClient
import asyncio

async def ejemplo_stdio():
    client = DeepSeekClient(
        model='deepseek-chat',
        mcp_servers=[{
            'command': 'python',
            'args': ['mi_servidor.py'],
            'timeout': 60.0
        }]
    )
    
    result = await client.execute('Ejecuta análisis de datos')
    print(result.output)
    
    await client.close()

asyncio.run(ejemplo_stdio())
```

## Servidor En Memoria (FastMCP)
```python
from deepseek_mcp_client import DeepSeekClient
from fastmcp import FastMCP
import asyncio

# Crear servidor en memoria
calculadora = FastMCP("Calculadora")

@calculadora.tool
def sumar(a: float, b: float) -> float:
    """Sumar dos números"""
    return a + b

@calculadora.tool  
def multiplicar(a: float, b: float) -> float:
    """Multiplicar dos números"""
    return a * b

async def ejemplo_memoria():
    client = DeepSeekClient(
        model='deepseek-chat',
        mcp_servers=[calculadora]
    )
    
    result = await client.execute('Calcula 15 + 25 y luego multiplica por 2')
    print(result.output)
    
    await client.close()

asyncio.run(ejemplo_memoria())
```

## Configuración con Logging
```python
from deepseek_mcp_client import DeepSeekClient, setup_colored_logging
import asyncio

# Habilitar logging con colores
setup_colored_logging("INFO")

async def ejemplo_logging():
    client = DeepSeekClient(
        model='deepseek-chat',
        enable_logging=True,
        enable_progress=True,
        mcp_servers=['http://localhost:8000/mcp/']
    )
    
    result = await client.execute('Analiza datos con logging detallado')
    print(result.output)
    
    await client.close()

asyncio.run(ejemplo_logging())
```

## Manejo de Resultados
```python
async def ejemplo_resultados():
    client = DeepSeekClient(model='deepseek-chat')
    result = await client.execute('Tu consulta aquí')
    
    # Verificar éxito
    if result.success:
        print(f"✅ Respuesta: {result.output}")
        print(f"🔧 Herramientas: {result.tools_used}")
        print(f"⏱️ Duración: {result.metadata.get('duration', 0):.2f}s")
        print(f"🆔 ID: {result.execution_id}")
    else:
        print(f"❌ Error: {result.error}")
    
    # Convertir a diccionario
    data = result.to_dict()
    
    await client.close()
```

## Configuración Múltiples Servidores
```python
from deepseek_mcp_client import DeepSeekClient, MCPServerConfig

async def ejemplo_multiple():
    client = DeepSeekClient(
        model='deepseek-chat',
        system_prompt='Eres un asistente con múltiples herramientas.',
        mcp_servers=[
            # HTTP
            'http://localhost:8000/mcp/',
            
            # STDIO con configuración
            {
                'command': 'node',
                'args': ['servidor.js'],
                'env': {'NODE_ENV': 'production'}
            },
            
            # Configuración avanzada
            MCPServerConfig(
                url='http://localhost:8001/mcp/',
                headers={'Authorization': 'Bearer token'},
                timeout=45.0
            )
        ]
    )
    
    result = await client.execute('Usa todas las herramientas disponibles')
    print(result.output)
    
    await client.close()

asyncio.run(ejemplo_multiple())
```