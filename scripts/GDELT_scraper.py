import requests
import zipfile

file = requests.get('http://data.gdeltproject.org/gdeltv2/20220824133000.export.CSV.zip', stream=True)



with open(file.content, 'r') as f:
    if zipfile.is_zipfile(f) is True:
        print("ZIP file is valid.")

import wget
import os
import datetime



os.listdir()


if url.split('/')[-1] in os.listdir():
    continue
if url.split('/')[-1] not in os.listdir():
    print(url.split('/')[-1] + '      is NOT AT ALL in     ' + os.getcwd())

def parse_dates(start_date, end_date):
    if end_date < start_date:
        print("not valid dates")
        return
    junk_partial_url = 'http://data.gdeltproject.org/gdeltv2/20210824133000.export.CSV.zip'

    datetime_iterative = datetime.datetime.strptime(start_date,'%Y%m%d%H%M%S')
    timedelta_fifteen = datetime.timedelta(minutes=15)
    while datetime_iterative.strftime('%Y%m%d%H%M%S') <= end_date:
        datetime_string = datetime_iterative.strftime('%Y%m%d%H%M%S')
        #full_url = f'http://data.gdeltproject.org/gdeltv2/{datetime_string}.export.CSV.zip'
        full_url = f'http://data.gdeltproject.org/gdeltv2/{datetime_string}.mentions.CSV.zip'
        if full_url.split('/')[-1] in os.listdir():
            continue
        get_GDELT_data(full_url)
        datetime_iterative += timedelta_fifteen

def get_GDELT_data(url):
    returned_filename = wget.download(url)
    with zipfile.ZipFile(returned_filename, mode='r') as archive:
        for file in archive.namelist():
            archive.extract(file)
    os.remove(returned_filename)

parse_dates('20220502000000', '20220502234500')

import psycopg2
from config import config

conn = psycopg2.connect("dbname=gdelt_scrape user=postgres password=postgres")

cur = conn.cursor()
cur.execute('SELECT * FROM events limit 5;')
cur.execute('SELECT * FROM mentions limit 5;')
database_name = cur.fetchone()
print(database_name)

cur.execute(f'CREATE TABLE mentions({header_with_types});')
cur.execute(f'DROP TABLE mentions;')
cur.execute("rollback")

header_string = 'GLOBALEVENTID	SQLDATE	MonthYear	Year	FractionDate	Actor1Code	Actor1Name	Actor1CountryCode	Actor1KnownGroupCode	Actor1EthnicCode	Actor1Religion1Code	Actor1Religion2Code	Actor1Type1Code	Actor1Type2Code	Actor1Type3Code	Actor2Code	Actor2Name	Actor2CountryCode	Actor2KnownGroupCode	Actor2EthnicCode	Actor2Religion1Code	Actor2Religion2Code	Actor2Type1Code	Actor2Type2Code	Actor2Type3Code	IsRootEvent	EventCode	EventBaseCode	EventRootCode	QuadClass	GoldsteinScale	NumMentions	NumSources	NumArticles	AvgTone	Actor1Geo_Type	Actor1Geo_FullName	Actor1Geo_CountryCode	Actor1Geo_ADM1Code	Actor1Geo_ADM2Code	Actor1Geo_Lat	Actor1Geo_Long	Actor1Geo_FeatureID	Actor2Geo_Type	Actor2Geo_FullName	Actor2Geo_CountryCode	Actor2Geo_ADM1Code	Actor2Geo_ADM2Code	Actor2Geo_Lat	Actor2Geo_Long	Actor2Geo_FeatureID	ActionGeo_Type	ActionGeo_FullName	ActionGeo_CountryCode	ActionGeo_ADM1Code	ActionGeo_ADM2Code	ActionGeo_Lat	ActionGeo_Long	ActionGeo_FeatureID	DATEADDED	SOURCEURL'
header_string_list = header_string.split()
header_string_list_appended = [h + ' TEXT' for h in header_string_list]
header_with_types = ','.join(header_string_list_appended)
header_string_comma = ','.join(header_string_list)

mentions_header_string = 'GLOBALEVENTID	EventTimeDate	MentionTimeDate	MentionType	MentionSourceName	MentionIdentifier	SentenceID	Actor1CharOffset	Actor2CharOffset	ActionCharOffset	InRawText	Confidence	MentionDocLen	MentionDocTone'

def format_headers(string):
    header_string_list = string.split()
    header_string_list_appended = [h + ' TEXT' for h in header_string_list]
    header_with_types = ','.join(header_string_list_appended)
    header_string_comma = ','.join(header_string_list)
    return header_with_types, header_string_comma

