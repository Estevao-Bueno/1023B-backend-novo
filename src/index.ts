import express from 'express'
import mysql from 'mysql2/promise'
import 'dotenv/config'

const app = express()
app.get('/', (req, res) =>{
    res.send(process.env.DBHOST)
})
console.log(process.env.DBHOST);