const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const User = require('./models/user');

const app = express();
const mongoose = require('mongoose')
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('64038e35b9e8f52a5676cf9e')
    .then(user => {
      req.user = user
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(
          'mongodb+srv://Shashi:Shashi7033@cluster0.pu4xqe8.mongodb.net/shop?retryWrites=true&w=majority')
          .then(result =>{
            User.findOne().then(user=>{
              if(!user){
                const user = new User({
                  name: "Shashi",
                  email: "shahsi@gmail.com",
                  cart: {
                    items: []
                  }
                });
                user.save()

              }
            });
            
            app.listen(3000)
            console.log("APP STARTED")
          })
          .catch(err =>{
            console.log(err)
          })