import json
import datetime
import sys
# from io import StringIO
# io = StringIO("[ObjectId('62b88028b458694c81ae3985'), ObjectId('62b8aa6eb458694c81ae3988'), ObjectId('62b94974f8a25abc4d8017ac'), ObjectId('62b95085f8a25abc4d8017b0')]")
# # print(sys.path)
# # print(str(datetime.datetime.now()))
# obj1 = json.loads(io)
# print(obj1)
# from ast import literal_eval
# s = "['62b88028b458694c81ae3985', '62b8aa6eb458694c81ae3988', '62b94974f8a25abc4d8017ac', '62b95085f8a25abc4d8017b0']"
# print(literal_eval(s))
import random

code = ''
i = 0
while i < 6:
    r = random.randint(0, 9)
    code = code + str(r)
    i += 1
print(code)
