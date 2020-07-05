const express = require("express");
const mongoose = require("mongoose");
const app = new express();

const http = require('http').createServer(app);


const userModel = require('./models/user')
const orderModel = require('./models/order');





//DB connection
mongoose.connect('mongodb://localhost:27017/testing', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, data) => {
    if (err) console.log(err)
    else console.log("Mongo DB connected")
});
mongoose.set('useFindAndModify', false);




app.get('/getAverage', (req, res) => {


    orderModel.aggregate([

        {
            $lookup: {
                "from": "users",
                "localField": "userId",
                "foreignField": "_id",
                "as": "user"
            }
        }
        , { $unwind: "$user" },
        {
            $group: {
                "_id": "$user._id",
                "noOfOrders": { $sum: 1 },
                "averageBillValue": { $avg: "$subtotal" },
                "name": { "$first": "$user.name" }

            }
        },


    ]).then(result => {

        return res.status(200).send(result)
    }).catch(err => { throw err })
})


app.post('/updateUser', (req, res) => {

    orderModel.aggregate([

        {
            $lookup: {
                "from": "users",
                "localField": "userId",
                "foreignField": "_id",
                "as": "user"
            }
        }
        , { $unwind: "$user" },
        {
            $group: {
                "_id": "$user._id",
                "noOfOrders": { $sum: 1 },
                "name": { "$first": "$user.name" }

            }
        },
        { $out: "users" }


    ]).then(result => {

        return res.status(200).send({ success: true, message: "Successfully updated" })
    }).catch(err => { throw err })
})



let port
if (process.env.PORT === undefined)
    port = 8081
else
    port = process.env.PORT
http.listen(port, () => {

    console.log(`🚀 app listening on port ${port}!`)

})
