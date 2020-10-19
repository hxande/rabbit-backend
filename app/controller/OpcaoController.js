const OpcaoModel = require("../model/OpcaoModel");
const fs = require('fs');

exports.selectAllOpcoes = function (callback) {
  OpcaoModel.selectAllOpcoes(callback);
};

exports.selectIdOpcao = function (callback, opcaoId) {
  OpcaoModel.selectIdOpcao(callback, opcaoId);
};

exports.selecionarOpcoesProduto = function (callback, produtoID) {
  OpcaoModel.selecionarOpcoesProduto(callback, produtoID);
};

exports.selecionarAdicionalOpcao = function (callback, opcaoID, opcaoProduto = []) {
  OpcaoModel.selecionarAdicionalOpcao(callback, opcaoID, opcaoProduto);
};

exports.selecionarAdicionalOpcaoVinculada = function (callback, opcaoID, opcaoProduto = []) {
  OpcaoModel.selecionarAdicionalOpcaoVinculada(callback, opcaoID, opcaoProduto);
};

exports.selecionarAdicionais = function (callback, adicionalID, opcao = []) {
  OpcaoModel.selecionarAdicionais(callback, adicionalID, opcao);
};

exports.selecionarOpcoesVinculada = function (callback, adicionalID) {
  OpcaoModel.selecionarOpcoesVinculada(callback, adicionalID);
};

exports.insertOpcao = function (nome_opcao, obrigatorio, qtd_obrigatorio, selecao, produtoID, callbackOpcoes) {
  OpcaoModel.insertOpcoes(nome_opcao, obrigatorio, qtd_obrigatorio, selecao, produtoID, callbackOpcoes)
}

//  0 false : 1 true
exports.atualizarVinculo = function (callback, statusVinculo, produtoID, adicionalID) {
  OpcaoModel.atualizarVinculo(callback, statusVinculo, produtoID, adicionalID)
}

//  0 false : 1 true
exports.atualizarVinculoAdicional = function (callback, statusVinculo, adicionalID) {
  OpcaoModel.atualizarVinculoAdicional(callback, statusVinculo, adicionalID)
}

exports.insertAdicionais = function (adicionais, produtoID, opcaoID) {
  for (let index = 0; index < adicionais.length; index++) {
    const adicional = adicionais[index];

    if (adicional.foto !== '') {
      let base64String = adicional.foto.toString()
      let base64foto = base64String.split(',');
      var mime = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
      let extension = mime[1].slice(6);

      var nome_foto = adicional.nome_item.replace(/[^A-Z0-9]+/ig, "_") + '_' + 'ProdutoID' + produtoID;

      fs.writeFile(`app/public/img/adicionais/${nome_foto.toLowerCase()}.${extension}`, base64foto[1], { encoding: 'base64' }, function (err) {
        console.log('File created');
      });

      adicional.foto = `/img/adicionais/${nome_foto.toLowerCase()}.${extension}`;
    }

    OpcaoModel.insertAdicionais(adicional, opcaoID);
  }
}

exports.vincularOpcaoAdicional = function (callback, opcaoID, adicionalID) {
  OpcaoModel.vincularOpcaoAdicional(callback, opcaoID, adicionalID);
}

exports.buscarOpcoesVinculadas = function (callback, adicionalID) {
  OpcaoModel.buscarOpcoesVinculadas(callback, adicionalID);
}

exports.deletarOpcaoVinculada = function (opcaoID, adicionalID) {
  OpcaoModel.deletarOpcaoVinculada(opcaoID, adicionalID);
}

exports.deletarOpcao = function (opcaoID, adicionais, opcoesVinculadas) {
  function callback() { };

  console.warn(opcoesVinculadas);

  for (let index = 0; index < adicionais.length; index++) {
    const adicional = adicionais[index];
    OpcaoModel.deletarAdicionais(adicional.ID);
  }

  OpcaoModel.deleteOpcoesAdicionais(opcaoID);

  if (opcoesVinculadas.length !== 0) {
    for (let index = 0; index < opcoesVinculadas.length; index++) {
      const opcoesVinculadasElemento = opcoesVinculadas[index];

      for (let index = 0; index < opcoesVinculadasElemento.opcoesVinculadas.length; index++) {
        const element = opcoesVinculadasElemento.opcoesVinculadas[index];
        OpcaoModel.atualizarVinculo(callback, 0, element.ID)
        OpcaoModel.deletarOpcaoVinculada(element.ID, opcoesVinculadasElemento.adiconalItem)
      }

    }
  }

  OpcaoModel.deletarOpcao(opcaoID);

}

exports.selectAllAdicionaisOpcao = function (callback, opcaoID) {
  OpcaoModel.selectAllAdicionaisOpcao(callback, opcaoID);
};

exports.selectAllAdicionais = function (callback, opcao_adicionais) {
  OpcaoModel.selectAllAdicionais(callback, opcao_adicionais);
};

exports.deleteOpcao = async function (opcaoId) {
  OpcaoModel.deleteOpcao(opcaoId)
}