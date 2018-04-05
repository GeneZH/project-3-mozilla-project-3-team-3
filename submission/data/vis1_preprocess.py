import csv
filename = "20171013111831-SurveyExport.csv"
with open(filename, encoding="ISO-8859-1") as f:
    reader = csv.reader(f)
    data_list = list(reader)
    csvFile = open('vis1.csv', 'w', newline='')
    writer = csv.writer(csvFile)
    writer.writerow([data_list[0][0], *data_list[0][24:33]])
    for row in data_list[1:]:
            writer.writerow([row[0], *row[24:33]])

    csvFile.close()

