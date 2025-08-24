# MCP Server Config

## Configuración del servidor MCP

### Estructura de configuración

```python
class MCPServerConfig:
    def __init__(self, host: str, port: int, protocol: str = "http"):
        self.host = host
        self.port = port
        self.protocol = protocol
```
