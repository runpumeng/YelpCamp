const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64c9b4c2330a5dc290dfed31',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam animi quam ratione laborum illo impedit, natus ut consequatur consectetur repellat facilis error quas ducimus reiciendis fuga sapiente quaerat suscipit a.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dnpvo1gwy/image/upload/v1691181217/YelpCamp/yr3d5trvt2qsfl2fx4ny.jpg',
                    filename: 'YelpCamp/yr3d5trvt2qsfl2fx4ny'
                },
                {
                    url: 'https://res.cloudinary.com/dnpvo1gwy/image/upload/v1691181219/YelpCamp/xfwygzzeoc3orxhfxpuh.jpg',
                    filename: 'YelpCamp/xfwygzzeoc3orxhfxpuh'
                },
                {
                    url: 'https://res.cloudinary.com/dnpvo1gwy/image/upload/v1691181222/YelpCamp/tsr6q5v8wgjqdkzedfqu.jpg',
                    filename: 'YelpCamp/tsr6q5v8wgjqdkzedfqu'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})