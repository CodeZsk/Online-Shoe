import eel
from connection import get_database
from bson.objectid import ObjectId

try:
    dbname = get_database()
    user_info_db = dbname["user_info_db"]
    order_db = dbname["order_db"]
    product_db = dbname[" product_db"]
except:
    print("Connection error")


@eel.expose
def update_user_password(username, password):
    try:
        searchValue = {"username": username}
        newValues = {"$set": {"password": password}}
        user_info_db.update_one(searchValue, newValues)
        return {"status": "Ok"}
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def update_user(id, name, dob, gender, phoneNo, flat_number, area_street, landmark, town_city, pincode, state_name):
    try:
        searchValue = {"_id": ObjectId(id)}
        newValues = {"$set": {"user_info": {
            "user_name": name,
            "user_DOB": dob,
            "user_gender": gender,
            "user_phoneNo": phoneNo,
            "user_Add": {
                "flat_number": flat_number,
                "area_street": area_street,
                "landmark": landmark,
                "town_city": town_city,
                "pincode": pincode,
                "state_name": state_name,
            },
        }}}
        user_info_db.update_one(searchValue, newValues)
        return {"status": "Ok"}
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def update_user_cart_add(id, product_id):
    try:
        print(product_id)
        searchValue = {"_id": ObjectId(id)}
        setUserCart = {
            "$addToSet": {"user_cart": product_id}
        }
        result = user_info_db.update_one(searchValue, setUserCart)
        print(result)
        return {"status": "Ok"}
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def update_user_cart_remove(id, product_id):
    try:
        searchValue = {"_id": ObjectId(id)}
        setUserCart = {
            "$pull": {"user_cart": product_id}
        }
        user_info_db.update_one(searchValue, setUserCart)
        return {"status": "Ok"}
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def update_order_status(orderID, status):
    try:
        searchValue = {"_id": ObjectId(orderID)}
        newValues = {"$set": {"order.order_status": status}}
        order_db.update_one(searchValue, newValues)
        return {"status": "Ok"}
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def update_product_quantity(id, quantity):
    try:
        searchValue = {"_id": ObjectId(id)}
        newValues = {"$set": {"availability.quantity": quantity}}
        product_db.update_one(searchValue, newValues)
        return {"status": "Ok"}
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def update_product(id, productName, productPrice, productColor, productQuantity, genderType, productType, img1, img2, img3, img4, productDescription, productCompany):
    try:
        searchValue = {"_id": ObjectId(id)}
        newValues = {"$set": {
            "name": productName,
            "price": productPrice,
            "reviews": [],
            "availability": {
                "color": productColor,
                "size": ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5"],
                "quantity": productQuantity
            },
            "gender_type": genderType,
            "type": productType,
            "img": [img1, img2, img3, img4],
            "description": productDescription,
            "company": productCompany
        }}
        product_db.update_one(searchValue, newValues)
        return {"status": "Ok"}
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def updateProductReview(id, userId, star, comment):
    try:
        searchValue = {"_id": ObjectId(id)}
        newValues = {"$addToSet": {
            "reviews": {
                "userId": userId,
                "comment": comment,
                "star": star
            }
        }}
        product_db.update_one(searchValue, newValues)
        return {"status": "Ok"}
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def updateIsReview(id):
    try:
        searchValue = {"_id": ObjectId(id)}
        newValues = {"$set": {
            "order.is_reviewed": True,
        }}
        order_db.update_one(searchValue, newValues)
        return {"status": "Ok"}
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}
