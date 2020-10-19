const RestaurantesModel = require("../model/RestaurantesModel");
const fs = require('fs');

exports.selectAllRestaurante = function (callback) {
  RestaurantesModel.selectAllRestaurantes(callback);
};

exports.selectIdRestaurante = function (callback, restauranteID) {
  RestaurantesModel.selectIdRestaurantes(callback, restauranteID);
};

exports.atualizarRestaurante = function (daga) {
  RestaurantesModel.atualizarRestaurante(daga);
};

exports.insertRestaurante = function (data, enderecoID, callback) {
  RestaurantesModel.insertRestaurante(data, enderecoID, callback);
}

exports.deleteRestaurante = async function (idProduto) {
  RestaurantesModel.deleteRestaurantes(idProduto);
}

exports.salvarLogo = async function (fotoB64, restauranteID) {
  let base64String = fotoB64.toString()
  let base64foto = base64String.split(',');
  var mime = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  let extension = mime[1].slice(6);

  fs.unlink(`app/public/img/restaurantes/${restauranteID}${fotoB64.toString()}`, function (err) {
    console.log('File deleted for write');
  });

  fs.writeFile(`app/public/img/restaurantes/${restauranteID}restaurante.${extension}`, base64foto[1], { encoding: 'base64' }, function (err) {
    if (err == null) {
      console.log('File created');
    }
  });

  RestaurantesModel.mudarFotoRestaurante(restauranteID, `restaurante.${extension}`);
}

exports.atualizarLogo = async function (restauranteID, fotoB64, deletar) {

  if (deletar === false) {
    let base64String = fotoB64.b64.toString()
    let base64foto = base64String.split(',');
    var mime = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    let extension = mime[1].slice(6);

    fs.writeFile(`app/public/img/restaurantes/${restauranteID}restaurante.${extension}`, base64foto[1], { encoding: 'base64' }, function (err) {
      if (err == null) {
        console.log('File created');
      }
    });

    RestaurantesModel.mudarFotoRestaurante(restauranteID, `restaurante.${extension}`);

  } else {
    
    fs.unlink(`app/public${fotoB64.name.toString()}`, function (err) {
      console.log('File deleted');
    });

    RestaurantesModel.apagarFotoRestaurante(restauranteID);
  }

}
