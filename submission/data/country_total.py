import pandas as pd

data=pd.read_csv("country.csv", encoding = "ISO-8859-1", dtype='unicode')

#country -> ['Ultra Nerd', 'Technically Savvy', 'Average User', 'Luddite']
country = {}
country_col = 'Country or Region (optional)'
level_col = 'I consider myself:'
level = {'Ultra Nerd' : 0 , 'Technically Savvy' : 1, 'Average User' : 2, 'Luddite' : 3}

for index, row in data.iterrows():
    c = row[country_col]
    l = row[level_col]
    if pd.isnull(l) or pd.isnull(c):
        continue
    c = c.replace(",", "")
    if c not in country:
        country[c] = [0, 0, 0, 0]
    country[c][level[l]] +=1

f = open('country_total.csv', 'w')
label = ['Country', 'Ultra Nerd', 'Technically Savvy', 'Average User', 'Luddite']
f.write(','.join(label))
f.write('\n')
for key, value in country.items():
    print(key)
    f.write(key.lower())
    f.write(',')
    f.write(','.join(str(i) for i in value))
    f.write('\n')
