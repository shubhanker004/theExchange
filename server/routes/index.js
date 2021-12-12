const express = require('express');
const router = express.Router();

const brandsRoute = require('./brands-route');
const usersRoute = require('./users-route');
const authRoute = require('./auth-route');
const productsRoute = require('./products-route')
const siteRoute = require('./site-route');


const routesIndex = [
  {
    path:'/auth',
    route: authRoute
  },
  {
    path: '/users',
    route: usersRoute
  },
  {
    path: '/brands',
    route: brandsRoute
  },
  {
    path: '/products',
    route: productsRoute
  },
  {
    path: '/site',
    route: siteRoute
  }
]

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;