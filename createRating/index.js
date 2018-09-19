module.exports = function (context, req) {
    context.bindings.ratings = JSON.stringify({"id": "12", "name": "12"});
    context.log('----------------------------------------')
    context.log('1234')
    context.log('----------------------------------------')
    // let totalRatings = ratings.length;
    // context.log('Found '+ totalRatings +' ratings');
    
    // if(totalRatings === 0){
    //     context.res = { status: 404, body : "No ratings found" };
    // }
    // else {
    //     context.res = { body: ratings };
    // }
    context.done();
};