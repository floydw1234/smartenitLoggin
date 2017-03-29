from pymongo import MongoClient
import requests
client = MongoClient("mongodb://localhost:27017/west")
db = client.west
coll = db.ids

i = 0

r = requests.get('http://192.168.10.115:3000/allValues')
print r.json()[0]

for post in r.json():
	coll.insert_one(post)
	
