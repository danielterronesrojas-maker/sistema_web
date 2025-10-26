from pydantic import BaseModel

class RegistroSchema(BaseModel):
    nombre: str
    contrasena: str
    correo: str
    telefono: str

class PacienteIdSchema(BaseModel):
    id: int