header_with_types, header_string_comma = format_headers('GLOBALEVENTID	EventTimeDate	MentionTimeDate	MentionType	MentionSourceName	MentionIdentifier	SentenceID	Actor1CharOffset	Actor2CharOffset	ActionCharOffset	InRawText	Confidence	MentionDocLen	MentionDocTone  Extras  AddNewFields')

cur.execute(f"COPY events({header_string_comma}) FROM '/Users/j.michaelshcokley/Downloads/scripts/20220502000000.export.CSV' DELIMITER '\t';")
cur.execute('SELECT * FROM information_schema.columns WHERE table_name = `mentions`;')


def copy_into_sql(start_date, end_date):
    if end_date < start_date:
        print("not valid dates")
        return
    junk_partial_path = '/Users/j.michaelshcokley/Downloads/scripts/20220502000000.export.CSV'

    datetime_iterative = datetime.datetime.strptime(start_date, '%Y%m%d%H%M%S')
    timedelta_fifteen = datetime.timedelta(minutes=15)
    while datetime_iterative.strftime('%Y%m%d%H%M%S') <= end_date:
        datetime_string = datetime_iterative.strftime('%Y%m%d%H%M%S')
        # full_url = f'/Users/j.michaelshcokley/Downloads/scripts/{datetime_string}.export.CSV'
        #full_url = f'http://data.gdeltproject.org/gdeltv2/{datetime_string}.mentions.CSV.zip'
        cur.execute(f"COPY mentions({header_string_comma}) FROM '/Users/j.michaelshcokley/Downloads/scripts/{datetime_string}.mentions.CSV' DELIMITER '\t';")
        datetime_iterative += timedelta_fifteen

copy_into_sql('20220502000000', '20220502234500')


