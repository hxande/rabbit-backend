const express = require("express");
const router = express.Router();

const path = require("path");
const CategoriaController = require('./controller/CategoriaController');
const EnderecoController = require('./controller/EnderecoController');
const ItemPedidoController = require('./controller/ItemPedidoController');
const OpcaoController = require('./controller/OpcaoController');
const PedidoController = require('./controller/PedidoController');
const ProdutoController = require('./controller/ProdutoController');
const RestauranteController = require('./controller/RestauranteController');
const UsuarioController = require('./controller/UsuarioController');
const { findConnections, sendMessage } = require('./websocket');

const nodemailer = require('nodemailer');

router.use('/', express.static(path.join(__dirname + '/public')), function (req, res, next) {
  next();
});

// ===================== Ações ============================================
router.post("/verificar_login", (req, res) => {
  callback = (result) => {
    res.json(result)
  }

  UsuarioController.verificarLogin(req.body.token, callback);
});

router.post("/envio_email", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtpi.portecportas.com.br",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "siteatendimento@portecportas.com.br",
      pass: "Portec2020"
    },
    tls: { rejectUnauthorized: false }
  });

  const mailOptions = {
    from: 'siteatendimento@portecportas.com.br',
    to: 'portec.tec@gmail.com',
    subject: 'E-mail Fale Conosco Site Portec',
    text: '',
    html: `
    <strong>Nome:</strong> ${req.body.name} <br />
    <strong>Email:</strong> ${req.body.email} <br />
    <strong>Assunto:</strong> ${req.body.subject} <br />
    <strong>Telefone:</strong> ${req.body.telefone} <br />
    <strong>Mensagem:</strong> ${req.body.text}
    `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    console.log(error);
    console.log(info);
    if (error) {
      console.log(error);
      res.json({ result: error });
    } else {
      res.json({ result: true });
      console.log('Email enviado: ' + info.response);
    }
  });
});

router.post("/login", (req, res) => {
  function callback(row, usuarioID) {
    function callbackToken(token, usuarioID) {
      res.json({ "status": 1, token, usuarioID });
    }

    if (row == 1) {
      UsuarioController.gerarTokenLogin(usuarioID, callbackToken);
    } else if (row == 2) {
      res.json({ "status": 2 });
    } else {
      res.json({ "status": 3 });
    }
  }

  UsuarioController.loginUsuario(req.body.email, req.body.senha, callback);
});
// ========================================================================
router.post("/gerarsenha", (req, res) => {
  function callback(status) {
    res.json({ status });
  }

  UsuarioController.gerarsenha(req.body.email, req.body.senha, callback);
});
// ===================== Categorias =======================================
router.get("/categorias", (req, res) => {
  function callback(row) {
    res.json(row);
  }

  CategoriaController.selectAllCategorias(callback);
});
// ========================================================================

// ===================== Endereço =========================================
router.post("/enderecos", function (req, res) {
  EnderecoController.insertEndereco(
    req.body.cep,
    req.body.estado,
    req.body.cidade,
    req.body.bairro,
    req.body.endereco,
    req.body.numero,
    req.body.lat,
    req.body.long,
  );

  res.sendStatus(200);
});

router.get("/enderecos", (req, res) => {
  function callback(row) {
    res.json(row);
  }

  EnderecoController.selectAllEnderecos(callback);
});

router.get("/enderecos/:id", (req, res) => {
  function callback(row) {
    res.json(row);
  }

  EnderecoController.selectIdEndereco(callback, req.params.id);
});

router.delete("/enderecos/:id", (req, res) => {
  EnderecoController.deleteEndereco(req.params.id);

  res.sendStatus(200);
});
// ========================================================================

// ===================== Produto ==========================================
router.post("/produtos", function (req, res) {
  let nomesDasFotos = '';
  let objectFotos = [];

  ProdutoController.insertProdutos(
    req.body.data.nome_produto,
    req.body.data.categoria,
    req.body.data.desc_produto,
    nomesDasFotos,
    req.body.data.valor,
    req.body.data.restauranteID
  );

  res.sendStatus(200);
});

router.put("/produtos", (req, res) => {
  ProdutoController.atualizarProduto(
    req.body.nome_produto,
    req.body.categoria,
    req.body.desc_produto,
    req.body.valor,
    req.body.produtoID
  );

  res.sendStatus(200);
});

router.get("/produtos", (req, res) => {
  function callback(row) {
    res.json(row);
  }

  ProdutoController.selecionarTodosProdutos(callback);
});

router.get("/produtos/pesquisa/:nome", (req, res) => {
  function callback(row) {
    res.json(row);
  }

  if (req.params.nome == 0) {
    ProdutoController.selecionarTodosProdutos(callback, true);
  } else {
    ProdutoController.selectTextProdutos(callback, req.params.nome);
  }
});

