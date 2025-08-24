# Configuración de Servidores HTTP

Los servidores HTTP MCP permiten conectar herramientas externas con DeepSeek MCP Client. Esta guía cubre las opciones de configuración soportadas por la librería.

## URL Simple

La forma más sencilla es usar una URL directa:

```python
from deepseek_mcp_client import DeepSeekClient
import asyncio

async def main():
    client = DeepSeekClient(
        model='deepseek-chat',
        mcp_servers=['http://localhost:8000/mcp/']
    )
    
    result = await client.execute('¿Qué herramientas tienes disponibles?')
    print(result.output)
    
    await client.close()

asyncio.run(main())
```

## Configuración con Diccionario

Para más control, usa un diccionario de configuración:

```python
client = DeepSeekClient(
    model='deepseek-chat',
    mcp_servers=[{
        'url': 'http://localhost:8000/mcp/',
        'timeout': 30.0
    }]
)
```

### Opciones Disponibles en Diccionario

```python
server_config = {
    'url': 'http://localhost:8000/mcp/',     # URL del servidor (requerida)
    'headers': {},                           # Headers HTTP personalizados
    'timeout': 30.0                          # Timeout en segundos (None = sin límite)
}
```

## Configuración de Timeout

### Timeout Personalizado

Basado en el ejemplo `client_mcp_http.py` del proyecto:

```python
from deepseek_mcp_client import DeepSeekClient
import asyncio

async def main():
    # Sin timeout para operaciones largas
    agent = DeepSeekClient(
        model='deepseek-chat',
        mcp_servers=[{
            'url': 'http://localhost:8000/mcp/',
            'timeout': None  # Sin límite de tiempo
        }]
    )
    
    try:
        result = await agent.execute('What tools do you have available in the MCP_SQL server?')
        
        if result.success:
            print(f"✅ Respuesta: {result.output}")
            print(f"⏱️ Duración: {result.metadata.get('duration', 0):.2f}s")
        else:
            print(f"❌ Error: {result.error}")
            
    finally:
        await agent.close()

asyncio.run(main())
```

### Diferentes Valores de Timeout

```python
# Múltiples servidores con diferentes timeouts
client = DeepSeekClient(
    model='deepseek-chat',
    mcp_servers=[
        {
            'url': 'http://localhost:8000/mcp/',
            'timeout': 10.0  # 10 segundos
        },
        {
            'url': 'http://localhost:8001/mcp/',
            'timeout': 120.0  # 2 minutos
        },
        {
            'url': 'http://localhost:8002/mcp/',
            'timeout': None  # Sin límite
        }
    ]
)
```

## Configuración con Headers

### Headers de Autenticación

```python
# Token Bearer
bearer_server = {
    'url': 'http://api.ejemplo.com/mcp/',
    'headers': {
        'Authorization': 'Bearer tu_token_aqui'
    },
    'timeout': 45.0
}

# API Key personalizada
api_key_server = {
    'url': 'http://api.ejemplo.com/mcp/',
    'headers': {
        'X-API-Key': 'tu_api_key_aqui'
    }
}

# Headers múltiples
custom_server = {
    'url': 'http://api.ejemplo.com/mcp/',
    'headers': {
        'Authorization': 'Bearer token123',
        'X-Client-Version': '1.0.0',
        'Content-Type': 'application/json'
    }
}

client = DeepSeekClient(
    model='deepseek-chat',
    mcp_servers=[bearer_server, api_key_server, custom_server]
)
```

## Configuración Avanzada con MCPServerConfig

### Usando la Clase MCPServerConfig

```python
from deepseek_mcp_client import DeepSeekClient, MCPServerConfig

# Configuración completa con la clase
server_config = MCPServerConfig(
    name="Mi Servidor API",
    url='http://localhost:8000/mcp/',
    headers={
        'Authorization': 'Bearer token123',
        'X-Environment': 'production'
    },
    timeout=60.0,
    transport_type='http'
)

client = DeepSeekClient(
    model='deepseek-chat',
    mcp_servers=[server_config]
)
```

