const PedidosModel = require("../model/PedidosModel");

exports.selectAllPedidos = function (callback) {
  PedidosModel.selectAllPedidos(callback);
};

exports.selectIdUsuario = function (callback, usuarioID) {
  PedidosModel.selectIdUsuario(callback, usuarioID);
};

exports.insertPedidos = function (usuarioID, restauranteID, status, valorTotal, dataPedido, callback) {
  PedidosModel.insertPedidos(usuarioID, restauranteID, status, valorTotal, dataPedido, callback);
};

exports.insertProdutosPedidos = function (pedidoID, produtoID, callback) {
  PedidosModel.insertProdutosPedidos(pedidoID, produtoID, callback);
};

exports.selectPedidosDesc = function (callback, usuarioID) {
  PedidosModel.selectPedidosDesc(callback, usuarioID);
};

exports.updateStatusPedidos = function (status, pedidoID, callback) {
  PedidosModel.updateStatusPedidos(status, pedidoID, callback);
};