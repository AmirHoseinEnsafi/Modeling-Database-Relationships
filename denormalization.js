const express = require('express')

const app = express()

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/denormalization')
    .then(() => console.log(`connected to the data base`))
    .catch((err) => console.error(err))

const SchemaAuthor = new mongoose.Schema({
    name : String,
    bio : String,
    web : String
})

const Author = mongoose.model('author' , SchemaAuthor)

const Book = mongoose.model('book' , mongoose.Schema({
    name : String,
    author : [SchemaAuthor]
}))

async function creatAuthor(name, bio , web){
    const a = new Author({
        name,
        bio,
        web
    })
    const result = await a.save()
    console.log(result)
}

async function creatBook(name , author){
    const b = new Book({
        name,
        author
    })
    const result = await b.save()
    console.log(result)
}

async function findbook(){
    const c = await Book.find()
    console.log(c)
}

async function updateBook(bookId , name){
    const book = await Book.findById(bookId)
    book.author.name = name
    await book.save()
    console.log(book)
}

// creatBook('my book' , new Author({name : 'my name' , bio : 'my bio' , web : 'my web'}))

// updateBook('662cc7963f99ce2b8318356a' , 'shahrokh')

