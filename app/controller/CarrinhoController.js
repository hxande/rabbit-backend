const CarrinhosModel = require("../model/CarrinhosModel");

exports.selectAllCarrinhos = function (callback) {
  CarrinhosModel.selectAllCarrinhos(callback);
};

exports.selectIdUsuario = function (callback, usuarioID) {
  CarrinhosModel.selectIdUsuario(callback, usuarioID);
};

exports.insertCarrinhos = function (usuarioID, restauranteID, produtoID, nomeProduto, description, quantidadeProduto, valorProduto, valorTotalProduto, valorTotalOpcoes, opcoesEscolhidas) {
  CarrinhosModel.insertCarrinhos(usuarioID, restauranteID, produtoID, nomeProduto, description, quantidadeProduto, valorProduto, valorTotalProduto, valorTotalOpcoes, opcoesEscolhidas);
};

exports.deleteCarrinhos = async function (usuarioID) {
  CarrinhosModel.deleteCarrinhos(usuarioID);
};