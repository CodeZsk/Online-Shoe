from __future__ import unicode_literals
import eel
import sys

from util.utils import message
from db.db_curd_function.insert import set_user
from db.db_curd_function.find import checkSignInDb, checkAdmin, getAllProducts, getGenderProducts
from db.db_curd_function.update import update_user_password


eel.init('C:\\Users\\user\\Desktop\\Online-Shoe')

data = [None]


@eel.expose
def setPageData(prop):
    data[0] = (prop)
    return data


@eel.expose
def getPageData():
    return data


eel.start('./components/login-component/SignUpLogin.html',  size=(1500,1000))
