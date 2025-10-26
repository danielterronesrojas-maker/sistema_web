import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routes.registro import registro_router
from routes.cotizacion import cotizacion_router

app = FastAPI()
app.include_router(registro_router)
app.include_router(cotizacion_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  
)