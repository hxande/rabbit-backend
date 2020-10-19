const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");

// Table item
// ID INTEGER PRIMARY KEY AUTOINCREMENT
// pedidoID INTEGER
// produtoID INTEGER
// nomeProduto varchar(255)
// opcoesEscolhidas varchar(255)
// qtd NUMBER
// valorProduto REAL
// valorTotal REAL

let db = new sqlite3.Database(dbPath);

exports.insertItem = function (
  pedidoID,
  produtoID,
  nomeProduto,
  opcoesEscolhidas,
  qtd,
  valorProduto,
  valorTotal
) {
  db.run(
    `INSERT INTO item (pedidoID, produtoID, nomeProduto, opcoesEscolhidas, qtd, valorProduto, valorTotal) VALUES(?, ?, ?, ?, ?, ?, ?)`,
    [pedidoID, produtoID, nomeProduto, opcoesEscolhidas, qtd, valorProduto, valorTotal],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
};

exports.selectAllItem = function (callback) {
  db.serialize(function () {
    db.all("SELECT * FROM item", function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
};

exports.selectIdPedido = function (callback, pedidoID) {
  db.serialize(function () {
    db.all(`SELECT * FROM item WHERE PEDIDOID == ${pedidoID}`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
};