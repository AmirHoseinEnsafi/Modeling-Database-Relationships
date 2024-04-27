const express = require('express')

const app = express()

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log(`connected to the data base`))
    .catch((err) => console.error(err))

const Author = mongoose.model('author' , mongoose.Schema({
    name : String,
    bio : String,
    web : String
}))

const Book = mongoose.model('book' , mongoose.Schema({
    name : String,
    authorRef : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'author'
    }
}))

async function creatAuthor(name , bio , web){
    const a = new Author({
        name,
        bio,
        web
    })
    const result = await a.save()
    console.log(result)
}

async function creatBook(name , authorRef){
    const a = new Book({
        name,
        authorRef
    })
    const result = await a.save()
    console.log(result)
}

async function findbook(){
    const a = await Book.find().populate('authorRef')
    console.log(a)
}
