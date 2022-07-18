import eel
from bson.objectid import ObjectId
from connection import get_database

dbname = get_database()
user_info_db = dbname["user_info_db"]
order_db = dbname["order_db"]
product_db = dbname[" product_db"]


@eel.expose
def delete_single_product(id):
    product_db.delete_one({"_id": ObjectId(id)})
    return {'status': 'deleted'}
