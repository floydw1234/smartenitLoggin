from pymongo import MongoClient
import time
import numpy
import datetime
import calendar

#from dateutil.relativedelta import relativedelta

today = datetime.datetime.today()
print today
first_day = today.replace(day=1, hour=0, minute=0,second=0, microsecond=0)
if today.day > 25:
    first_day = (first_day + relativedelta(months=1))



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


if time.localtime().tm_isdst = 0:
	hourLimit = int(time.time() - hourLimit)
	dayLimit = int(time.time() - dayLimit)
	weekLimit = int(time.time() - weekLimit)
	monthLimit = calendar.timegm(first_day.utctimetuple()) + 3600 * 8
else:
	hourLimit = int(time.time() - hourLimit) + 3600
	dayLimit = int(time.time() - dayLimit) + 3600
	weekLimit = int(time.time() - weekLimit) + 3600
	monthLimit = calendar.timegm(first_day.utctimetuple()) + 3600 * 8 + 3600


limits = []
limits.append(hourLimit)
limits.append(dayLimit)
limits.append(weekLimit)
limits.append(monthLimit)
Time = []
Time.append(datetime.datetime.fromtimestamp(int(hourLimit)).strftime('%Y-%m-%d %H:%M:%S'))
Time.append(datetime.datetime.fromtimestamp(int(dayLimit)).strftime('%Y-%m-%d %H:%M:%S'))
Time.append(datetime.datetime.fromtimestamp(int(weekLimit)).strftime('%Y-%m-%d %H:%M:%S'))
Time.append(datetime.datetime.fromtimestamp(int(monthLimit)).strftime('%Y-%m-%d %H:%M:%S'))
nameArray = []
nameArray.append("hour")
nameArray.append("day")
nameArray.append("week")
nameArray.append("month")
print


#print hourLimit
#print dayLimit
#print weekLimit


collOut.remove({"timeStamp": hourLimit, "type": "hourAverage"})
collOut.remove({"timeStamp": dayLimit, "type": "dayAverage"})
collOut.remove({"timeStamp": weekLimit, "type": "weekAverage"})
collOut.remove({"timeStamp": hourLimit, "type": "hourMedian"})
collOut.remove({"timeStamp": dayLimit, "type": "dayMedian"})
collOut.remove({"timeStamp": weekLimit, "type": "weekMedian"})
collOut.remove({"timeStamp": monthLimit, "type": "monthMedian"})
collOut.remove({"timeStamp": monthLimit, "type": "monthMedian"})



allValues = []


for post in collIn.find( { "timePolled": { "$gt": hourLimit }}):
	hourValues.append(post['value'])
allValues.append(hourValues)
for post in collIn.find( { "timePolled": { "$gt": dayLimit }}):
	dayValues.append(post['value'])
allValues.append(dayValues)
for post in collIn.find( { "timePolled": { "$gt": weekLimit }}):
	weekValues.append(post['value'])
allValues.append(weekValues)
for post in collIn.find( { "timePolled": { "$gt": monthLimit }}):
	monthValues.append(post['value'])
allValues.append(weekValues)




for i in range(0,len(allValues)):
	if not allValues[i]:
		print "no readings in last " + nameArray[i]
	else:
		typeAvg = nameArray[i] + "Average"
		typeMed = nameArray[i] + "Median"
		collOut.insert_one({"type": typeAvg, "value": numpy.median(allValues[i]), "timeStamp" : limits[i], "datetime" :Time[i]})
		collOut.insert_one({"type": typeMed, "value": numpy.average(allValues[i]), "timeStamp" : limits[i] , "datetime" : Time[i]})
		print "Successfully found avgs"


#print numpy.average(hourValues)
#print numpy.median(hourValues)
