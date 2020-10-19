const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");
const util = require('util')
let db = new sqlite3.Database(dbPath);

// Table: restaurantes
// ID INTEGER PRIMARY KEY AUTOINCREMENT,
// cnpj varchar(255),
// razao_social varchar(255),
// nome_fantasia varchar(255),
// telefone varchar(255),
// servico_entrega BOOLEAN,
// especialidade NUMERIC,
// logo varchar(255),
// enderecoID INTEGER,


// TODO: implementar descrição do restaurante
exports.insertRestaurante = function (data, enderecoID, callback) {
  db.run(
    `INSERT INTO restaurantes (cnpj,razao_social, desc_restaurante, nome_fantasia, telefone, servico_entrega, especialidade, logo, enderecoID) VALUES(?,?,?,?,?,?,?,?,?,?)`,
    [data.cnpj, data.razao_social, null, data.nome_fantasia, data.telefone, data.servico_entrega, data.especialidade, null, enderecoID, 1],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      callback(this.lastID)
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
};

exports.selectAllRestaurantes = function (callback) {
  db.serialize(function () {
    db.all("SELECT * FROM restaurantes WHERE status == 1", function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.selectIdRestaurantes = function (callback, idRestaurante) {
  db.serialize(function () {
    db.all(`SELECT 
    usuarios.ID as usuarioID,
    enderecos.ID as enderecoID,
    restaurantes.ID as restaurantesID,
    *
    FROM restaurantes
    INNER JOIN enderecos ON enderecos.ID = restaurantes.enderecoID
    INNER JOIN usuarios ON usuarios.restauranteID = restaurantes.ID WHERE restaurantes.ID == ${idRestaurante} ;`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.deleteRestaurantes = function (idRestaurante) {
  db.run(`UPDATE restaurantes SET status = 0 WHERE ID == ${idRestaurante}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}

exports.mudarFotoRestaurante = function (idRestaurante, nomeDaFoto) {
  db.run(`UPDATE restaurantes SET  logo = '/img/restaurantes/${idRestaurante}${nomeDaFoto}'  WHERE ID == ${idRestaurante}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}

exports.apagarFotoRestaurante = function (idRestaurante) {
  db.run(`UPDATE restaurantes SET logo = null WHERE ID == ${idRestaurante}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}

exports.atualizarRestaurante = function (data) {
  db.run(`UPDATE restaurantes SET
  cnpj = '${data.cnpj}',
  razao_social = '${data.razao_social}',
  nome_fantasia = '${data.nome_fantasia}',
  telefone = '${data.telefone}',
  servico_entrega = ${data.servico_entrega},
  especialidade = ${data.especialidade}
  WHERE ID == ${data.restaurateID}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}


