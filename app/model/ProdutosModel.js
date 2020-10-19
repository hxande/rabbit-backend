const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");
const util = require('util')

// Table produtos
// ID INTEGER PRIMARY KEY AUTOINCREMENT,
// nome_produto varchar(255),
// categoria varchar(255),
// desc_produto varchar(255),
// imagem varchar(255),
// valor REAL,
// restauranteID INTEGER

let db = new sqlite3.Database(dbPath);

exports.insertProtdutos = function (
  nome_produto,
  categoria,
  desc_produto,
  imagem,
  valor,
  restauranteID
) {
  db.run(
    `INSERT INTO produtos (nome_produto, categoria, desc_produto, imagem, valor, restauranteID, status) VALUES(?,?,?,?,?,?,?)`,
    [nome_produto, categoria, desc_produto, imagem, valor, restauranteID, 1],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
};

exports.selectAllProdutos = function (callback, limite) {
  db.serialize(function () {
    if (limite) {
      db.all("SELECT * FROM produtos LIMIT 10", function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows);
      });
    } else {
      db.all("SELECT * FROM produtos", function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows);
      });
    }
  });
}

exports.selecionarTodosProdutos = function (callback, limite) {
  db.serialize(function () {
    if (limite) {
      db.all("SELECT * FROM produtos where status == 1", function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows);
      });
    } else {
      db.all("SELECT * FROM produtos", function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows);
      });
    }
  });
}

exports.selectIdProduto = function (callback, idProduto) {
  db.serialize(function () {
    db.all(`SELECT * FROM produtos WHERE ID == ${idProduto}`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.selectTextProdutos = function (callback, text) {
  db.serialize(function () {
    db.all(`SELECT * FROM produtos WHERE nome_produto LIKE '%${text}%'`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.selectPesquisaProdutos = function (callback, nome) {
  db.serialize(function () {
    db.all(`SELECT * FROM produtos WHERE nome_produto LIKE '%${nome}%'`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.selectRestautanteProduto = function (callback, restauranteID) {
  db.serialize(function () {
    db.all(`SELECT * FROM produtos WHERE restauranteID == ${restauranteID} AND status == 1`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.selectProdutoEspecificoRestautante = function (callback, params) {
  db.serialize(function () {
    db.all(`SELECT * FROM produtos WHERE restauranteID == ${params.restauranteid} AND ID == ${params.produtoid} `, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.deleteProdutos = function (idProduto) {
  db.run(`UPDATE produtos SET status = 0 WHERE ID == ${idProduto}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}

exports.atualizarVinculo = function (opcaoID) {
  db.run(`UPDATE opcoes SET vinculo = 0 WHERE ID == ${opcaoID}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}

exports.atualizarImagem = function (produtoID, nomeDaImagem) {
  db.run(`UPDATE produtos SET imagem = '/img/produtos/${produtoID}${nomeDaImagem}' WHERE ID == ${produtoID}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}

exports.apagarImagemProduto = function (produtoID) {
  db.run(`UPDATE produtos SET imagem = null WHERE ID == ${produtoID}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}

exports.atualizarProduto = function (nome_produto, categoria, desc_produto, valor, produtoID) {
  db.run(`UPDATE produtos SET nome_produto = "${nome_produto}", categoria = ${categoria}, desc_produto = "${desc_produto}", valor = ${valor} WHERE ID == ${produtoID}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}


