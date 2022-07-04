import eel
from util.utils import message
from db.db_curd_function.insert import set_user
from db.db_curd_function.find import checkSignInDb, checkAdmin, getAllProducts, getGenderProducts, userInfo
from db.db_curd_function.update import update_user_password


eel.init('/home/zaid/Desktop/softwareDevProject/Online-Shoe')


data = [None]


@eel.expose
def setPageData(prop):
    data[0] = (prop)
    print(prop)
    if data[0] == 'All':
        data[0] = None
        print(data[0])
    return data


@eel.expose
def getPageData():
    return data


eel.start('./components/home-component/dashboard.html',  size=(1000, 600))
