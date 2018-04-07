# Project 3
## Visualizations
### Preprocessing
Because the raw data file exceeds 100MB, the file size limit of GitHub, so we all did some preprocessing, like dropping the unused columns to squeeze the file size to make it able to upload on GitHub. We did preprocessing for our visualizations separately, that is each visualization has its own data file.

### Filtering
When we took the first look of the dataset, we realized that different answer on two fields, the country(region) and the "I consider myself:" could make great difference on the rest answers. So we decided to create all our visualizations based on these 2 filters. When open our project's page, first you will need to choose a country on the map, or click on a blank area to choose the whole world; then you will need to choose a "technology level" on the pie chart, or click on the middle area to choose all of the options. Then the the data of three visualizations below is filtered based on your choice.

### Visualization 1
The first visualization is visualizing the question "You are planning on buying your next cool new tech toy. Maybe it's a smart TV or a new smartphone. Take a look at the items below and arrange them in order of importance as you make that purchase." We thought this question was very interesting because we can see what reasons will make customers to buy a product. Not only calculated their mean value, we also calculated their standard deviation to see if there's any option's importance vary a lot among different people.
### Visualization 2
The second visualization is visualizing the question "Check all the internet connected devices you currently own" using bar chart.
### Visualization 3
The third visualizaiton is visualizing the question "What is your biggest fear as we move towards a more connected future" using pie chart.

## Contributions

* Chih-Wei created the visualizations used for filtering, the map and the donut.

* Yuhan created the first visualizations and api for coordinating between the filter visualizations and 3 visualizations below.

* Yijun created the second and the third visualizations. 

## How to run?
- Under the submission directory, start a local server using python 3:

    ```bash
    $ python3 -m http.server <port number>
    ```

    Default should be port 8000.

    Please install python3 if you don't have it.

    Mac OS:
    ```
    $ brew python3
    ```

    Linux:
    ```
    $ sudo apt-get python3
    ```

- Open the browser and go to:

    ```
    http://localhost:<port number>
    ```
