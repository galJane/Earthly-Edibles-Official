const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const Contact = require('../model/contact');
const User = require('../model/user');
const Checkout = require('../model/checkout');


/*
                Model instances
*/
const Ct1product = require("../model/ct1product");
const Ct2product = require("../model/ct2product");
const Ct3product = require("../model/ct3product");
const Ct4product = require("../model/ct4product");
const Cart = require("../model/cart");
const SavedOrder = require("../model/savedOrder");
const { findByIdAndDelete } = require('../model/contact');

const router = express.Router();

/*
                            Home page
*/
//home page
router.get('/', (req, res) => {
    res.render('home', { pageTitle: 'Home' });
});






/*
                      Cart pages
*/
//increase button for cart
router.get('/increase/:id', (req, res) => {
    Cart.findOneAndUpdate({ _id: req.params.id }, { $inc: { quantity: 1  } }, function (err, doc) { if (err) { console.log("err"); } });
    Cart.find()
        .then(results => {
            console.log(results);
            res.render('cart', { products: results, pageTitle: 'Cart Details', pageName: '', status: 1 });
        })
        .catch(err => console.log(err));
});

//decrease button
router.get('/decrease/:id', (req, res) => {
    Cart.findOneAndUpdate({ _id: req.params.id }, { $inc: { quantity: -1 } }, function (err, doc) { if (err) { console.log("err"); } });
    Cart.find()
        .then(results => {
            console.log(results);
            res.render('cart', { products: results, pageTitle: 'Cart Details', pageName: '', status: 1 });
        })
        .catch(err => console.log(err));
    
});

//delete button
router.delete('/:id', (req, res) => {
    Cart.findByIdAndDelete(req.params.id, function (err, doc) { if (err) { console.log("err"); } });
    Cart.find()
        .then(results => {
            console.log(results);
            res.render('cart', {products: results, pageTitle: 'Cart Details', pageName: '', status: 0 });
        })
        .catch(err => console.log(err));
    //console.log(req.params.id);
});




//cart 
router.get('/cart', (req, res) => {
    Cart.find()
        .then(results => {
            console.log(results);
            res.render('cart', { products: results, pageTitle: 'Cart Details', pageName: '', status: 0 });
        })
        .catch(err => console.log(err));
});

//add to cart button
router.post('/add-cart', (req, res) => {
    const itemId = req.body.id;
    if (req.body.catId == 'cat1') {
        Ct1product.findById(itemId)
            .then(result => {
                insertIntoCart(result, itemId);
                console.log('insert success')
            })
            .catch(err => console.log(err));
    } else if (req.body.catId == 'cat2') {
        Ct2product.findById(itemId)
            .then(result => {
                insertIntoCart(result, itemId);
                console.log('insert sucess')
            })

            .catch(err => console.log(err));
    } else if (req.body.catId == 'cat3') {
        Ct3product.findById(itemId)
            .then(result => {
                insertIntoCart(result, itemId);
                console.log('insert sucess')
            })

            .catch(err => console.log(err));
    } else if (req.body.catId == 'cat4') {
        Ct4product.findById(itemId)
            .then(result => {
                insertIntoCart(result, itemId);
                console.log('insert sucess')
                
            })

            .catch(err => console.log(err));
    }
});

function insertIntoCart(result, itemId) {
    Cart.findOneAndUpdate({ itemId: itemId }, { $inc: { quantity: 1 } }, function (err, doc) {
        if (err) { console.log("err"); }
        if (doc == null) {
            var prod = { itemId: itemId, title: result.title, price: result.price, quantity: 1, img: result.img };
            Cart.collection.insertOne(prod);
        }
    });
}


/*
                    Order submission
*/
//order page
router.get('/checkout', (req, res) => {
    Cart.find()
    .then(results => {
        console.log(results);
        res.render('checkout', { list: results, pageTitle: 'Checkout', pageTitle: 'Checkout', status: 0 });
    })
    .catch(err => console.log(err));


});



//modify checkout cart
router.get('/increment/:id', (req, res) => {
    Cart.findOneAndUpdate({ _id: req.params.id }, { $inc: { quantity: 1  } }, function (err, doc) { if (err) { console.log("err"); } });
    Cart.find()
        .then(results => {
            console.log(results);
            res.render('checkout', { list: results, pageTitle: 'Checkout', pageName: '', status: 1 });
        })
        .catch(err => console.log(err));
});

//decrease button
router.get('/decrement/:id', (req, res) => {
    Cart.findOneAndUpdate({ _id: req.params.id }, { $inc: { quantity: -1 } }, function (err, doc) { if (err) { console.log("err"); } });
    Cart.find()
        .then(results => {
            console.log(results);
            res.render('checkout', { list: results, pageTitle: 'Checkout', pageName: '', status: 1 });
        })
        .catch(err => console.log(err));
   
    
});

