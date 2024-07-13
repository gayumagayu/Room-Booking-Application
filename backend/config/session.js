const session = require('express-session');
const MongoStore = require('connect-mongo'); // To store sessions in MongoDB

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'gayathrisankar', // Replace with a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI, // Ensure you have MONGO_URI in your .env file
    collectionName: 'sessions' // Name of the collection to store sessions
  })
};

module.exports = sessionConfig;
