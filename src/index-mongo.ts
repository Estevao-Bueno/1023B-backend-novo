import express, { Request, Response } from 'express'
import mysql from 'mysql2/promise'
import 'dotenv/config'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URI!)
await client.connect()
const db = client.db(process.env.MONGO_DB!)


const app = express()
//Esse middlewe faz com que o express
app.use(express.json())
//Criando uma rota  para acesso pelo navegador
app.get('/produtos', async (req:Request, res:Response) => {
    const produtos = await db.collection('produtos').find().toArray()
    res.status(200).json(produtos)
})

app.post('/produtos', async (req:Request, res:Response) => {
    const {nome, preco, urlfoto, descricao} = req.body
    if(!nome || !preco || !urlfoto || !descricao)
        return res.status(400).json({error: 'Nome, preço, urlfoto e descrição são obrigatórios'})
        
    
    const produto = {nome, preco, urlfoto, descricao}
    const resultado = await db.collection('produtos').insertOne(produto)
    res.status(201).json({nome,preco,urlfoto,descricao, _id: resultado.insertedId})
})

//Criando o serviudor na porta 8000 com o express
app.listen(8000, () => {
    console.log('Server is running on port 8000')
})


// app.get('/produtos', async (req, res) => {
//     // Validação das variáveis de ambiente
//     if (process.env.DBHOST === undefined) {
//         res.status(500).send("DBHOST não está definido nas variáveis de ambiente");
//         return;
//     }
//     if (process.env.DBUSER === undefined) {
//         res.status(500).send("DBUSER não está definido nas variáveis de ambiente");
//         return;
//     }
//     if (process.env.DBPASSWORD === undefined) {
//         res.status(500).send("DBPASSWORD não está definido nas variáveis de ambiente");
//         return;
//     }
//     if (process.env.DBDATABASE === undefined) {
//         res.status(500).send("DBDATABASE não está definido nas variáveis de ambiente");
//         return;
//     }
//     if (process.env.DBPORT === undefined) {
//         res.status(500).send("DBPORT não está definido nas variáveis de ambiente");
//         return;
//     }
//     try { 
//         const conn = await mysql.createConnection({
//             host: process.env.DBHOST,
//             user: process.env.DBUSER,
//             password: process.env.DBPASSWORD,
//             database: process.env.DBDATABASE,
//             port: Number(process.env.DBPORT)
//         });
//         const [rows] = await conn.query('SELECT id, nome, preco, urlfoto, descricao FROM produtos');
//         res.json(rows);
//         await conn.end();
//     } catch (err) {
//         if (!(err instanceof Error)) {
//             res.status(500).send("Erro desconhecido ao consultar produtos");
//             return;
//         }
//         res.status(500).send("Erro ao consultar produtos: " + err.message);
//     }
// });

