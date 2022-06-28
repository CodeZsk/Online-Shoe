from __future__ import unicode_literals
from curses import window
import eel
from util.utils import message
from db.db_curd_function.insert import set_user
from db.db_curd_function.find import checkSignInDb, checkAdmin, getAllProducts, getGenderProducts
from db.db_curd_function.update import update_user_password


eel.init('/home/zaid/Desktop/softwareDevProject/Online-Shoe')

data = []


@eel.expose
def setPageData(prop):
    print(prop)
    data.append(prop)
    # return data


@eel.expose
def getPageData():
    return data


# eel.go_to('./components/home-component/dashboard.html')
eel.start('./components/home-component/dashboard.html',  size=(1000, 600))
