from traceback import print_tb
import eel
from connection import get_database
from bson.objectid import ObjectId
import re
import json
from ast import literal_eval

dbname = get_database()
order_db = dbname["order_db"]
user_info_db = dbname["user_info_db"]
admin_login = dbname["admin_login"]
product_db = dbname[" product_db"]
jsGender = ''


@eel.expose
def checkSignInDb(username):
    user_info = user_info_db.find({"username": username})
    if (user_info) is not None:
        for i in (user_info):
            i['_id'] = str(i['_id'])
            return i
    return None


@eel.expose
def checkAdmin(username):
    admin_info = admin_login.find({"username": username})
    if (admin_info) is not None:
        for i in (admin_info):
            return i
    return None


@eel.expose
def getAllProducts():
    allProducts = product_db.find([])
    data = []
    if (allProducts) is not None:
        j = 0
        for i in (allProducts):
            data.append(i)
            data[j]['_id'] = str(data[j]['_id'])
            j += 1
        return data
    return None


@eel.expose
def getAllOrders():
    order = order_db.find({})
    data = []
    if (order) is not None:
        j = 0
        for i in (order):
            data.append(i)
            data[j]['_id'] = str(data[j]['_id'])
            j += 1
        return data
    return None


@eel.expose
def getGenderProducts(gender):
    manProducts = product_db.find({"gender_type": gender})
    data = []
    if (manProducts) is not None:
        j = 0
        for i in (manProducts):
            data.append(i)
            data[j]['_id'] = str(data[j]['_id'])
            j += 1
        return data
    return None


@eel.expose
def getSingleProduct(id):
    product = product_db.find({"_id": ObjectId(id)})
    if product is not None:
        j = 0
        for i in (product):
            i['_id'] = str(i['_id'])
            return i
    return None


@eel.expose
def searchByName(name):
    regx = re.compile(f"^.*{name}*.*$", re.IGNORECASE)
    products = product_db.find({'name': {"$regex": regx}})
    data = []
    if products is not None:
        j = 0
        for i in products:
            data.append(i)
            data[j]['_id'] = str(data[j]['_id'])
            j += 1
        return data
    print("No products found")
    return


@eel.expose
def filterByPrice(low, high):
    products = product_db.find(
        {"price": {"$lte": f"{low}", "$gte": f"{high}"}})
    data = []
    if products is not None:
        j = 0
        for i in products:
            data.append(i)
            data[j]['_id'] = str(data[j]['_id'])
            j += 1
        return
    print("No products found")
    return


@eel.expose
def filterByBrand(name):
    regx = re.compile(f"{name}", re.IGNORECASE)
    products = product_db.find(
        {"company": {"$regex": regx}})
    data = []
    if products is not None:
        j = 0
        for i in products:
            data.append(i)
            data[j]['_id'] = str(data[j]['_id'])
            j += 1
            print(i)
        return
    print("No products found")
    return


@eel.expose
def filterByColor(color):
    regx = re.compile(f"{color}", re.IGNORECASE)
    products = product_db.find(
        {"availability.color": {"$regex": regx}})
    data = []
    if products is not None:
        j = 0
        for i in products:
            data.append(i)
            data[j]['_id'] = str(data[j]['_id'])
            j += 1
        return
    print("No products found")
    return


@eel.expose
def userInfo(id):
    user = user_info_db.find({"_id": ObjectId(id)})
    data = []
    if user is not None:
        j = 0
        for i in user:
            data.append(i)
            data[j]['_id'] = str(data[j]['_id'])
            data[j]['user_cart'] = str(
                data[j]['user_cart'])
            # print(data[j]['user_info']['user_cart'])
            j += 1
        return data
    print("No user found")
    return


@eel.expose
def getCartItems(arr):
    cart_arr = literal_eval(arr)
    cart_arr_obj_id = []
    for i in cart_arr:
        cart_arr_obj_id.append(ObjectId(i))
    cart = product_db.find({"_id": {"$in": cart_arr_obj_id}})
    data = []
    if cart is not None:
        j = 0
        for i in cart:
            data.append(i)
            data[j]['_id'] = str(data[j]['_id'])
            j += 1
        return data
    print("No cart found")
    return

# userInfo("62b818cf1d0e763410d30734")
