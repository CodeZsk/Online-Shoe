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


def update_user(id, name, dob, gender, phoneNo, address, email):
    searchValue = {"_id": ObjectId(id)}
    newValues = {"$set": {"user_info": {
        "user_name": name,
        "user_DOB": dob,
        "user_gender": gender,
        "user_phoneNo": phoneNo,
        "user_Add": address,
        "user_email": email,
        "user_order": {
            "order_status": {
                "active_order": {
                    "active_order_id": "",
                    "product_id": "",
                    "active_state": "",
                },
                "prev_order": {
                    "orders_cancal": {
                        "cancal_product_id": "",
                        "cancal_order_id": "",
                    },
                    "order_deliverd": {
                        "order_product_id": "",
                        "deleverd_order_id": "",
                    },
                    "order_return": {
                        "return_product_id": "",
                        "return_order_id": ""
                    }
                }
            }
        }
    }
    }
    }
    user_info_db.update_one(searchValue, newValues)


@eel.expose
def update_user_cart_add(id, product_id):
    print(product_id)
    searchValue = {"_id": ObjectId(id)}
    setUserCart = {
        "$addToSet": {"user_info.user_cart": product_id}
    }
    result = user_info_db.update_one(searchValue, setUserCart)
    print(result)


@eel.expose
def update_user_cart_remove(id, product_id):
    searchValue = {"_id": ObjectId(id)}
    setUserCart = {
        "$pull": {"user_info.user_cart": product_id}
    }
    user_info_db.update_one(searchValue, setUserCart)