//delete button
router.delete('/delete/:id', (req, res) => {
    Cart.findByIdAndDelete(req.params.id, function (err, doc) { if (err) { console.log("err"); } });
    Cart.find()
        .then(results => {
            console.log(results);
            res.render('checkout', { list: results, pageTitle: 'Checkout', pageName: '', status: 0 });
        })
        .catch(err => console.log(err));
    //console.log(req.params.id);
});












//determine if user is guest or current customer
router.get('/logUser', (req, res) => {
    /*
    const userEmail = req.body.userEemail;  
    User.findOne( { userEmail: req.body.userEmail }, function(err, doc) { if (err) { console.log("err"); } 
     if(doc == null) {
      */
      
        res.render('logUser', { pageTitle: 'Start checkout', pageName: ''});
     /*}

    else {
        Cart.find()
     .then(results => {
        console.log(results);
        res.render('checkout', { list: results, pageTitle: 'Checkout', pageTitle: 'Checkout', status: 0 });
    })
    .catch(err => console.log(err))
    
            }
       */     
    });
  



/* submit new account to the DB */
router.post('/loggedUser', (req, res) => {
   
    
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;


    
    User.findOne( { userPassword: req.body.userPassword, userEmail: req.body.userEmail }, function(err, doc) { if (err) { console.log("err"); } 
        if(doc != null) {
        Cart.find()
         .then(results => {
             res.render('checkout', {list: results, pageTitle: 'Checkout', pageName: 'Checkout', status: 0});
         })
            .catch(err => console.log(err));
           
        } else { 
            res.render('logUser', {pageTitle: 'Start checkout', pageName:'',}); ;
        }
    });
});


/*
.catch(err => console.log(err));
*/
router.post('/submitCheckout', (req, res) => {

    /* schema model */
    const checkout = new Checkout({
        infoName: req.body.infoName,
        infoCard: req.body.infoCard,
        infoMonth: req.body.infoMonth,
        cvv: req.body.cvv,
        infoYear: req.body.infoYear,
        infoType: req.body.infoType,

        infoFirst: req.body.infoFirst,
        infoLast: req.body.infoLast,
        streetAddress: req.body.streetAddress,
        infoCity: req.body.infoCity,
        infoState: req.body.infoState,
        infoZip: req.body.infoZip,
        infoPhone: req.body.infoPhone
    });

    /*save order and assign order number */
    const date = new Date();
    const savedOrder = new SavedOrder({
        itemId: req.body.itemId,
        title: req.body.title,
        price: req.body.price,
        quantity: req.body.quantity,
        img: req.body.img,
        date: date,
    });




    /*
    Checkout.collection.insertOne(checkout)
    .then(result => {
        console.log('added to DB');  })
        .catch(err => console.log(err));
        
       
       */
    checkout.save()
    Cart.find()
        .then(result => {
            res.render('submitCheckout', { end: result, pageTitle: 'Submit Order', pageName: 'Submit Order' });
        })
        .catch(err => console.log(err));
    
    savedOrder.save()


});





/*
                    Contact pages
*/
//contact page
router.get('/contact', (req, res) => {
    res.render('contact', { pageTitle: 'Contact', pageName: 'Contact' });
})
/*
.catch(err => console.log(err));
*/
router.post('/submitContact', (req, res) => {

    /* schema model */
    const contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });

    contact.save()
        .then(result => {
            res.render('submitContact', { pageTitle: 'SubmitContact', pageName: 'SubmitContact' });
        })
        .catch(err => console.log(err));
});


/*
                      Item pages
*/

//fruit page
router.get('/index', (req, res) => {
    Ct1product.find()
        .then(results => {
            console.log(results);
            res.render('index', { products: results, pageTitle: 'Category1', pageName: 'Fruits' });
        })
        .catch(err => console.log(err));

});
//vegetables
router.get('/category2', (req, res) => {
    Ct2product.find()
        .then(results => {
            res.render('category2', { products: results, pageTitle: 'Category2', pageName: 'Vegetables' });
        })
        .catch(err => console.log(err));

});

//specialty
router.get('/category3', (req, res) => {
    Ct3product.find()
        .then(results => {
            res.render('category3', { products: results, pageTitle: 'Category3', pageName: 'Specialtys' });
        })
        .catch(err => console.log(err));

});

//nuts
router.get('/category4', (req, res) => {
    Ct4product.find()
        .then(results => {
            res.render('category4', { products: results, pageTitle: 'Category4', pageName: 'Nuts' });
        })
        .catch(err => console.log(err));

});

