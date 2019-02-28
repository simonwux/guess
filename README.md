# Guess 2/3

A guessing 2/3 of others' guessing game using node+express+react+mongo.
It contains two projects the backend that is on the root folder of this repo, and the frontend that lays on the [front](./front) folder

# Deployment

Deployment is using heroku and mongo atlas cloud database. The link is here: https://guess2of3.herokuapp.com/.

# Requires

Node
Express
npm
yarn
Mongo (it uses mongodb atlas cluster)

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

Which will run the front-end development server on the port 3000, then visit (http://localhost:3000) and you should see the app running. The backend is running on port 3001.

# Database

You can either use a local database or a cloud database. Just set your database url as MONGODB_URL in .env as an environment variable. It has 5 collections: count, guess, hist, users, winner.


# Author
Shuomin Wu and Yifei Chen

# Screenshots
![ScreenShot](https://github.com/simonwux/simonwux.github.io/blob/master/screenshot/1.PNG)

## Demonstration Video


## Class Link
[CS-5610 Web Development Spring 2019](http://johnguerra.co/classes/webDevelopment_spring_2019/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
