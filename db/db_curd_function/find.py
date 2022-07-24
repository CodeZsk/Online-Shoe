import eel
from connection import get_database
from bson.objectid import ObjectId
import re
from ast import literal_eval

try:
    dbname = get_database()
    order_db = dbname["order_db"]
    user_info_db = dbname["user_info_db"]
    admin_login = dbname["admin_login"]
    product_db = dbname[" product_db"]
    test = dbname["test"]
except:
    print("Connection error")


@eel.expose
def checkSignInDb(username):
    try:
        user_info = user_info_db.find({"username": username})
        if (user_info) is not None:
            for i in (user_info):
                i['_id'] = str(i['_id'])
                return i
        return None
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def checkAdmin(username):
    try:
        admin_info = admin_login.find({"username": username})
        if (admin_info) is not None:
            for i in (admin_info):
                return i
        return None
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def getAllProducts():
    try:
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
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def getAllOrders():
    try:
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
    except:
        print("Oops! Something get all went wrong")
        return {"status": "error"}


@eel.expose
def getOrderByUserId(id):
    try:
        order = order_db.find({"user.user_id": id})
        data = []
        if (order) is not None:
            j = 0
            for i in (order):
                data.append(i)
                data[j]['_id'] = str(data[j]['_id'])
                j += 1
            return data
        return None
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def getGenderProducts(gender):
    try:
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
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def getSingleProduct(id):
    try:
        product = product_db.find({"_id": ObjectId(id)})
        if product is not None:
            j = 0
            for i in (product):
                i['_id'] = str(i['_id'])
                return i
        return None
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def searchByName(name):
    try:
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
        return None
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def filterByPrice(low, high):
    try:
        products = product_db.find(
            {"price": {"$lte": f"{low}", "$gte": f"{high}"}})
        data = []
        if products is not None:
            j = 0
            for i in products:
                data.append(i)
                data[j]['_id'] = str(data[j]['_id'])
                j += 1
            return data
        print("No products found")
        return None
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


# @eel.expose
# def filterByBrand(name, gender):
#     try:
#         products = product_db.find({
#             "company": {"$in": name},
#             "gender_type": gender
#         })
#         data = []
#         if products is not None:
#             j = 0
#             for i in products:
#                 data.append(i)
#                 data[j]['_id'] = str(data[j]['_id'])
#                 j += 1
#                 # print(i)
#             return data
#         print("No products found")
#         return None
#     except:
#         print("Oops! Something went wrong")
#         return {"status": "error"}


@eel.expose
def filterBy(typeShoes, gender, brand, price):
    print(price)
    if gender == "All":
        gender = None
    try:
        if typeShoes and gender and brand and price:
            products = product_db.find({
                "type": typeShoes,
                "gender_type": gender,
                "company": {"$in": brand},
                "price": {"$lte": price["high"], "$gte": price["low"]}
            })
        elif typeShoes and gender and brand:
            products = product_db.find({
                "type": typeShoes,
                "gender_type": gender,
                "company": {"$in": brand}
            })
        elif typeShoes and gender and price:
            products = product_db.find({
                "type": typeShoes,
                "gender_type": gender,
                "price": {"$lte": price["high"], "$gte": price["low"]}
            })
        elif typeShoes and price and brand:
            products = product_db.find({
                "type": typeShoes,
                "price": {"$lte": price["high"], "$gte": price["low"]},
                "company": {"$in": brand}
            })
        elif price and gender and brand:
            products = product_db.find({
                "price": {"$lte": price["high"], "$gte": price["low"]},
                "gender_type": gender,
                "company": {"$in": brand}
            })
        elif typeShoes and brand:
            products = product_db.find({
                "type": typeShoes,
                "company": {"$in": brand}
            })
        elif typeShoes and gender:
            products = product_db.find({
                "type": typeShoes,
                "gender_type": gender
            })
        elif typeShoes and price:
            products = product_db.find({
                "type": typeShoes,
                "price": {"$lte": price["high"], "$gte": price["low"]}
            })
        elif gender and brand:
            products = product_db.find({
                "gender_type": gender,
                "company": {"$in": brand}
            })
        elif gender and price:
            products = product_db.find({
                "gender_type": gender,
                "price": {"$lte": price["high"], "$gte": price["low"]}
            })
        elif brand and price:
            products = product_db.find({
                "company": {"$in": brand},
                "price": {"$lte": price["high"], "$gte": price["low"]}
            })
        elif typeShoes:
            products = product_db.find({
                "type": typeShoes
            })
        elif gender:
            products = product_db.find({
                "gender_type": gender
            })
        elif brand:
            products = product_db.find({
                "company": {"$in": brand}
            })
        elif price:
            products = product_db.find({
                "price": {"$lte": price["high"], "$gte": price["low"]}
            })
        else:
            products = product_db.find([])
        data = []
        if products is not None:
            j = 0
            for i in products:
                data.append(i)
                data[j]['_id'] = str(data[j]['_id'])
                j += 1
                # print(i)
            return data
        print("No products found")
        return None
    except:
        print("Oops! Something went wrong in filter")
        return {"status": "error"}


@eel.expose
def filterByColor(color):
    try:
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
            return data
        print("No products found")
        return None
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def userInfo(id):
    try:
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
        return None
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def getCartItems(arr):
    try:
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
        return None
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}
