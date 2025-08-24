# Configuración Mixta

DeepSeek MCP Client puede usar múltiples tipos de servidores MCP simultáneamente: HTTP, STDIO y en memoria (FastMCP).

## Configuración Básica Mixta

### HTTP + STDIO

```python
from deepseek_mcp_client import DeepSeekClient
import asyncio

async def main():
    client = DeepSeekClient(
        model='deepseek-chat',
        mcp_servers=[
            # Servidor HTTP
            'http://localhost:8000/mcp/',
            
            # Servidor STDIO
            {
                'command': 'python',
                'args': ['local_server.py']
            }
        ]
    )
    
    result = await client.execute('¿Qué herramientas tienes disponibles?')
    print(f"Herramientas: {result.tools_used}")
    
    await client.close()

asyncio.run(main())
```

## Con FastMCP (En Memoria)

### Ejemplo del README

```python
from deepseek_mcp_client import DeepSeekClient
from fastmcp import FastMCP
import asyncio

# Servidor en memoria
calculator = FastMCP("Calculator")

@calculator.tool
def add(a: float, b: float) -> float:
    """Add two numbers"""
    return a + b

async def main():
    # Tipos de transporte mixtos
    client = DeepSeekClient(
        model='deepseek-chat',
        mcp_servers=[
            'http://localhost:8000/mcp/',           # HTTP
            {                                       # STDIO
                'command': 'python',
                'args': ['local_server.py']
            },
            calculator                              # En memoria
        ]
    )
    
    result = await client.execute('Suma 5 + 3 y también consulta la base de datos')
    print(result.output)
    
    await client.close()

asyncio.run(main())
```

## Configuración Avanzada Mixta

### Con MCPServerConfig

```python
from deepseek_mcp_client import DeepSeekClient, MCPServerConfig
from fastmcp import FastMCP

# Herramientas rápidas en memoria
quick_tools = FastMCP("Quick Tools")

@quick_tools.tool
def format_text(text: str, format_type: str = "upper") -> str:
    """Format text quickly"""
    if format_type == "upper":
        return text.upper()
    elif format_type == "lower":
        return text.lower()
    return text

# Configuración híbrida
client = DeepSeekClient(
    model='deepseek-chat',
    system_prompt='''
    Tienes acceso a:
    - Base de datos SQL (HTTP)
    - Análisis de archivos (STDIO)  
    - Herramientas rápidas (memoria)
    
    Usa la más apropiada para cada tarea.
    ''',
    mcp_servers=[
        # HTTP: Base de datos
        {
            'url': 'http://localhost:8000/mcp/',
            'headers': {'X-Service': 'database'},
            'timeout': 30.0
        },
        
        # STDIO: Análisis de archivos
        {
            'command': 'python',
            'args': ['file_analyzer.py'],
            'timeout': 120.0
        },
        
        # En memoria: Utilidades rápidas
        quick_tools,
        
        # MCPServerConfig avanzado
        MCPServerConfig(
            name="Servidor Especializado",
            command='node',
            args=['special_server.js'],
            env={'NODE_ENV': 'production'},
            timeout=60.0
        )
    ]
)
```

## Detección Automática de Tipos

La librería detecta automáticamente el tipo de cada servidor:

```python
client = DeepSeekClient(
    model='deepseek-chat',
    mcp_servers=[
        'http://localhost:8000/mcp/',  # HTTP (por URL)
        'server.py',                   # STDIO (por extensión .py)
        'server.js',                   # STDIO (por extensión .js)
        calculator,                    # En memoria (FastMCP instance)
        {
            'url': 'http://localhost:8001/mcp/',
            'timeout': 45.0
        },                             # HTTP (por 'url' key)
        {
            'command': 'python',
            'args': ['analyzer.py']
        }                              # STDIO (por 'command' key)
    ]
)
```

## Verificar Configuración Mixta

### Ver Tipos de Transporte

```python
async def main():
    client = DeepSeekClient(
        model='deepseek-chat',
        mcp_servers=[
            'http://localhost:8000/mcp/',
            'server.py',
            calculator
        ]
    )
    
    # Ejecutar consulta para obtener metadata
    result = await client.execute('Lista las herramientas')
    
    if result.success:
        # Ver tipos de transporte usados
        transport_types = result.metadata.get('transport_types', [])
        print(f"Tipos de transporte: {transport_types}")
        
        # Ver estadísticas
        stats = client.get_stats()
        print(f"Servidores conectados: {stats['servers_connected']}")
        print(f"Herramientas disponibles: {stats['tools_available']}")
    
    await client.close()
```

## Ejemplo Práctico

### Sistema Completo

```python
from deepseek_mcp_client import DeepSeekClient
from fastmcp import FastMCP
import asyncio

# Crear herramientas en memoria para operaciones rápidas
utils = FastMCP("Utils")

@utils.tool
def calculate(expression: str) -> float:
    """Calculate simple math expressions"""
    try:
        return eval(expression)  # Solo para ejemplo
    except:
        return 0.0

@utils.tool
def count_words(text: str) -> int:
    """Count words in text"""
    return len(text.split())

async def main():
    client = DeepSeekClient(
        model='deepseek-chat',
        system_prompt='Eres un asistente con herramientas variadas.',
        mcp_servers=[
            # Base de datos remota
            {
                'url': 'http://localhost:8000/mcp/',
                'headers': {'X-Service': 'database'},
                'timeout': 60.0
            },
            
            # Procesamiento local de archivos
            {
                'command': 'python',
                'args': ['file_processor.py'],
                'env': {'PROCESSOR_MODE': 'batch'},
                'timeout': 180.0
            },
            
            # Utilidades rápidas
            utils
        ],
        enable_logging=True
    )
    
    try:
        result = await client.execute('''
        Necesito:
        1. Consultar datos de usuarios en la base de datos
        2. Procesar un archivo CSV grande
        3. Calcular 25 * 3.5
        4. Contar palabras en este texto
        ''')
        
        if result.success:
            print(f"✅ Respuesta: {result.output}")
            print(f"🔧 Herramientas usadas: {result.tools_used}")
            print(f"🚀 Transportes: {result.metadata.get('transport_types', [])}")
        
    finally:
        await client.close()

asyncio.run(main())
```

:::tip Ventajas de la Configuración Mixta
- **HTTP**: Para servicios remotos y APIs
- **STDIO**: Para procesamiento local intensivo  
- **FastMCP**: Para operaciones rápidas y utilidades
:::

:::warning Rendimiento
FastMCP (memoria) es más rápido para operaciones simples. USA HTTP/STDIO para tareas que requieren recursos externos o procesamiento pesado.
:::