router.get("/restaurantes/:id/produtos", (req, res) => {
  function callback(row) {
    res.json(row);
  }

  ProdutoController.selectRestautanteProduto(callback, req.params.id);
});

router.get("/restaurantes/:restauranteid/produtos/:produtoid", (req, res) => {
  function callback(row) {
    res.json(row);
  }

  const obj = { "restauranteid": req.params.restauranteid, "produtoid": req.params.produtoid }
  ProdutoController.selectRestautanteProdutoEspecifico(callback, obj);
});

router.get("/produtos/:id", (req, res) => {
  function callback(row) {
    res.json(row);
  }

  ProdutoController.selectIdProduto(callback, req.params.id);
});

router.get("/produtos/pesquisa/:text", (req, res) => {
  function callback(row) {
    res.json(row);
  }

  ProdutoController.selectTextProdutos(callback, req.params.text);
});

router.delete("/produtos/:id", (req, res) => {
  ProdutoController.deleteProduto(req.params.id);
  res.sendStatus(200);
});
// ========================================================================

// ===================== Opções do produto ================================

router.post("/produtos/atualizar/imagem", (req, res) => {
  function callback() { }

  ProdutoController.atualizarImagem(req.body.produtoID, req.body.fotoB64, req.body.deletar, callback);
  res.sendStatus(200);
})


router.post("/produtos/opcoes", function (req, res) {
  function callbackOpcoes(opcaoID) {
    OpcaoController.insertAdicionais(req.body.data.itens, req.body.data.produtoID, opcaoID)
  }

  let qtd_limite = req.body.data.qtd_limite == '' || req.body.data.qtd_limite == 0 ? 1 : req.body.data.qtd_limite;

  OpcaoController.insertOpcao(
    req.body.data.nome_opcao,
    req.body.data.obrigatorio,
    qtd_limite,
    req.body.data.selecao,
    req.body.data.produtoID,
    callbackOpcoes
  );

  res.sendStatus(200);
});

router.get("/produtos/opcoes", (req, res) => {
  function callback(row) {
    res.json(row);
  }

  OpcaoController.selectAllOpcoes(callback);
});

// Essa rota pega as opções referente ao ID da Opção
router.get("/produtos/opcoes/:id", (req, res) => {
  function callback(row) {
    res.json(row);
  }

  OpcaoController.selectIdOpcao(callback, req.params.id);
});

// Essa rota pega as opções referente ao ID do Produto
router.get("/produtos/:id/opcoes", (req, res) => {
  function callback(row) {
    res.json(row);
  }

  OpcaoController.selecionarOpcoesProduto(callback, req.params.id);
});

// Essa rota pega as opções referente ao ID do Produto e junta
// com os adicionais para mostrar na tela de produto no app.
router.get("/produtos/:id/opcoes/mobile", (req, res) => {
  let opcoesAdicionalProduto = []

  function callback(opcoes) {
    function callbackOpcoesAdicionais(opcaoAdicional) {
      opcoesAdicionalProduto.push(opcaoAdicional);

      if (opcoes.length === opcoesAdicionalProduto.length) {
        res.json(opcoesAdicionalProduto);
      }
    }

    for (let index = 0; index < opcoes.length; index++) {
      const opcao = opcoes[index];
      OpcaoController.selecionarAdicionalOpcao(callbackOpcoesAdicionais, opcao.ID)
    }
  }

  OpcaoController.selecionarOpcoesProduto(callback, req.params.id);
});

router.delete("/produtos/opcoes/:id", (req, res) => {
  OpcaoController.deleteOpcao(req.params.id);
  res.sendStatus(200);
});
// ========================================================================

// ===================== Adicionais da opção ================================
router.get("/adicionais/opcoes/:id", (req, res) => {
  function callback(row) {
    if (row.length === 0) {
      res.json([]);
    } else {
      function callbackAdicionais(adicionais) {
        res.json(adicionais);
      }
      OpcaoController.selectAllAdicionais(callbackAdicionais, row);
    }
  }

  OpcaoController.selectAllAdicionaisOpcao(callback, req.params.id);
});
// ========================================================================

// ===================== Vinculo opção em adicional ======================

router.post("/opcao/adicional", function (req, res) {
  function callback() {
    OpcaoController.atualizarVinculo(callback, 1, req.body.data.opcaoID);
    OpcaoController.atualizarVinculoAdicional(callback, 1, req.body.data.adicionalID);
    res.sendStatus(200);
  }

  OpcaoController.vincularOpcaoAdicional(
    callback,
    req.body.data.opcaoID,
    req.body.data.adicionalID
  );
});

