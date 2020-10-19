const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");

// Table pedidos
// ID INTEGER PRIMARY KEY AUTOINCREMENT
// usuarioID INTEGER
// restauranteID INTEGER
// status NUMBER
// valorTotal REAL
// dataPedido TEXT

let db = new sqlite3.Database(dbPath);

exports.insertPedidos = function (
  usuarioID,
  restauranteID,
  status,
  valorTotal,
  dataPedido,
  callback
) {
  db.run(
    `INSERT INTO pedidos (usuarioID, restauranteID, status, valorTotal, dataPedido) VALUES (?, ?, ?, ?, ?)`,
    [usuarioID, restauranteID, status, valorTotal, dataPedido],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
      callback(this.lastID);
    }
  );
};

exports.selectAllPedidos = function (callback) {
  db.serialize(function () {
    db.all("SELECT * FROM pedidos", function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
};

exports.selectIdUsuario = function (callback, usuarioID) {
  db.serialize(function () {
    db.all(`SELECT * FROM pedidos WHERE USUARIOID == ${usuarioID}`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
};

exports.insertProdutosPedidos = function (
  pedidoID,
  produtoID,
  callback
) {
  db.run(
    `INSERT INTO pedidos_produtos (pedidoID, produtoID) VALUES (?, ?)`,
    [pedidoID, produtoID],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
      callback(this.lastID);
    }
  );
};

exports.selectPedidosDesc = function (callback, usuarioID) {
  db.serialize(function () {
    db.all(`SELECT b.ID, a.nome_fantasia, b.status, b.valorTotal 
      FROM restaurantes as a
      INNER JOIN pedidos as b ON a.ID = b.restauranteID
      INNER JOIN usuarios as c ON b.usuarioID = c.ID
      WHERE a.ID = b.restauranteID AND c.ID = ${usuarioID}`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
};

exports.updateStatusPedidos = function (
  status,
  pedidoID,
  callback
) {
  db.run(
    `UPDATE pedidos SET status = ? WHERE ID = ?`,
    [status, pedidoID],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`Row(s) updated: ${this.changes}`);
      callback(status);
    }
  );
};