let axios = require('axios');
// let request = require('request')
let productsLookup = "https://serverlessohproduct.trafficmanager.net/api/GetProduct?productId"
let usersLookup = "https://serverlessohproduct.trafficmanager.net/api/GetUser?userId"
module.exports = async function (context, req) {
    let { body } = req, product, user, newRating;
    let response = await axios.get(`productsLookup=${body.productId}`)
         .then(response => {
            this.product = response;
            axios.get(`usersLookup=${body.userId}`)
            .then(response => {
              this.user = response;
            })
         })
         .then(() => {
            newRating = context.bindings.ratings = req.body;
            return newRating
            // context.res = { body : newRating };
            // context.done()
         })
         .catch( error => {
            context.log('--------------------------')
            context.log(error)
            context.done()
            context.log('--------------------------')
         })
    // if(newRating){
    //     context.res = { body : newRating };
    // }
    // else {
    //     context.res = { status: 404, body: this.product || "abcd" };
    // }
    // context.done();
};