router.get("/opcao/adicional/:id", function (req, res) {
  function callback(row) {
    let opcoeVinculada = [];

    if (row.length === 0) {
      res.json([null]);
    } else {
      for (let index = 0; index < row.length; index++) {
        const opcoeVinculada = row[index];
        OpcaoController.selectIdOpcao(callbackOpcaoVinculada, opcoeVinculada.opcaoID);
      }
    }

    function callbackOpcaoVinculada(rowVinculada) {
      opcoeVinculada.push(rowVinculada[0]);
      if (row.length === opcoeVinculada.length) {
        res.json(opcoeVinculada);
      }
    }
  }

  OpcaoController.buscarOpcoesVinculadas(callback, req.params.id);
});

router.post("/opcao/deletar", (req, res) => {
  let opcoesVinculadas = []

  for (let index = 0; index < req.body.opcoesVinculadas.length; index++) {
    const arrayOpVinculada = req.body.opcoesVinculadas[index];
    opcoesVinculadas.push(arrayOpVinculada[0])
  }

  OpcaoController.deletarOpcao(req.body.opcaoID, req.body.adicionais, opcoesVinculadas);
  res.sendStatus(200);
});

// Deleta a opção vinculada ao o adicional
router.delete("/opcao/:opcaoID/adicional/:adicionalID", (req, res) => {
  function callback() { }
  ProdutoController.atualizarVinculo(req.params.opcaoID);
  OpcaoController.deletarOpcaoVinculada(req.params.opcaoID, req.params.adicionalID);
  res.sendStatus(200);
});

// Pega as opções vinculadas ao o adicional.
router.get("/opcao/vinculo/adicional/:id", function (req, res) {
  let opcoesAdicionalProduto = []

  function callback(opcoes) {
    function callbackOpcoesAdicionais(opcaoAdicional) {
      opcoesAdicionalProduto.push(opcaoAdicional);
      if (opcoes.length === opcoesAdicionalProduto.length) {
        res.json(opcoesAdicionalProduto);
      }
    }

    for (let index = 0; index < opcoes.length; index++) {
      const opcao = opcoes[index];
      OpcaoController.selecionarAdicionalOpcaoVinculada(callbackOpcoesAdicionais, opcao.ID)
    }
  }

  OpcaoController.selecionarOpcoesVinculada(callback, req.params.id);
});
// ========================================================================

// ===================== Restaurante ======================================
router.post("/restaurantes", function (req, res) {
  let nomesDasFotos = '';

  RestauranteController.salvarFotos(req.body.fotos);

  req.body.fotos.map(element => {
    nomesDasFotos = null
  });

  RestauranteController.insertRestaurante(
    req.body.cnpj,
    req.body.razao_social,
    req.body.nome_fantasia,
    req.body.telefone,
    req.body.servico_entrega,
    req.body.especialidade,
    nomesDasFotos,
    req.body.enderecoID
  );

  res.sendStatus(200);
});

router.post("/restaurantes/add/image", function (req, res) {
  RestauranteController.salvarFotos(req.body.data.restauranteID, req.body.data.foto, req.body.data.deletar);
  res.sendStatus(200);
});

router.get("/restaurantes", (req, res) => {
  function callback(rowRestaurante) {
    res.json(rowRestaurante);
  }

  RestauranteController.selectAllRestaurante(callback);
});

router.get("/restaurantes/:id", (req, res) => {
  function callback(row) {
    res.json(row);
  }

  RestauranteController.selectIdRestaurante(callback, req.params.id);
});

router.post("/restaurantes/atualizar/logo", (req, res) => {
  function callback() {
  }

  RestauranteController.atualizarLogo(req.body.restauranteID, req.body.fotoB64, req.body.deletar, callback);
  res.sendStatus(200);
})

router.delete("/restaurantes/:id", (req, res) => {
  RestauranteController.deleteRestaurante(req.params.id);
  res.sendStatus(200);
});
// ========================================================================

// ===================== Usuário ==========================================
router.post("/usuarios", async function (req, res) {
  let nomeFoto = '';
  if (req.body.foto === undefined) {
    nomeFoto = 'defaultUsuario.png';
  } else {
    await UsuarioController.salvarFotos(req.body.foto);
    nomeFoto = req.body.foto[0].name;
  }

  UsuarioController.insertUsuarios(
    req.body.nome,
    req.body.email,
    req.body.tipo,
    req.body.senha,
    nomeFoto
  );

  res.sendStatus(200);
});

router.get("/usuarios", (req, res) => {
  function callback(row) {
    res.json(row);
  }

  UsuarioController.selectAllUsuarios(callback);
});

router.delete("/usuarios/:id", (req, res) => {
  UsuarioController.deleteUsuarios(req.params.id);
  res.sendStatus(200);
});
// ========================================================================

