const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");
const util = require('util')

// Table opcoes
// ID INTEGER PRIMARY KEY AUTOINCREMENT,
// nome_opcao varchar(255),
// obrigatorio BOOLEAN,
// selecao NUMBER,
// itens varchar(255),

let db = new sqlite3.Database(dbPath);

exports.insertOpcoes = function (
  nome_opcao,
  obrigatorio,
  qtd_obrigatorio,
  selecao,
  produtoID,
  callbackOpcoes
) {
  db.run(
    `INSERT INTO opcoes (nome_opcao, obrigatorio, qtd_obrigatorio, selecao, produtoID, vinculo) VALUES(?,?,?,?,?,?)`,
    [nome_opcao, obrigatorio, qtd_obrigatorio, selecao, produtoID, 0],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      callbackOpcoes(this.lastID)
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
};

exports.atualizarVinculo = async function (callback, statusVinculo, opcaoID) {
  await db.run(`UPDATE opcoes SET  vinculo = '${statusVinculo}'  WHERE ID == ${opcaoID}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
};

exports.atualizarVinculoAdicional = async function (callback, statusVinculo, adicionalID) {
  db.run(`UPDATE adicionais SET  vinculo = '${statusVinculo}'  WHERE ID == ${adicionalID}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
};

exports.insertAdicionais = function (adicional, opcaoID) {

  function callbackLastIDAdicionais(lastID) {
    db.run(`INSERT INTO opcoes_adicionais (opcaoID, adicionalID) VALUES(?,?)`, [opcaoID, lastID],
      function (err) {
        if (err) {
          return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      }
    );
  }

  db.run(
    `INSERT INTO adicionais (nome_adicional, desc_adicional, valor_adicional, qtd_limite, vinculo, foto) VALUES(?,?,?,?,?,?)`,
    [adicional.nome_item, adicional.desc_item, adicional.valor_item, adicional.qtd_limite_adicional, 0, adicional.foto],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      callbackLastIDAdicionais(this.lastID);
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );

};

exports.selectAllOpcoes = function (callback) {
  db.serialize(function () {
    db.all("SELECT * FROM opcoes", function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.selectIdOpcao = function (callback, idOpcao) {
  db.serialize(function () {
    db.all(`SELECT * FROM opcoes WHERE ID == ${idOpcao}`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.selecionarOpcoesProduto = function (callback, idProduto) {
  db.serialize(function () {
    db.all(`SELECT * FROM opcoes WHERE produtoID == ${idProduto}`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.selecionarAdicionalOpcao = function (callback, opcaoID) {
  db.serialize(function () {
    db.all(`SELECT DISTINCT opcoes.ID as opcaoID, adicionais.ID as adicionalID, opcoes.nome_opcao,
    opcoes.obrigatorio, opcoes.qtd_obrigatorio, opcoes.selecao, opcoes.vinculo as vinculoOpcao,
    adicionais.vinculo as adicionalVinculo,  adicionais.nome_adicional, adicionais.desc_adicional, adicionais.valor_adicional, adicionais.qtd_limite, adicionais.foto
      FROM opcoes_adicionais
    INNER JOIN opcoes ON opcoes.ID = opcoes_adicionais.opcaoID
    INNER JOIN adicionais ON adicionais.ID = opcoes_adicionais.adicionalID WHERE opcoes.ID == ${opcaoID} AND opcoes.vinculo == 0;`,
      function (err, allRows) {
        if (err) {
          return console.log(err.message);
        }
        callback(allRows);
      }
    );
  });
}

exports.selecionarAdicionalOpcaoVinculada = function (callback, opcaoID) {
  db.serialize(function () {
    db.all(`SELECT DISTINCT opcoes.ID as opcaoID, adicionais.ID as adicionalID, opcoes.nome_opcao,
    opcoes.obrigatorio, opcoes.qtd_obrigatorio, opcoes.selecao, opcoes.vinculo as vinculoOpcao,
    adicionais.vinculo as adicionalVinculo,  adicionais.nome_adicional, adicionais.desc_adicional, adicionais.valor_adicional, adicionais.qtd_limite
      FROM opcoes_adicionais
    INNER JOIN opcoes ON opcoes.ID = opcoes_adicionais.opcaoID
    INNER JOIN adicionais ON adicionais.ID = opcoes_adicionais.adicionalID WHERE opcoes.ID == ${opcaoID}`,
      function (err, allRows) {
        if (err) {
          return console.log(err.message);
        }
        callback(allRows);
      }
    );
  });
}


exports.selecionarOpcoesVinculada = function (callback, adicionalID) {
  db.serialize(function () {
    db.all(`SELECT DISTINCT *  FROM adicionais_opcoes
    LEFT JOIN opcoes ON opcoes.ID = adicionais_opcoes.opcaoID
    WHERE adicionais_opcoes.adicionalID == ${adicionalID}`,
      function (err, allRows) {
        if (err) {
          return console.log(err.message);
        }
        callback(allRows);
      }
    );
  });
}

exports.selecionarAdicionais = function (callback, adicionalID, opcao) {
  db.serialize(function () {
    db.all(`SELECT * FROM adicionais WHERE ID == ${adicionalID}`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows, opcao);
    });
  });
}

exports.deleteOpcao = function (idProduto) {
  db.run(`DELETE FROM opcoes WHERE ID == ${idProduto}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}

exports.selectAllAdicionaisOpcao = function (callback, opcaoID) {
  db.serialize(function () {
    db.all(`SELECT * FROM opcoes_adicionais WHERE opcaoID == ${opcaoID}`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}


exports.deleteOpcoesAdicionais = function (opcaoID) {
  db.run(`DELETE FROM opcoes_adicionais WHERE opcaoID == ${opcaoID}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}

exports.selectAllAdicionais = function (callback, opcao_adicionais) {
  db.serialize(function () {
    let adicionais = []
    for (let index = 0; index < opcao_adicionais.length; index++) {
      const row = opcao_adicionais[index];

      db.all(`SELECT * FROM adicionais WHERE ID == ${row.adicionalID}`, function (err, allRows) {
        if (err != null) {
          console.log(err);
        }

        adicionais.push(allRows[0]);

        if ((index + 1) == opcao_adicionais.length) {
          callback(adicionais);
        }

      });
    }

  });
}

exports.deletarAdicionais = function (adicionalID) {
  db.serialize(function () {
    db.all(`DELETE FROM adicionais WHERE ID == ${adicionalID}`, function (err) {
      if (err != null) {
        console.log(err);
      }
    });
  });
}

exports.vincularOpcaoAdicional = function (callback, opcaoID, adicionalID) {
  db.run(
    `INSERT INTO adicionais_opcoes (opcaoID, adicionalID) VALUES(?,?)`, [opcaoID, adicionalID],
    function (err) {
      if (err) {
        callback(err)
        return console.log(err.message);
      }
      callback(this.lastID);
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
}

exports.buscarOpcoesVinculadas = function (callback, adicionalID) {
  db.serialize(function () {
    db.all(`SELECT * FROM adicionais_opcoes WHERE adicionalID == ${adicionalID}`, function (err, allRows) {
      if (err != null) {
        callback(err);
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.deletarOpcaoVinculada = function (opcaoID, adicionalID) {
  db.serialize(function () {
    db.all(`DELETE FROM adicionais_opcoes WHERE opcaoID == ${opcaoID} AND adicionalID == ${adicionalID}`, function (err) {
      if (err != null) {
        console.log(err);
      }
    });
  });
}

exports.deletarOpcao = function (opcaoID) {
  db.serialize(function () {
    db.all(`DELETE FROM opcoes WHERE ID == ${opcaoID}`, function (err) {
      if (err != null) {
        console.log(err);
      }
    });
  });
}
