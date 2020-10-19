const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");

// Table carrinhos
// ID INTEGER PRIMARY KEY AUTOINCREMENT
// usuarioID INTEGER
// produtoID INTEGER
// nomeProduto varchar(255)
// description varchar(255)
// quantidadeProduto INTEGER
// valorProduto REAL
// valorTotalProduto REAL
// valorTotalOpcoes REAL
// opcoesEscolhidas varchar(255)

let db = new sqlite3.Database(dbPath);

exports.insertCarrinhos = function (
  usuarioID,
  restauranteID,
  produtoID,
  nomeProduto,
  description,
  quantidadeProduto,
  valorProduto,
  valorTotalProduto,
  valorTotalOpcoes,
  opcoesEscolhidas
) {
  db.run(
    `INSERT INTO carrinhos (usuarioID, restauranteID, produtoID, nomeProduto, description, quantidadeProduto, valorProduto, valorTotalProduto, valorTotalOpcoes, opcoesEscolhidas) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [usuarioID, restauranteID, produtoID, nomeProduto, description, quantidadeProduto, valorProduto, valorTotalProduto, valorTotalOpcoes, opcoesEscolhidas],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
};

exports.selectAllCarrinhos = function (callback) {
  db.serialize(function () {
    db.all("SELECT * FROM carrinhos", function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
};

exports.selectIdUsuario = function (callback, idUsuario) {
  db.serialize(function () {
    db.all(`SELECT * FROM carrinhos WHERE USUARIOID == ${idUsuario}`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
};

exports.deleteCarrinhos = function (usuarioID) {
  db.run(`DELETE FROM carrinhos WHERE USUARIOID == ${usuarioID}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
};