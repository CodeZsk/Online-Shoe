import eel
import datetime
from connection import get_database

try:
    dbname = get_database()
    user_info_db = dbname["user_info_db"]
    product_db = dbname[" product_db"]
    order_db = dbname["order_db"]
except:
    print("Connection error")


@eel.expose
def set_user(username, password, email, securityQuestion):
    try:
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
            
        }
        user_info_db.insert_one(user)
        return {"status": "Ok"}
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def set_product(productName, productPrice, productColor, productQuantity, genderType, productType, img1, img2, img3, img4, productDescription, productCompany):
    try:
        product = {
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
        }
        product_db.insert_one(product)
        return {"status": "Ok"}
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}


@eel.expose
def set_order(date, productId, productName, productPrice, quantity, productType, productGenderType, productColor, userId, userName, userGender, userAge):
    try:
        order = {
            "order": {
                "order_status": "Pending",
                "order_date": date,
                "is_reviewed": False
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
        return {"status": "Ok"}
    except:
        print("Oops! Something went wrong")
        return {"status": "error"}
