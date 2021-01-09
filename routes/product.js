const router = require('express').Router(),
    faker = require('faker'),
    Product = require('../models/Product');

router.get('/add-product', (req, res) => {
    // res.send('add');
    res.render('add-product');
});

router.post('/add-product', (req, res) => {
    console.log(req.body);
    const {category, name, price} = req.body,
        product = new Product();

    product.category = category;
    product.name = name;
    product.price = price;

    product.save((err) => {
        if (err) throw err;
        res.redirect('/add-product');
    });
});

router.get('/faker-data', (req, res) => {
    // for (let i = 0; i < 100; i++) {
    //     const product = new Product();
    //
    //     product.category = faker.commerce.department();
    //     product.name = faker.commerce.productName();
    //     product.price = faker.commerce.price();
    //
    //     product.save(err => console.log(err))
    // }
    res.redirect('/add-product');
});

router.get('/products/:page', (req, res, next) => {
    const pageEnd = 9;
    const page = req.params.page || 1;

    Product.find({})
        .skip((pageEnd * page) - pageEnd)
        .limit(pageEnd)
        .exec((err, products) => {
            // console.log(products);
            Product.count().exec((err, count) => {
                if(err) return next(err);

                res.render('products', {
                    products: products,
                    current: page,
                    pages: Math.ceil(count/pageEnd)
                })
            })
        })
});

module.exports = router;