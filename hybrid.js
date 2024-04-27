const express = require('express')

const app = express()

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/hybrid')
    .then(() => console.log('connected to the data base'))
    .catch((err) => console.log(err))

const carSchema = mongoose.Schema({
    carName : String,
    companyName : String ,
    horsepower : String
})

const Car = mongoose.model('car' , carSchema)

const Buyer = mongoose.model('buyer' , mongoose.Schema({
    name : String,
    lastName : String,
    email : String,
    car : {
        _id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'car'
        },
        carName : String
    }
}))

async function createCar(carName , companyName , horsepower){
    let a = new Car({
        carName,
        companyName,
        horsepower
    })
        const result = await a.save()
        console.log(result)  
}

async function createBuyer(name , lastName , email){
    const a = new Buyer({
        name,
        lastName,
        email
    })

    const result = await a.save()
    console.log(result)
}

async function addCar(buyerId , carId){
    const b = await Buyer.findById(buyerId)
    const c = await Car.findById(carId)

    b.car._id = c._id;
    b.car.carName = c.carName;

    const result = await b.save()
    console.log(result)
}

async function findBuyer(buyerId){
    const a = await Buyer.findById(buyerId)
                         .populate('car._id')
    console.log(a)
}

// createCar('f90' , 'bmw' , '670')
// createBuyer('sh' , "en" , 'amirmahdion1@gmail.com')
// addCar('662cedf55d0729313dcda32f' , '662cedceeea34ecaf9ffbdf7')
findBuyer('662cedf55d0729313dcda32f')