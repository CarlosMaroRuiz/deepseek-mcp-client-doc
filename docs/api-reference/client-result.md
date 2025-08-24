# ClientResult

## Clase ClientResult

### Propiedades

- `success: bool` - Indica si la operación fue exitosa
- `data: Any` - Datos de resultado
- `error: str` - Mensaje de error (si existe)

```python
class ClientResult:
    def __init__(self, success: bool, data: Any = None, error: str = None):
        self.success = success
        self.data = data
        self.error = error
```
