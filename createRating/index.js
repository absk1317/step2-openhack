let request = require('request')
let productsLookup = "https://serverlessohproduct.trafficmanager.net/api/GetProduct?productId"
let usersLookup = "https://serverlessohuser.trafficmanager.net/api/GetUser?userId"
module.exports = function (context, req) {
    let { body } = req, product, user, newRating, reqBody = body;
    let productUrl = `${productsLookup}=${body.productId}`;
    let userUrl = `${usersLookup}=${body.userId}`;
    let rating = body['rating']
    if(!rating || rating < 0 || rating > 5) {
        context.res = { body: 'rating must be between 0 to 5' }        
        context.done()
    }
    request(productUrl, (error, response, prodBody) => {
        if (prodBody != "Please pass a valid productId on the query string") {
            let jsonProduct = JSON.parse(prodBody);
            request(userUrl, (error, response, userBody) => {
                if (userBody != "Please pass a valid userId on the query string"){
                    reqBody['id'] = "1234567891"
                    reqBody['timestamp'] = new Date()
                    let newRating = context.bindings.ratings =  JSON.stringify(reqBody);
                    context.res = { body: newRating } 
                    context.done()
                } else {
                    context.res = { body: "Please pass a valid userId on the query string" }
                    context.done()
                }
            })
        } else {
            context.res = { body: prodBody }
            context.done()
        }        
    })
}