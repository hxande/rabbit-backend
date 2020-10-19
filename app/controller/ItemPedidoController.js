const ItemPedidoModel = require("../model/ItemPedidoModel");

exports.selectAllItem = function (callback) {
    ItemPedidoModel.selectAllItem(callback);
};

exports.selectIdPedido = function (callback, pedidoID) {
    ItemPedidoModel.selectIdPedido(callback, pedidoID);
};

exports.insertItem = function (pedidoID, produtoID, nomeProduto, opcoesEscolhidas, qtd, valorProduto, valorTotal) {
    ItemPedidoModel.insertItem(pedidoID, produtoID, nomeProduto, opcoesEscolhidas, qtd, valorProduto, valorTotal);
};