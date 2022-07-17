import eel
import datetime
from connection import get_database

dbname = get_database()
user_info_db = dbname["user_info_db"]
product_db = dbname[" product_db"]
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
            "user_email": "",
            "user_Add": {
                "flat_number": "",
                "area_street": "",
                "landmark": "",
                "town_city": "",
                "pincode": "",
                "state_name": "",
            },
        },
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
    user_info_db.insert_one(user)
    return


@eel.expose
def set_product(productName, productPrice, productColor, productQuantity, genderType, productType, img1, img2, img3, img4, productDescription, productCompany):
    product = {
        "name": productName,
        "price": productPrice,
        "reviews": {
            "number_reviews": 0,
            "reviews_star": 0
        },
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
    }

    product_db.insert_one(product)


@eel.expose
def set_order(orderStatus, date, productId, productName, productPrice, quantity, productType, productGenderType, productColor, userId, userName, userGender, userAge):
    order = {
        "order": {
            "order_status": orderStatus,
            "order_date": date
        },
        "product": {
            "product_id": productId,
            "product_name": productName,
            "product_price": productPrice,
            "product_quantity": quantity,
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
    return {"status": "ok"}
