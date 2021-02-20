const mongoose = require('mongoose')

 
const campaignSchema = mongoose.Schema({
    name : String,
    status: String, 

})
 
module.exports = mongoose.model('Campaign' , campaignSchema)
 