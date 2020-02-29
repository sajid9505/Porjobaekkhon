var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema(
    {
       first_name: {
           type: String,
           required: "First Name is required"
       },
      
       last_name: {
        type: String,
        required: "Last Name is required"
        },

        user_name: {
            type: String,
            required: "User Name is required"
        },

        email: {
            type: String,
            required: "Email is required"
        },

       password: {
           type: String,
           required: "Password is required"
       },
        
    }
)

var User = mongoose.model('User', UserSchema)

module.exports = User