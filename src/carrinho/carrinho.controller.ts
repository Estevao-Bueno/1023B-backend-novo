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
        if (!usuarioId || !produtoId || !quantidade) {
            return res.status(400).json({ message: "usuarioId, produtoId e quantidade são obrigatórios" });
        }
        //Buscar o produto no banco de dados
        const produto = await db.collection("produtos").findOne({ _id: ObjectId.createFromHexString(produtoId)});
        if (!produto) {
            return res.status(400).json({ message: "Produto não encontrado" });
        }
        const precoUnitario = produto.preco;
        const nome = produto.nome;
        // Buscar carrinho existente
        let carrinho = await db.collection("carrinhos").findOne({ usuarioId });
        const novoItem: ItemCarrinho = {
            produtoId,
            quantidade,
            precoUnitario,
            nome
        };
        let itens: ItemCarrinho[];
        let total: number;
        let dataAtualizacao = new Date();
        if (!carrinho) {
            // Criar novo carrinho
            itens = [novoItem];
            total = precoUnitario * quantidade;
            const novoCarrinho: Carrinho = {
                usuarioId,
                itens,
                dataAtualizacao,
                total
            };
            await db.collection("carrinhos").insertOne(novoCarrinho);
            return res.status(201).json(novoCarrinho);
        } else {
            // Atualizar carrinho existente
            itens = [...carrinho.itens];
            const idx = itens.findIndex(i => i.produtoId === produtoId);
            if (idx >= 0 && itens[idx]) {
                itens[idx].quantidade += quantidade;
            } else {
                itens.push(novoItem);
            }
            total = itens.reduce((acc, item) => acc + item.precoUnitario * item.quantidade, 0);
            await db.collection("carrinhos").updateOne(
                { usuarioId },
                { $set: { itens, total, dataAtualizacao } }
            );
            return res.status(200).json({ usuarioId, itens, total, dataAtualizacao });
        }




    //removerItem
    //atualizarQuantidade
    //listar
    //remover                -> Remover o carrinho todo

   }
}
export default new CarrinhoController();