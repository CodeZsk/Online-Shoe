import random
import time
import eel
from util.utils import message
from db.db_curd_function.update import *
from db.db_curd_function.find import *
from db.db_curd_function.insert import *
from db.db_curd_function.delete import *


eel.init('C:\\Users\\krishna\\Desktop\\Online-Shoe')
# eel.init('/home/zaid/Desktop/softwareDevProject/Online-Shoe')


data = [None]


@eel.expose
def setPageData(prop):
    global data
    data[0] = (prop)
    print(prop)
    # if data[0] == 'All':
    #     data[0] = None
    #     print(data[0])
    return data


@eel.expose
def getPageData():
    global data
    returnData = data
    # data = [None]
    return returnData


settingData = [None]


@eel.expose
def setSettingPageData(prop):
    global settingData
    settingData[0] = (prop)
    return settingData


@eel.expose
def getSettingPageData():
    global settingData
    returnData = settingData
    settingData = [None]
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


@eel.expose
def getVerificationCode():
    code = ''
    i = 0
    while i < 6:
        r = random.randint(0, 9)
        code = code + str(r)
        i += 1
    return code


# def on_close(page, websockets):
#     print(page)
#     changedPage = False
#     if changedPage:
#         print(page, 'closed')
#         print('Still have websockets open to', websockets)


eel.start('./components/login-component/SignUpLogin.html',
          size=(1000, 600))
# eel.start('./components/login-component/SignUpLogin.html',  size=(1400, 900))