/*
                     Item detail pages
*/
//fruit detail
router.get('/category1/:prodId', (req, res) => {
    Ct1product.findById(req.params.prodId)
        .then(result => {
            console.log(result);
            res.render('product-detail', { prod: result, pageTitle: 'Home', pageName: 'Fruits' });
        })
        .catch(err => console.log(err));
});

//vegetable detail
router.get('/category2/:prodId', (req, res) => {
    Ct2product.findById(req.params.prodId)
        .then(result => {
            console.log(result);
            res.render('product-detail2', { prod: result, pageTitle: 'Category2', pageName: 'Vegetables' });
        })
        .catch(err => console.log(err));
});


//specialty detail
router.get('/category3/:prodId', (req, res) => {
    Ct3product.findById(req.params.prodId)
        .then(result => {
            console.log(result);
            res.render('product-detail3', { prod: result, pageTitle: 'Category3', pageName: 'Specialtys' });
        })
        .catch(err => console.log(err));
});


//nuts detail
router.get('/category4/:prodId', (req, res) => {
    Ct4product.findById(req.params.prodId)
        .then(result => {
            console.log(result);
            res.render('product-detail4', { prod: result, pageTitle: 'Category4', pageName: 'Nuts' });
        })
        .catch(err => console.log(err));
});

/*


    User Signin/Creation Pages

*/

/* Sign in page display */
router.get('/signin', (req, res) => {
    res.render('signin', { pageTitle: 'Signin', pageName: 'Signin' });
});

/* Sign in submission */

router.post('/submitSignin', (req, res) => {

    const userEmail = req.body.userEmail;      
     const userPassword = req.body.userPassword;
 //   var user = { userFName, userLName, userAddress: { add0, city, state, zip }, userPhone, email, password };
    User.findOne( { userPassword: req.body.userPassword, userEmail: req.body.userEmail  }, function(err, doc) { if (err) { console.log("err"); }
        if(doc != null){
          Ct1product.find()
           .then(results => {
            res.render('index', {products: results, pageTitle: 'Home', pageName: 'Fruits'});
           })
           .catch(err => console.log(err))
        }
        else{
            res.render('signin', {pageTitle: 'Signin', pageName: ''});
        }
    });
        
   // validate(); 
});





/* Display User creation Page */
router.get('/createUser', (req, res) => {
    res.render('createUser', {pageTitle: 'Create User', pageName: 'Create User'});
});

/* submit new account to the DB */
router.post('/submitAccount', (req, res) => {
   
    const userFName = req.body.userFName;  
    const userLName = req.body.userLName;
    const add0 = req.body.add0;         
    const city = req.body.city;
    const state = req.body.state; 
    const zip = req.body.zip;
    const userPhone = req.body.userPhone; 
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;


   var user = { userFName, userLName ,userEmail, userPassword, userAddress: { add0, city, state, zip, userPhone }  };
    User.findOne( { userEmail: req.body.userEmail }, function(err, doc) { if (err) { console.log("err"); } 
        if(doc == null) {
         User.collection.insertOne(user);
         Ct1product.find()
         .then(results => {
             res.render('index', {products: results, pageTitle: 'Home', pageName: 'Fruits'});
         })
            .catch(err => console.log(err));
           
        } else { 
            res.render('createUser', {pageTitle: 'Create User', pageName:'', message: 'Email already exists'}); ;
        }
    });
});

/*
    Login functionality
*/
/*
var attempt = 3;

function validate(result) {
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = docment.getElementById("userPassword").value;

    if(userEmail == req.body.userEmail && userPassword == req.body.userPassword) {
        then(result => {
            console.log('Login Success')
            var prod = { itemId: itemId, userFName: result.userFName, userLName: result.userLName, userAddress: result.userAddress, userCity: result.userCity, userState: result.userState, userZip: result.userZip, userPhone: result.userPhone, userEmail: result.userEmail}
            User.collection.
            res.render('login', { pageTitle: 'Login', pageName: 'Login'});
        })
    } else {
        attempt --;
        alert("You have "+attempt+" attempts left");
    }
    if(attempt == 0) {
        document.getElementById("userEmail").disabled = true;
        document.getElementById("userPassword").disabled = true;
        document.getElementById("submitSignin").disabled = true;
    }
}


function findUserandLogIn(result, itemId) {
    User.findById({itemId: itemId }, function(err, doc) {
        if(err) { console.log("err"); }
        if(doc == null) {
            var prod = { itemId: itemId, userFName: result.userFName, userLName: result.userLName, userAddress: result.userAddress, userCity: result.userCity, userState: result.userState, userZip: result.userZip, userPhone: result.userPhone, userEmail: result.userEmail}
            
        }
    })
}
*/
module.exports = router;