import eel
from connection import get_database

dbname = get_database()
user_info_db = dbname["user_info_db"]
admin_login = dbname["admin_login"]


@eel.expose
def checkSignInDb(username):
    user_info = user_info_db.find({"username": username})
    print(user_info)
    if user_info is not None:
        for i in user_info:
            return i
    return None


@eel.expose
def checkAdmin(username):
    admin_info = admin_login.find({"username": username})
    if (admin_info) is not None:
        for i in (admin_info):
            return i
    return None
