import eel
from connection import get_database
from bson.objectid import ObjectId

dbname = get_database()
user_info_db = dbname["user_info_db"]
admin_login = dbname["admin_login"]
product_db = dbname[" product_db"]
test = dbname["test"]
jsGender = ''


@eel.expose
def checkSignInDb(username):
    user_info = user_info_db.find({"username": username})
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

# @eel.expose
# def getWomenProducts():
#     womenProducts = product_db.find({"gender_type": "Women"})
#     data = []
#     if (womenProducts) is not None:
#         for i in (womenProducts):
#             data.append(i)
#         return data
#     return None


# @eel.expose
# def getUniSexProducts():
#     unisexProducts = product_db.find({"gender_type": "Unisex"})
#     data = []
#     if (unisexProducts) is not None:
#         for i in (unisexProducts):
#             data.append(i)
#         return data
#     return None
