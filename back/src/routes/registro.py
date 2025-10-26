import json
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
import mysql
from basededatos import get_db_connection
import mysql.connector
from schemes.schemes_registro import RegistroSchema, PacienteIdSchema

registro_router = FastAPI()

@registro_router.post("/registrar")
async def registrar_usuario(registro: RegistroSchema):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO usuarios (nombre,contrasena,correo,telefono) VALUES (%s, %s, %s, %s)",
            (registro.nombre, registro.contrasena, registro.correo, registro.telefono)
        )
        conn.commit()
        
        pit = cursor.lastrowid
        cursor.close()
        conn.close()

        try: 
            with open("usuario_actual.json", "w") as archivo:
                json.dump({"id": pit}, archivo)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error al guardar el ID del usuario: {str(e)}")
        
        return {**registro.dict(), "id": pit}

    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")

@registro_router.post("/obtener_id")
async def obtener_id(paciente_id: PacienteIdSchema):
    try:
        with open("usuario_actual.json", "r") as archivo:
            data = json.load(archivo)
            return {"id": data.get("id")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al leer el ID del usuario: {str(e)}")

@registro_router.get("/usuario_id_json")
async def usuario_id_json():
    try:
        return FileResponse("usuario_actual.json", media_type="application/json")
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Archivo no encontrado")