const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");
let db = new sqlite3.Database(dbPath);

//  ID INTEGER PRIMARY KEY AUTOINCREMENT,
//  email varchar(255),
//  celular varchar(255),
//  senha varchar(255),
//  nome varchar(255),
//  sobrenome varchar(255),
//  cpf INT,
//  rg varchar(255),
//  orgao_emissor varchar(255),
//  tipo INT,
//  enderecoID INTEGER
//  imagem varchar(255)


// TODO: Implementar restauranteID no usuario dono do restaurantes e funcionarios do mesmo;
// Desmembrar usuario do painel do usuario do app;
exports.insertUsuarios = function (data, senha, tipo, enderecoID, restauranteID, imagem) {
  db.run(
    `INSERT INTO usuarios (email, celular, senha, nome, sobrenome, cpf, rg, orgao_emissor, tipo, enderecoID, imagem, restauranteID, tokenLogin) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [data.email, data.celular, senha, data.nome, data.sobrenome, data.cpf, data.rg, data.orgao_emissor, tipo, enderecoID, imagem, restauranteID, null],
    function (err) {
      if (err) {
        return console.log(err.message);
      } else {
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        // return this.lastID
      }
    }
  );
};

exports.selectAllUsuarios = function (callback) {
  db.serialize(function () {
    db.all("SELECT * FROM usuarios", function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.deleteUsuarios = function (idProduto) {
  db.run(`DELETE FROM usuarios WHERE ID == ${idProduto}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}

exports.logoffUsuario = function (usuario) {
  db.run(`UPDATE usuarios SET acesso = 0 WHERE ID == ${usuario.ID}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}

exports.loginUsuario = function (email, callback) {
  db.serialize(function () {
    db.all(`SELECT * FROM usuarios WHERE email == '${email}'`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows[0]);
    });
  });
}

exports.salvarTokenLogin = function (usuarioID, token) {
  db.run(`UPDATE usuarios SET tokenLogin = '${token}' WHERE ID == ${usuarioID}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}

exports.salvarSenha = function (senha, usuarioID) {
  db.run(`UPDATE usuarios SET senha = '${senha}' WHERE ID == ${usuarioID}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}

exports.verificarLogin = function (token, callback) {
  db.serialize(function () {
    db.all(`SELECT email, nome, sobrenome, enderecoID, imagem, restauranteID FROM usuarios WHERE tokenLogin == '${token}'`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows[0]);
    });
  });
}

exports.atualizarUsuario = function (data) {
  db.run(`UPDATE usuarios SET
    email = '${data.email}',
    celular = '${data.celular}',
    nome = '${data.nome}',
    sobrenome = '${data.sobrenome}',
    cpf = '${data.cpf}',
    rg = '${data.rg}',
    orgao_emissor = '${data.orgao_emissor}'
    WHERE ID == ${data.usuarioID}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}

