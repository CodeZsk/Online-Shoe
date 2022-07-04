from functools import cache
from pymongo import MongoClient
import os
from dotenv import load_dotenv


load_dotenv()

MANGO_PASSWORD = os.getenv('MANGO_PASSWORD')


def get_database():
    try:
        CONNECTION_STRING = f"mongodb+srv://CodeZsk:{MANGO_PASSWORD}@node-task-manager-tu.2aekz.mongodb.net/testPythonDb?retryWrites=true&w=majority"

        client = MongoClient(CONNECTION_STRING)

        return client['online_shoe_store']
    except:
        print("Couldn't connect to MongoClient'")