// ===================== api admin ========================================
router.post("/admin/restaurante/cadastrar", async function (req, res) {

  const lat = req.body.data.lat === undefined ? null : req.body.data.lat;
  const long = req.body.data.long === undefined ? null : req.body.data.long;

  req.body.data.lat = lat;
  req.body.data.long = long;

  EnderecoController.insertEndereco(req.body.data, callBackEndereco);

  async function callBackEndereco(enderecoID) {
    RestauranteController.insertRestaurante(req.body.data, enderecoID, callbackRestaurante);

    async function callbackRestaurante(restauranteID) {

      let fotorestaurante = '';

      if (req.body.data.logo === undefined || req.body.data.logo === '') {
        fotorestaurante = 'defaultrestaurante.png';
      } else {
        RestauranteController.salvarLogo(req.body.data.logo, restauranteID);
      }

      nomeFotoUsuario = 'defaultusuario.png';
      let senhaCad = req.body.data.senha === undefined ? null : req.body.data.senha;
      await UsuarioController.insertUsuarios(req.body.data, senhaCad, 5, enderecoID, restauranteID, nomeFotoUsuario);
    }
  }

  res.sendStatus(200);
});

router.put("/admin/restaurante/atualizar", async function (req, res) {

  const lat = req.body.data.lat === undefined ? null : req.body.data.lat;
  const long = req.body.data.long === undefined ? null : req.body.data.long;

  req.body.data.lat = lat;
  req.body.data.long = long;

  await EnderecoController.atualizarEndereco(req.body.data);
  await UsuarioController.atualizarUsuario(req.body.data);
  await RestauranteController.atualizarRestaurante(req.body.data);

  res.sendStatus(200);
});
// ========================================================================

// ===================== Pedidos ==========================================
router.post("/pedidos", function (req, res) {
  console.warn(req.body);
  // PedidoController.insertPedidos(
  //   req.body.usuarioID,
  //   req.body.restauranteID,
  //   req.body.status,
  //   req.body.valorTotal,
  //   req.body.dataPedido,
  // );

  // deu bom 
  res.sendStatus(200);

  // deu ruim
  // res.sendStatus(500);
});

router.get("/pedidos", (req, res) => {
  function callback(rowPedidos) {
    res.json(rowPedidos);
  }

  PedidoController.selectAllPedidos(callback);
});

router.get("/usuarios/:id/pedidos", (req, res) => {
  function callback(row) {
    res.json(row);
  }

  PedidoController.selectPedidosDesc(callback, req.params.id);
});

router.post("/usuarios/:id/realizar-pedido", function (req, res) {

  const currentTime = new Date();
  const idUsuario = req.params.id;
  let pedido = req.body.pedido;
  const idRestaurante = req.body.pedido.restaurante;
  const produtos = req.body.pedido.produtos;
  let valorTotal = 0;

  produtos.forEach(element => {
    valorTotal = element.total;
  });

  PedidoController.insertPedidos(idUsuario, idRestaurante, 0, valorTotal, currentTime.toString(), callbackAfterInsertPedido);

  function callbackAfterInsertPedido(idPedido) {
    pedido.ID = idPedido;
    produtos.forEach(element => {
      PedidoController.insertProdutosPedidos(idPedido, element.ID, callbackAfterInsertProdutoPedido);
    });

    const sendMessageTo = findConnections(idUsuario);
    console.log(sendMessageTo);
    sendMessage(sendMessageTo, 'novo-pedido', pedido);
  }

  function callbackAfterInsertProdutoPedido(something) {
    console.log(something)
  }

  res.sendStatus(200);
});

router.put("/pedidos/:id/status/:codStatus", function (req, res) {

  const { id, codStatus } = req.params;
  PedidoController.updateStatusPedidos(codStatus, id, callbackAfterUpdateStatusPedido);

  function callbackAfterUpdateStatusPedido(status) {
    let message = "";

    const sendMessageTo = findConnections(1);
    if (status == 1) {
      message = "O Restaurante aceitou seu pedido e já está preparando."
    } else {
      message = "O Restaurante teve um problema e não pôde aceitar seu pedido no momento!"
    }

    sendMessage(sendMessageTo, 'pedido', message);
  }

  res.sendStatus(200);
});
// ========================================================================

// ===================== Item Pedido ======================================
router.post("/pedidos/item", function (req, res) {

  ItemPedidoController.insertItem(
    req.body.pedidoID,
    req.body.produtoID,
    req.body.nomeProduto,
    req.body.opcoesEscolhidas,
    req.body.qtd,
    req.body.valorProduto,
    req.body.valorTotal,
  )

  res.sendStatus(200)
});

router.get("/pedidos/item", (req, res) => {
  function callback(rowItem) {
    res.json(rowItem);
  }

  ItemPedidoController.selectAllItem(callback);
});

router.get("/pedidos/:id/item", (req, res) => {
  function callback(row) {
    res.json(row);
  }

  ItemPedidoController.selectIdPedido(callback, req.params.id);
});
// ========================================================================

module.exports = router;