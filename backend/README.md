# Comandos

- `uvicorn main:app --reload` --> Run fastapi
- `source env/bin/activate` --> Active virtual env locally

# Resumen

Configura una aplicación de fast api con una sub app.
La aplicación principal es publica y puede ser accedida sin estar logeado.
No obstante todas las rutas de la segunda aplicación están protegidas tras un middleware que comprueba el jwt.
