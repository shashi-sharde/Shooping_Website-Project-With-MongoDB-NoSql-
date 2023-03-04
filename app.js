const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

// const User = require('./models/user');

const app = express();
const mongoose = require('mongoose')
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('63ff116a623cbadb22a31c1e')
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(
          'mongodb+srv://Shashi:Shashi7033@cluster0.pu4xqe8.mongodb.net/shop?retryWrites=true&w=majority')
          .then(result =>{
            app.listen(3000)
            console.log("APP STARTED")
          })
          .catch(err =>{
            console.log(err)
          })