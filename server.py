from __future__ import unicode_literals
import eel
from util.utils import message
from db.db_curd_function.insert import set_user
from db.db_curd_function.find import checkSignInDb, checkAdmin
from db.db_curd_function.update import update_user_password


eel.init('/home/zaid/Desktop/softwareDevProject/Online-Shoe')

eel.start('./SignUpLOgin/SignUpLogin.html',  size=(1000, 600))
