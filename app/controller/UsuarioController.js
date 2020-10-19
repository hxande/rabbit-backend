const UsuariosModel = require("../model/UsuariosModel");
const fs = require('fs');
const bcrypt = require('bcryptjs');

exports.selectAllUsuarios = function (callback) {
  UsuariosModel.selectAllUsuarios(callback);
};

exports.selectIdUsuario = function (callback, produtoId) {
  UsuariosModel.selectIdUsuario(callback, produtoId);
};

exports.insertUsuarios = async function (data, senha, tipo, enderecoID, restauranteID, nomeFotoUsuario) {
  return await UsuariosModel.insertUsuarios(data, senha, tipo, enderecoID, restauranteID, nomeFotoUsuario);
}

exports.salvarFotos = async function (fotos) {
  fs.writeFile(`app/public/img/usuarios/${fotos[0].name}`, fotos[0].b64, { encoding: 'base64' }, function (err) {
    console.log(err);
    console.log('File created');
  });
}

exports.deleteUsuarios = async function (idProduto) {
  UsuariosModel.deleteUsuarios(idProduto);
}

exports.atualizarUsuario = function (data) {
  UsuariosModel.atualizarUsuario(data);
};

exports.loginUsuario = async function (email, senha, callback) {

  function usuarioCallback(row) {
    if (row !== undefined) {

      if (row.senha === '') {
        callback(3);
      } else {
        bcrypt.compare(senha, row.senha, function (err, result) {
          callback(1, row.ID);
        });
      }
    } else {
      callback(2);
    }
  }

  UsuariosModel.loginUsuario(email, usuarioCallback);

}


exports.verificarLogin = async function (token, callback) {

  function callbackVerificarLogin(row) {
    if (row === undefined) {
      callback({ "status": false })
    } else {
      callback({ "status": true, "usuario": row })
    }
  }

  UsuariosModel.verificarLogin(token, callbackVerificarLogin)
}

exports.gerarsenha = async function (email, senha, callback) {

  function callbackLogin(row) {
    if (row !== undefined) {
      const saltRounds = 12;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(String(senha), salt, function (err, hash) {
          UsuariosModel.salvarSenha(hash, row.ID);
          callback(1)
        });
      });
    }
  }

  UsuariosModel.loginUsuario(email, callbackLogin);
}

exports.gerarTokenLogin = async function (usuarioID, callback) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 50; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  let tokenFinal = '$%ˆ##rabbit' + result + '&ˆ&##F3r7rs';
  UsuariosModel.salvarTokenLogin(usuarioID, tokenFinal);
  callback(tokenFinal, usuarioID);
}