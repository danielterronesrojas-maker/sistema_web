import mysql.connector

config = {
    "host" : "localhost",
    "port" : "3306", 
    "database" : "carros",
    "user" : "root",
    "password": ""
}

def get_db_connection():
    return mysql.connector.connect(**config)