from pymongo import MongoClient
import time
import numpy
import datetime

client = MongoClient("mongodb://localhost:27017/west")
db = client.west
collIn = db.ids
collOut = db.averages
dayValues = []
hourValues = []
weekValues = []
monthValues = []

dayLimit = 0
hourLimit = 0
weekLimit = 0

#weekLimit = time.time() %(3600*24*7)


hourLimit = time.time() % (3600) # finds time since last hour

if time.time()%(3600*24) -28805 < 0:  #finds time since 00:00:00
	dayLimit = time.time()%(3600*24) + 57600
else:
	dayLimit = time.time()%(3600*24) -28800

#finds time since monday at 00:00:00
if time.time() % (3600*24*7) + 143958.154 > (3600*24*7):
	weekLimit = time.time() % (3600*24*7) - 374400
else:
	weekLimit = time.time() % (3600*24*7) + 230400

hourLimit = int(time.time() - hourLimit)
dayLimit = int(time.time() - dayLimit)
weekLimit = int(time.time() - weekLimit)


# 1488182400 is the local time at monday 00:00:00

collOut.remove({"timeStamp": hourLimit})
collOut.remove({"timeStamp": dayLimit})
collOut.remove({"timeStamp": weekLimit})




for post in collIn.find( { "timePolled": { "$gt": hourLimit }}):
	hourValues.append(post['value'])
for post in collIn.find( { "timePolled": { "$gt": dayLimit }}):
	dayValues.append(post['value'])
for post in collIn.find( { "timePolled": { "$gt": weekLimit }}):
	weekValues.append(post['value'])

#print numpy.average(hourValues)
#print numpy.median(hourValues)

hourDateTime = datetime.datetime.fromtimestamp(int(hourLimit)).strftime('%Y-%m-%d %H:%M:%S')
dayDateTime =  datetime.datetime.fromtimestamp(int(dayLimit)).strftime('%Y-%m-%d %H:%M:%S')
weekDateTime = datetime.datetime.fromtimestamp(int(weekLimit)).strftime('%Y-%m-%d %H:%M:%S')
	
collOut.insert_one({"type": "hrlyaverage", "value": numpy.average(hourValues), "timeStamp" : hourLimit , "datetime" : hourDateTime})
collOut.insert_one({"type": "dlyaverage", "value": numpy.average(dayValues), "timeStamp" : dayLimit, "datetime" :dayDateTime})
collOut.insert_one({"type": "wklyaverage", "value": numpy.average(weekValues), "timeStamp" : weekLimit, "datetime" :weekDateTime})
collOut.insert_one({"type": "hrlyMedian", "value": numpy.median(hourValues), "timeStamp" : hourLimit, "datetime" :hourDateTime})
collOut.insert_one({"type": "dlyMedian", "value": numpy.median(dayValues), "timeStamp" : dayLimit, "datetime" :dayDateTime})
collOut.insert_one({"type": "wklyMedian", "value": numpy.median(weekValues), "timeStamp" : weekLimit, "datetime" :weekDateTime})

print "Successfully found avgs"


	
