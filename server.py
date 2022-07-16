import eel
from util.utils import message
from db.db_curd_function.insert import *
from db.db_curd_function.find import *
from db.db_curd_function.update import *


# eel.init('C:\\Users\\krishna\\Desktop\\Online-Shoe')
eel.init('/home/zaid/Desktop/softwareDevProject/Online-Shoe')


data = [None]


@eel.expose
def setPageData(prop):
    global data
    data[0] = (prop)
    print(prop)
    if data[0] == 'All':
        data[0] = None
        print(data[0])
    return data


@eel.expose
def getPageData():
    global data
    returnData = data
    data = [None]
    return returnData


userID = ''


@eel.expose
def set_user_ID(id):
    global userID
    userID = id
    print("set id: ", id, userID)
    return userID


@eel.expose
def get_user_ID():
    print("get id: ", userID)
    return userID


singlePageData = [None]


@eel.expose
def setSinglePageData(data):
    singlePageData[0] = data
    return singlePageData


@eel.expose
def getSinglePageData():
    return singlePageData


searchPageData = ""


@eel.expose
def setSearchPageData(data):
    global searchPageData
    searchPageData = data
    print(searchPageData)
    return searchPageData


@eel.expose
def getSearchPageData():
    global searchPageData
    returnData = searchPageData
    searchPageData = ''
    return returnData


eel.start('./components/login-component/SignUpLogin.html',  size=(1000, 600))
# eel.start('./components/login-component/SignUpLogin.html',  size=(1400, 900))
# eel.start('./components/admin-component/ordersAd.html',  size=(1400, 900))