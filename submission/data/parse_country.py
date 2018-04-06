import pandas as pd

data=pd.read_csv('20171013111831-SurveyExport.csv', encoding = "ISO-8859-1", dtype='unicode')
country = 'Country or Region (optional)'
country_ip = 'Country'
tech_level = 'I consider myself:'
level = ['Ultra Nerd', 'Technically Savvy', 'Average User', 'Luddite']

#fill missing data
data_country = data[country].fillna(data[country_ip])
data_tech = data[tech_level]
for i, value in data_tech.iteritems():
    if pd.isnull(value):
        continue
    for l in level:
        if l in value:
            data_tech[i] = l

output = pd.concat([data_country, data_tech], axis=1)
output.to_csv("country.csv", index=False)
