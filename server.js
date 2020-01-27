// General Imports
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema/schema');

// Middleware Imports
const helmet = require('helmet');
const bodyParser = require('body-parser');
// const passport = require('passport');
const rateLimit = require("express-rate-limit");
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Global Variables and Variable Imports
const { mongoURI } = require('./config/keys');

// DB Imports
const mongoose = require('mongoose');

// Route Imports
// const users = require('./routes/users');

// Express instance
const app = express();

// Middleware

// Helmet
app.use(helmet());

// Limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1000
});
app.use(limiter);

// Body Parser JSON
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

// MongoDB Connection using Mongoose ODM
// mongoose.connect(mongoURI, { useNewUrlParser: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));





// app.use(passport.initialize());
// require('./config/passport')(passport);

// app.use('*', passport.authenticate('jwt', { session: false }));
// app.use('/graphql', (req, res, next) => {
//   passport.authenticate('jwt', { session: false }, (err, user, info) => {
//     console.log(err);
//     console.log(user);
//     console.log(info);

//     next()
//   })(req, res, next)
// })

// JWT Check from Auth0 Auth
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://rjd.eu.auth0.com/.well-known/jwks.json',
  }),

  // Validate the audience and the issuer.
  audience: 'https://rjd.eu.auth0.com/api/v2/',
  issuer: 'https://rjd.eu.auth0.com/',
  algorithms: ['RS256']
});

// const clog = (req) => {
//   console.log(req.headers);
// }

// Route with JWT check for Auth
app.use('/graphql', checkJwt);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    console.log('Invalid token...')
    // console.log(err)
    res.status(401).send('Invalid token...');
  }
});

// app.use('/api/users', users);
// app.use('/workplz', (req, res) => {
//   return res.json({ hello: 'it works!' })
// });

const apolloContext = req => {
  console.log(req);
};

// Create Apollo Server with Express Middleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    authScope: req.user.sub
  }),
  // formatError: error => {
  //   console.log(error);
  //   return error;
  // },
  // formatResponse: response => {
  //   console.log(response);
  //   return response;
  // }
});
server.applyMiddleware({ app });

// Start Server
app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Server running on port ${port}`));
