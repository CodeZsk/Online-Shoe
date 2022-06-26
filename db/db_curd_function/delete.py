import sys
from connection import get_database

print(sys.path)

dbname = get_database()
collection_name = dbname["user_login"]
print(collection_name)
