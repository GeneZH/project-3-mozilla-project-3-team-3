import csv
filename = "20171013111831-SurveyExport.csv"
with open(filename, encoding="ISO-8859-1") as f:
    reader = csv.reader(f)
    data_list = list(reader)
    csvFile = open('vis1.csv', 'w', newline='')
    writer = csv.writer(csvFile)
    fields = ['Price', 'Features', 'Safety', 'Security', 'Privacy','Reliability', 'User Review', 'Expert Recommendation', 'Friend or Family Recommendation', 'Convenience']
    writer.writerow([data_list[0][0], *fields])
    for row in data_list[1:]:
        if not any(value == '' for value in row[24:34]):
            writer.writerow([row[0], *row[24:34]])

    csvFile.close()

