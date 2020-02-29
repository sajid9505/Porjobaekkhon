module.exports = function(app){

    var UserController = require('./../controllers/user.controller')
    
    app.post('/new_user', UserController.newuser)
    app.get('/user_login', UserController.userlogin)
   
    
}