from fastapi import APIRouter, HTTPException
import mysql
from basededatos import get_db_connection
import mysql.connector
from schemes.schemes_cotizacion import CotizacionSchema
import json

cotizacion_router = APIRouter()

@cotizacion_router.post("/cotizar")
async def crear_cotizacion(cotizacion: CotizacionSchema):
    try:
        with open ("usuario_actual.json") as archivo:
            data = json.load(archivo)
            usuario_id = data.get("id")
        if usuario_id is None:
            raise HTTPException(status_code=400, detail="ID de usuario no encontrado")
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Archivo usuario no encontrado")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error al leer el archivo de usuario")

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO cotizaciones (usuario_id, carro, motor, ciudad, consesionario) VALUES (%s, %s, %s, %s, %s)",
            (usuario_id, cotizacion.carro, cotizacion.motor, cotizacion.ciudad, cotizacion.consesionario)
        )
        conn.commit()
        pit = cursor.lastrowid
        cursor.close()
        conn.close()

        return {**cotizacion.dict(), "id" : pit, "usuario_id": usuario_id}
    except mysql.connector.Error as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")
        