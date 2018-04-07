import csv
filename = "20171013111831-SurveyExport.csv"
with open(filename, encoding="ISO-8859-1") as f:
    reader = csv.reader(f)
    data_list = list(reader)
    csvFile = open('vis3.csv', 'w', newline='')
    writer = csv.writer(csvFile)
    fields = ['fear']
    writer.writerow([data_list[0][0],data_list[0][5], data_list[0][7], *fields])

    for row in data_list[1:]:
        if "other" in row[21]: writer.writerow([row[0], row[5], row[7], "Other"])
        elif "safe" in row[21]: writer.writerow([row[0], row[5], row[7], "We will be less safe"])
        elif "no fear" in row[21]: writer.writerow([row[0], row[5], row[7], "I have no fears about a more connected future"])
        elif "privacy" in row[21]: writer.writerow([row[0], row[5], row[7], "Loss of privacy"])
        elif row[21]!="": writer.writerow([row[0], row[5], row[7], "We will lose touch with one another"])
        else: continue

        

    csvFile.close()

    # F country H tech level I-S checked item

    