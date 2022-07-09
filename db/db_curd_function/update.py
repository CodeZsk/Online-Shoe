import eel
from connection import get_database
from bson.objectid import ObjectId

dbname = get_database()
user_info_db = dbname["user_info_db"]


@eel.expose
def update_user_password(username, password):
    searchValue = {"username": username}
    newValues = {"$set": {"password": password}}
    user_info_db.update_one(searchValue, newValues)


@eel.expose
def update_user(id, name, dob, gender, phoneNo, email, flat_number, area_street, landmark, town_city, pincode, state_name):
    print(id, name, dob, gender, phoneNo, email, flat_number,
          area_street, landmark, town_city, state_name)
    searchValue = {"_id": ObjectId(id)}
    newValues = {"$set": {"user_info": {
        "user_name": name,
        "user_DOB": dob,
        "user_gender": gender,
        "user_phoneNo": phoneNo,
        "user_email": email,
        "user_Add": {
            "flat_number": flat_number,
            "area_street": area_street,
            "landmark": landmark,
            "town_city": town_city,
            "pincode": pincode,
            "state_name": state_name,
        },
    }
    }
    }
    user_info_db.update_one(searchValue, newValues)


@eel.expose
def update_user_cart_add(id, product_id):
    print(product_id)
    searchValue = {"_id": ObjectId(id)}
    setUserCart = {
        "$addToSet": {"user_cart": product_id}
    }
    result = user_info_db.update_one(searchValue, setUserCart)
    print(result)


@eel.expose
def update_user_cart_remove(id, product_id):
    searchValue = {"_id": ObjectId(id)}
    setUserCart = {
        "$pull": {"user_cart": product_id}
    }
    user_info_db.update_one(searchValue, setUserCart)
