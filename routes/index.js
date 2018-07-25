var express = require('express');
var router = express.Router();
var controller = require('../controller');

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log("Routing middleware start............");
  next()
});

// middleware
var requestTime = function (req, res, next)
{
 var d = new Date(Date.now());
 console.log("Api request at--------------------- "+ d.toLocaleString() );
 next()
}
router.use(requestTime);

// a middleware sub-stack shows request info for any type of HTTP request
router.use(function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  console.log("Routing middleware end............");
  next()
})


router.get('/webcrawl', controller.webCrawlController.startWebCrawl);
router.get('/rssfeed',controller.webCrawlController.startRssCrawl);
router.get('/weburls' ,controller.webCrawlController.getWebCrawlingUrls);
router.get('/posts' ,controller.webCrawlController.getCrawlingPosts);

router.post('/user/signIn',controller.userController.signIn);
router.post('/user/myInfo',controller.userController.myInfo);
router.post('/user/signUp',controller.userController.signUp);
router.get('/user/alluser',controller.userController.allUserCount);

// html page render code
router.get('/policy', controller.viewController.privacypolicy);
router.get('/rules' ,controller.viewController.rules);


module.exports = router;
