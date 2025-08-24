# Configuración de Servidores STDIO

Los servidores STDIO ejecutan procesos locales que se comunican con DeepSeek MCP Client a través de entrada/salida estándar.

## Configuración Básica

### Comando con Diccionario

```python
from deepseek_mcp_client import DeepSeekClient
import asyncio

async def main():
    client = DeepSeekClient(
        model='deepseek-chat',
        mcp_servers=[{
            'command': 'python',
            'args': ['mi_servidor.py']
        }]
    )
    
    result = await client.execute('¿Qué herramientas tienes disponibles?')
    print(result.output)
    
    await client.close()

asyncio.run(main())
```

### Detección Automática por Extensión

```python
# Detecta automáticamente Python STDIO
client = DeepSeekClient(
    model='deepseek-chat',
    mcp_servers=['servidor.py']  # .py -> comando 'python'
)

# Detecta automáticamente Node.js STDIO  
client = DeepSeekClient(
    model='deepseek-chat',
    mcp_servers=['servidor.js']  # .js -> comando 'node'
)
```

## Opciones de Configuración

### Parámetros Disponibles

```python
server_config = {
    'command': 'python',                # Comando a ejecutar (requerido)
    'args': ['servidor.py'],            # Argumentos del comando
    'env': {},                          # Variables de entorno
    'cwd': '/path/to/directory',        # Directorio de trabajo
    'timeout': 60.0,                    # Timeout en segundos (None = sin límite)
    'keep_alive': True                  # Mantener proceso activo
}
```

## Ejemplo del Proyecto

Basado en `example_stdio/example_stdio.py`:

```python
from deepseek_mcp_client import DeepSeekClient
import asyncio

async def main():
    agent = DeepSeekClient(
        model='deepseek-chat',
        system_prompt='Eres un asistente especializado en e-commerce.',
        mcp_servers=[{
            'command': 'uv',
            'args': [
                'run',
                '--directory', '/path/to/project',
                'python', 'main.py'
            ],
            'env': {
                'MERCADOLIBRE_ENV': 'production',
                'MERCADOLIBRE_HEADLESS': 'true',
                'LOG_LEVEL': 'INFO'
            },
            'timeout': None  # Sin límite para scraping
        }],
        enable_logging=True,
        enable_progress=True
    )
    
    try:
        result = await agent.execute('Busca laptops gamer económicas')
        
        if result.success:
            print(f"✅ Respuesta: {result.output}")
            print(f"🛠️ Herramientas: {result.tools_used}")
        else:
            print(f"❌ Error: {result.error}")
    finally:
        await agent.close()

asyncio.run(main())
```

## Configuración con MCPServerConfig

```python
from deepseek_mcp_client import DeepSeekClient, MCPServerConfig

# Configuración completa con la clase
stdio_server = MCPServerConfig(
    name="Mi Servidor Python",
    command='python',
    args=['servidor.py'],
    env={'LOG_LEVEL': 'INFO'},
    cwd='/path/to/server',
    timeout=120.0,
    keep_alive=True
)

client = DeepSeekClient(
    model='deepseek-chat',
    mcp_servers=[stdio_server]
)
```

## Ejemplos de Comandos

### Python

```python
# Python básico
{'command': 'python', 'args': ['servidor.py']}

# Python con módulo
{'command': 'python', 'args': ['-m', 'mi_servidor']}

# Intérprete específico
{'command': 'python3.11', 'args': ['servidor.py']}
```

### Node.js

```python
# Node.js básico  
{'command': 'node', 'args': ['servidor.js']}

# Con argumentos
{'command': 'node', 'args': ['servidor.js', '--port', '3000']}
```

### UV (Package Manager)

```python
# UV con Python
{
    'command': 'uv',
    'args': ['run', 'python', 'servidor.py'],
    'timeout': 120.0
}
```

:::tip Timeout
Usa `timeout: None` para procesos que pueden tomar mucho tiempo (como web scraping). Por defecto es 30 segundos.
:::

:::warning Keep Alive
`keep_alive: True` mantiene el proceso ejecutándose entre llamadas. `False` reinicia el proceso cada vez.
:::