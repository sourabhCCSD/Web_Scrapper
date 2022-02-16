const express = require('express');
const env = require('dotenv');
const request = require('request-promise');

const app = express();
env.config();


const generateScrapperUrl = (apiKey) => {
    `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`
}

app.listen((process.env.PORT), () => {
    console.log(`server running at ${process.env.PORT || 5000}`);
});

//Get Product Details

app.get('/products/:productId', async (req,res) => {
    const {productId} = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})

//Get Product Reviews

app.get('/products/:productId/reviews', async (req,res) => {
    const {productId} = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})

//Get Product Offers

app.get('/products/:productId/offers', async (req,res) => {
    const {productId} = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/gp/offers-listing/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})

//Get Search Results

app.get('/search/:searchQuery', async (req,res) => {
    const {searchQuery} = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})