### Múltiples Servidores con MCPServerConfig

```python
# Servidor principal
main_server = MCPServerConfig(
    name="Servidor Principal",
    url='http://localhost:8000/mcp/',
    headers={'X-Priority': 'main'},
    timeout=60.0
)

# Servidor de respaldo
backup_server = MCPServerConfig(
    name="Servidor Respaldo", 
    url='http://localhost:8001/mcp/',
    headers={'X-Priority': 'backup'},
    timeout=30.0
)

client = DeepSeekClient(
    model='deepseek-chat',
    mcp_servers=[main_server, backup_server]
)
```

## Múltiples Servidores HTTP

### Ejemplo con Múltiples URLs

```python
# Diferentes servidores especializados
multiple_servers = [
    # Servidor de base de datos
    {
        'url': 'http://localhost:8000/mcp/',
        'headers': {'X-Service': 'database'},
        'timeout': 60.0
    },
    # Servidor de análisis
    {
        'url': 'http://localhost:8001/mcp/',
        'headers': {'X-Service': 'analytics'}, 
        'timeout': 120.0
    },
    # Servidor de búsqueda
    {
        'url': 'http://localhost:8002/mcp/',
        'headers': {'X-Service': 'search'},
        'timeout': 30.0
    }
]

client = DeepSeekClient(
    model='deepseek-chat',
    system_prompt='Tienes acceso a herramientas de base de datos, análisis y búsqueda.',
    mcp_servers=multiple_servers
)
```

## Ejemplos Prácticos

### Ejemplo Básico

```python
from deepseek_mcp_client import DeepSeekClient
import asyncio

async def ejemplo_basico():
    client = DeepSeekClient(
        model='deepseek-chat',
        mcp_servers=['http://localhost:8000/mcp/']
    )
    
    try:
        result = await client.execute('Lista las herramientas disponibles')
        print(f"Herramientas: {result.tools_used}")
        print(f"Respuesta: {result.output}")
    finally:
        await client.close()

asyncio.run(ejemplo_basico())
```

### Ejemplo con Headers y Timeout

```python
async def ejemplo_avanzado():
    client = DeepSeekClient(
        model='deepseek-chat',
        mcp_servers=[{
            'url': 'http://localhost:8000/mcp/',
            'headers': {
                'Authorization': 'Bearer mi-token',
                'X-Client': 'DeepSeek-MCP'
            },
            'timeout': None  # Sin límite para operaciones largas
        }]
    )
    
    try:
        result = await client.execute('Ejecuta un análisis complejo de datos')
        
        if result.success:
            print(f"✅ Éxito: {result.output}")
            print(f"🔧 Herramientas usadas: {result.tools_used}")
            print(f"⏱️ Tiempo: {result.metadata.get('duration', 0):.2f}s")
        else:
            print(f"❌ Error: {result.error}")
            
    finally:
        await client.close()

asyncio.run(ejemplo_avanzado())
```

## Verificar Configuración

### Obtener Información del Cliente

```python
# Verificar configuración después de crear el cliente
client = DeepSeekClient(
    model='deepseek-chat',
    mcp_servers=['http://localhost:8000/mcp/']
)

# Obtener estadísticas
stats = client.get_stats()
print(f"Servidores configurados: {stats['servers_configured']}")
print(f"Servidores conectados: {stats['servers_connected']}")

# Obtener herramientas disponibles
tools = client.get_available_tools()
print(f"Herramientas disponibles: {tools}")

# Verificar estado de conexión
is_connected = client.is_connected()
print(f"¿Conectado? {is_connected}")
```

:::tip Consejo
Usa `timeout=None` con precaución, solo para operaciones que sabes que pueden tomar mucho tiempo. Para la mayoría de casos, un timeout de 30-60 segundos es apropiado.
:::

:::warning Importante
Los headers se pasan directamente al transporte HTTP de la librería. Asegúrate de que el servidor MCP que estás usando acepta los headers que envías.
:::