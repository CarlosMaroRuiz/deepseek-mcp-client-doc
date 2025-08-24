# Manejo de errores

## Estrategias de manejo de errores

```python
try:
    result = client.execute()
except ClientError as e:
    print(f"Error: {e}")
```
