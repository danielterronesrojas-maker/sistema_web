from pydantic import BaseModel

class CotizacionSchema(BaseModel):
    carro: str
    motor: str
    ciudad: str
    consesionario: str