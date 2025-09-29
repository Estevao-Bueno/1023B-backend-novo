import { Request, Response } from "express";
//import aqui as dependências necessárias
import { ObjectId } from "bson";
import { db } from "../database/banco-mongo.js";

interface ItemCarrinho {
    produtoId: string;
    quantidade: number;
    precoUnitario: number;
    nome: string;
}

interface Carrinho {
    usuarioId: string;
    itens: ItemCarrinho[];
    dataAtualizacao: Date;
    total: number;
}
class CarrinhoController {
    //adicionarItem
    async adicionarItem(req:Request, res:Response) {
        console.log("Chegou na rota de adicionar item ao carrinho");
        const { usuarioId, produtoId, quantidade } = req.body;
         //Buscar o produto no banco de dados
        const produto = await db.collection("produtos").findOne({ _id: ObjectId.createFromHexString(produtoId)});
        if (!produto) {
            return res.status(400).json({ message: "Produto não encontrado" });
        }
        //Pegar o preço do produto
        //Pegar o nome do produto
        const precoUnitario = produto.preco; // Supondo que o produto tenha um campo 'preco'
        const nome = produto.nome; // Supondo que o produto tenha um campo 'nome'


    // async adicionarItem(req:Request, res:Response) {
    //     const { usuarioId, produtoId, quantidade } = req.body;
    //     if (!usuarioId || !produtoId || !quantidade) {
    //         return res.status(400).json({ error: 'usuarioId, produtoId e quantidade são obrigatórios' });
    //     }
    //     // Validação do ObjectId do produto
    //     let ObjectId;
    //     try {
    //         ObjectId = (await import('bson')).ObjectId;
    //     } catch {
    //         return res.status(500).json({ error: 'Dependência bson não encontrada' });
    //     }
    //     if (!ObjectId.isValid(produtoId)) {
    //         return res.status(400).json({ error: 'produtoId inválido' });
    //     }
    //     // Buscar produto
    //     const { db } = await import('../database/banco-mongo.js');
    //     const produto = await db.collection('produtos').findOne({ _id: new ObjectId(produtoId) });
    //     if (!produto) {
    //         return res.status(404).json({ error: 'Produto não encontrado' });
    //     }
    //     // Buscar carrinho existente
    //     const carrinho = await db.collection('carrinhos').findOne({ usuarioId });
    //     const itemNovo: ItemCarrinho = {
    //         produtoId,
    //         quantidade,
    //         precoUnitario: produto.preco,
    //         nome: produto.nome
    //     };
    //     let itens: ItemCarrinho[];
    //     let total: number;
    //     let dataAtualizacao = new Date();
    //     if (!carrinho) {
    //         // Criar novo carrinho
    //         itens = [itemNovo];
    //         total = itemNovo.precoUnitario * itemNovo.quantidade;
    //         const novoCarrinho: Carrinho = {
    //             usuarioId,
    //             itens,
    //             dataAtualizacao,
    //             total
    //         };
    //         await db.collection('carrinhos').insertOne(novoCarrinho);
    //         return res.status(201).json(novoCarrinho);
    //     } else {
    //         // Atualizar carrinho existente
    //         itens = [...carrinho.itens];
    //         const idx = itens.findIndex(i => i.produtoId === produtoId);
    //         if (idx >= 0) {
    //             itens[idx].quantidade += quantidade;
    //         } else {
    //             itens.push(itemNovo);
    //         }
    //         total = itens.reduce((acc, item) => acc + item.precoUnitario * item.quantidade, 0);
    //         await db.collection('carrinhos').updateOne(
    //             { usuarioId },
    //             { $set: { itens, total, dataAtualizacao } }
    //         );
    //         return res.status(200).json({ usuarioId, itens, total, dataAtualizacao });
    //     }
    // }
        //Buscar o produto no banco de dados
        //Pegar o preço do produto
        //Pegar o nome do produto


        // Verificar se um carrinho com o usuário já existe

        // Se não existir deve criar um novo carrinho

        // Se existir, deve adicionar o item ao carrinho existente

        // Calcular o total do carrinho

        // Atualizar a data de atualização do carrinho

        res.status(200).json({ message: "Item adicionado ao carrinho com sucesso" });




    //removerItem
    //atualizarQuantidade
    //listar
    //remover                -> Remover o carrinho todo

   }
}
export default new CarrinhoController();