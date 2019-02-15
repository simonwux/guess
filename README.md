# simpleNodeMongoReactApp

A very simple Node+Express+Mongo+React app that I did for my webDev class.

It contains two projects the backend that is on the root folder of this repo, and the frontend that lays on the [front](./front) folder

# Requires

Node
Express
npm
yarn
Mongo (it defaults to a local Mongo server running on 27017 without auth)

# Usage

Clone the repo, then open the terminal on the folder created and run

```
npm install
npm start
```

This will run the backend on the port 3001, then open another terminal and run

```
cd front
yarn install
yarn start
```

Which will run the front-end development server on the port 3000, then visit (http://localhost:3000) and you should see the app running

# Database

It assumes Mongo to be running locally with a database called duto_guerra_followers, populated with documents like:

```
{
  "_id": "5c59e8213d11b9cec680b8ee",
  "user": "duto_guerra",
  "i": 2,
  "follower": {
    "id": 286373521,
    "id_str": "286373521",
    "name": "diego alvarado",
    "screen_name": "diegoalvarado",
    "location": "",
    "description": "",
    "url": null,
    "entities": {
      "description": {
        "urls": []
      }
    },
    "protected": true,
    "followers_count": 66,
    "friends_count": 390,
    "listed_count": 1,
    "created_at": "Fri Apr 22 21:44:38 +0000 2011",
    "favourites_count": 2,
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": false,
    "verified": false,
    "statuses_count": 0,
    "lang": "en",
    "contributors_enabled": false,
    "is_translator": false,
    "is_translation_enabled": false,
    "profile_background_color": "C0DEED",
    "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
    "profile_background_tile": false,
    "profile_image_url": "http://pbs.twimg.com/profile_images/378800000510362523/bacdc9082b7e92133c36d05e20a942c1_normal.jpeg",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/378800000510362523/bacdc9082b7e92133c36d05e20a942c1_normal.jpeg",
    "profile_banner_url": "https://pbs.twimg.com/profile_banners/286373521/1372516660",
    "profile_link_color": "1DA1F2",
    "profile_sidebar_border_color": "C0DEED",
    "profile_sidebar_fill_color": "DDEEF6",
    "profile_text_color": "333333",
    "profile_use_background_image": true,
    "has_extended_profile": false,
    "default_profile": true,
    "default_profile_image": false,
    "following": false,
    "live_following": false,
    "follow_request_sent": false,
    "notifications": false,
    "muting": false,
    "blocking": false,
    "blocked_by": false,
    "translator_type": "none"
  }
}
```