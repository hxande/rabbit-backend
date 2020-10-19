const ProdutosModel = require("../model/ProdutosModel");
const fs = require('fs');


exports.selecionarTodosProdutos = function (callback, limite = false) {
  ProdutosModel.selecionarTodosProdutos(callback, limite);
};

exports.selectPesquisaProdutos = function (callback) {
  ProdutosModel.selectPesquisaProdutos(callback);
};

exports.selectIdProduto = function (callback, produtoId) {
  ProdutosModel.selectIdProduto(callback, produtoId);
};

exports.selectTextProdutos = function (callback, text) {
  ProdutosModel.selectTextProdutos(callback, text);
};

exports.selectRestautanteProduto = function (callback, restauranteID) {
  ProdutosModel.selectRestautanteProduto(callback, restauranteID);
};

exports.insertProdutos = function (nome_produto, categoria, desc_produto, urlImagem, valor, restauranteID) {
  ProdutosModel.insertProtdutos(nome_produto, categoria, desc_produto, urlImagem, valor, restauranteID)
}

exports.atualizarProduto = function (nome_produto, categoria, desc_produto, valor, produtoID) {
  ProdutosModel.atualizarProduto(nome_produto, categoria, desc_produto, valor, produtoID)
}

exports.salvarFotos = async function (fotoB64) {
  fotoB64.forEach(async element => {
    let base64String = element.b64.toString()
    let base64foto = base64String.split(',');

    fs.writeFile(`app/public/img/produtos/${element.name}`, base64foto[1], { encoding: 'base64' }, function (err) {
      console.log('File created');
    });
  });
}

exports.selectRestautanteProdutoEspecifico = async function (callback, params) {
  ProdutosModel.selectProdutoEspecificoRestautante(callback, params);
}

exports.deleteProduto = async function (idProduto) {
  ProdutosModel.deleteProdutos(idProduto);
}

exports.atualizarVinculo = async function (opcaoID) {
  ProdutosModel.atualizarVinculo(opcaoID);
}

exports.atualizarImagem = async function (produtoID, fotoB64, deletar) {

  if (deletar === false) {
    let base64String = fotoB64.b64.toString()
    let base64foto = base64String.split(',');
    var mime = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    let extension = mime[1].slice(6);

    fs.writeFile(`app/public/img/produtos/${produtoID}produto.${extension}`, base64foto[1], { encoding: 'base64' }, function (err) {
      if (err == null) {
        console.log('File created');
      }
    });

    ProdutosModel.atualizarImagem(produtoID, `produto.${extension}`);

  } else {

    fs.unlink(`app/public${fotoB64.name.toString()}`, function (err) {
      console.log('File deleted');
    });

    ProdutosModel.apagarImagemProduto(produtoID);
  }

}
