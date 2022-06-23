from __future__ import unicode_literals
import eel
import datetime
from db.connection import get_database

eel.init('/home/zaid/Desktop/Online-Shoe/SignUpLOgin')

dbname = get_database()
collection_name = dbname["user_login"]


@eel.expose
def message(message):
    print(message)
    return


@eel.expose
def set_user(username, password, email, securityQuestion):
    print(username, password)
    user = {
        "username": username,
        "password": password,
        "email": email,
        securityQuestion: securityQuestion,
        "DOC": datetime.datetime.now(),
        "user_info": {}
    }
    collection_name.insert_one(user)
    return


eel.start('SignUpLogin.html')
