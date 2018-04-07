import csv
filename = "20171013111831-SurveyExport.csv"
with open(filename, encoding="ISO-8859-1") as f:
    reader = csv.reader(f)
    data_list = list(reader)
    csvFile = open('vis2.csv', 'w', newline='')
    writer = csv.writer(csvFile)
    fields = ['Router', 'Laptop Computer', 'Smart Phone', 'Smart TV', 'Activity Tracker', 'Smarthome Hub', 'Car', 'Smart Thermostat', 'Smart Appliance', 'Smart Door Locks', 'Smart Lighting']
    writer.writerow([data_list[0][0],data_list[0][5], data_list[0][7],*fields])
    for row in data_list[1:]:
        writer.writerow([row[0], row[5], row[7], *row[8:19]])

    csvFile.close()

    # F country H tech level I-S checked item