vane_urls = 'https://almarsad.co/2022/05/02/%d8%a7%d9%84%d8%b9%d9%85%d9%84%d9%8a%d8%a9-%d8%a7%d9%84%d8%b9%d8%b3%d9%83%d8%b1%d9%8a%d8%a9-%d8%a7%d9%84%d8%ae%d8%a7%d8%b5%d8%a9-%d8%a7%d9%84%d8%b1%d9%88%d8%b3%d9%8a%d8%a9-%d9%81%d9%8a-%d8%a3%d9%88-15/ http://alwasat.ly/news/international/357686 https://almarsad.co/2022/05/02/%d8%aa%d9%84-%d8%a3%d8%a8%d9%8a%d8%a8-%d8%aa%d8%b3%d8%aa%d8%af%d8%b9%d9%8a-%d8%a7%d9%84%d8%b3%d9%81%d9%8a%d8%b1-%d8%a7%d9%84%d8%b1%d9%88%d8%b3%d9%8a-%d9%84%d9%84%d8%a7%d8%b3%d8%aa%d9%81%d8%b3%d8%a7/ https://lana.gov.ly/post.php?lang=ar&id=241388 http://alwasat.ly/news/international/357750 https://www.libya-al-mostakbal.org/10/38221/%D9%84%D8%A7%D9%81%D8%B1%D9%88%D9%81-%D9%81%D8%A7%D8%BA%D9%86%D8%B1-%D9%85%D9%88%D8%AC%D9%88%D8%AF%D8%A9-%D9%81%D9%8A-%D9%84%D9%8A%D8%A8%D9%8A%D8%A7-%D8%A8%D8%B7%D9%84%D8%A8-%D9%85%D9%86-%D8%A7%D9%84%D8%B3%D9%84%D8%B7%D8%A7%D8%AA-%D9%88%D9%84%D8%A7-%D8%B9%D9%84%D8%A7%D9%82%D8%A9-%D9%84%D8%B1%D9%88%D8%B3%D9%8A%D8%A7-%D8%A8%D9%87%D8%A7.html https://www.libya-al-mostakbal.org/88/38221/%D9%84%D8%A7%D9%81%D8%B1%D9%88%D9%81-%D9%81%D8%A7%D8%BA%D9%86%D8%B1-%D9%85%D9%88%D8%AC%D9%88%D8%AF%D8%A9-%D9%81%D9%8A-%D9%84%D9%8A%D8%A8%D9%8A%D8%A7-%D8%A8%D8%B7%D9%84%D8%A8-%D9%85%D9%86-%D8%A7%D9%84%D8%B3%D9%84%D8%B7%D8%A7%D8%AA-%D9%88%D9%84%D8%A7-%D8%B9%D9%84%D8%A7%D9%82%D8%A9-%D9%84%D8%B1%D9%88%D8%B3%D9%8A%D8%A7-%D8%A8%D9%87%D8%A7.html http://alwasat.ly/news/economy/357751 http://alwasat.ly/news/international/357702 http://alwasat.ly/news/international-sports/357743 https://www.libya-al-mostakbal.org/10/38223/%D9%85%D9%81%D9%88%D8%B6%D9%8A%D8%A9-%D8%A7%D9%84%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%A8%D8%A7%D8%AA-%D8%B9%D8%A7%D8%B2%D9%85%D9%88%D9%86-%D8%B9%D9%84%D9%89-%D8%AA%D8%AD%D9%82%D9%8A%D9%82-%D8%B7%D9%85%D9%88%D8%AD%D8%A7%D8%AA-%D8%A7%D9%84%D9%84%D9%8A%D8%A8%D9%8A%D9%8A%D9%86-%D9%86%D8%AD%D9%88-%D8%A7%D9%84%D8%AF%D9%8A%D9%85%D9%82%D8%B1%D8%A7%D8%B7%D9%8A%D8%A9.html http://alwasat.ly/news/international-sports/357732 http://alwasat.ly/news/international/357753 https://www.libyaakhbar.com/news/1846693.html https://www.libyaakhbar.com/news/1846489.html http://alwasat.ly/news/economy/357715 http://alwasat.ly/news/international/357754 http://alwasat.ly/news/libya/357711 https://www.libyaakhbar.com/business-news/1846651.html https://lana.gov.ly/post.php?lang=ar&id=241382 https://www.libyaakhbar.com/news/1846960.html http://alwasat.ly/news/libya/357757 https://www.libya-al-mostakbal.org/10/38220/%D9%86%D9%88%D9%81%D8%A7-%D9%85%D8%A8%D8%B9%D9%88%D8%AB-%D8%A7%D9%84%D8%A3%D9%85%D9%85-%D8%A7%D9%84%D9%85%D8%AA%D8%AD%D8%AF%D8%A9-%D8%A7%D9%84%D9%82%D8%A7%D8%AF%D9%85-%D9%81%D9%8A-%D9%84%D9%8A%D8%A8%D9%8A%D8%A7-%D8%B3%D9%8A%D9%83%D9%88%D9%86-%D8%A3%D9%81%D8%B1%D9%8A%D9%82%D9%8A%D8%A7.html https://www.libya-al-mostakbal.org/88/38220/%D9%86%D9%88%D9%81%D8%A7-%D9%85%D8%A8%D8%B9%D9%88%D8%AB-%D8%A7%D9%84%D8%A3%D9%85%D9%85-%D8%A7%D9%84%D9%85%D8%AA%D8%AD%D8%AF%D8%A9-%D8%A7%D9%84%D9%82%D8%A7%D8%AF%D9%85-%D9%81%D9%8A-%D9%84%D9%8A%D8%A8%D9%8A%D8%A7-%D8%B3%D9%8A%D9%83%D9%88%D9%86-%D8%A3%D9%81%D8%B1%D9%8A%D9%82%D9%8A%D8%A7.html http://alwasat.ly/news/international/357734 http://alwasat.ly/news/cars/357699 http://alwasat.ly/news/economy/357721 https://www.libyaakhbar.com/libya-news/1846640.html https://www.libyaakhbar.com/libya-news/1846699.html https://almarsad.co/2022/05/02/%d8%a7%d9%84%d8%a8%d8%a7%d8%b1%d9%88%d9%86%d9%8a-%d8%a7%d9%84%d9%86%d8%b8%d8%a7%d9%85-%d8%a7%d9%84%d8%b3%d9%8a%d8%a7%d8%b3%d9%8a-%d9%81%d9%8a-%d9%85%d8%b5%d8%b1-%d9%8a%d9%88%d8%ac%d9%87-%d8%a7%d9%84/'
vane_urls_list = vane_urls.split()
vane_urls_string = "', '".join(vane_urls_list)

cur.execute(f"SELECT * FROM events where SOURCEURL in ('{vane_urls_string}');")
cur.execute(f"SELECT * FROM mentions where MentionIdentifier in ('{vane_urls_string}');")
cur.execute(f"SELECT SOURCEURL FROM events where SOURCEURL contains 'http://alwasat.ly/' limit 50;")

result = cur.fetchall()
print(result)
print(database_name)