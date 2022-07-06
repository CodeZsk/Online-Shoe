import eel
import datetime
from connection import get_database

dbname = get_database()
user_info_db = dbname["user_info_db"]
product_db = dbname["product_db"]
order_db = dbname["order_db"]


@eel.expose
def set_user(username, password, email, securityQuestion):
    print(username, password)
    user = {
        "username": username,
        "password": password,
        "email": email,
        "securityQuestion": securityQuestion,
        "DOC": str(datetime.datetime.now()),
        "user_info": {
            "user_name": "",
            "user_DOB": "",
            "user_gender": "",
            "user_phoneNo": "",
            "user_Add": "",
            "user_email": "",
            "user_cart": [],
            "user_order": {
                "order_status": {
                    "active_order": [{
                        "active_order_id": "",
                        "product_id": "",
                        "active_state": "",
                    }],
                    "prev_order": {
                        "orders_cancal": [{
                            "cancal_product_id": "",
                            "cancal_order_id": "",
                        }],
                        "order_deliverd": [{
                            "order_product_id": "",
                            "deleverd_order_id": "",
                        }],
                        "order_return": [{
                            "return_product_id": "",
                            "return_order_id": ""
                        }]
                    }
                }
            }
        }
    }
    user_info_db.insert_one(user)
    return


def set_product(productName, productImg, productDescription, productType, productGenderType, productColour, productSize, quantity, price, reviews):

    product = {
        "product_name": productName,
        "product_img": {
            "productImg": productImg,
        },
        "product_description": productDescription,
        "product_type": productType,
        "product_gender_type": productGenderType,
        "product_colors": {
            "productColour": productColour,
        },
        "product_size": {
            "size": productSize,
        },
        "product_quantity": quantity,
        "product_price": price,
        "product_reviews": reviews,
    }

    product_db.insert_one(product)


def set_order(orderStatus, productId, productName, productPrice, productType, productGenderType, productColor, userId, userName, userGender, userAge):
    order = {
        "order": {
            "order_status": orderStatus,
        },
        "product": {
            "product_id": productId,
            "product_name": productName,
            "product_price": productPrice,
            "product_type": productType,
            "product_gender_type": productGenderType,
            "product_color": productColor,
        },
        "user": {
            "user_id": userId,
            "user_name": userName,
            "user_gender": userGender,
            "user_age": userAge,
        }
    }
    order_db.insert_one(order)
