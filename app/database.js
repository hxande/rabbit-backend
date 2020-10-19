const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database('./db/sample.db');

const TABELA_CATEGORIAS =
  "CREATE TABLE categorias (ID INTEGER PRIMARY KEY AUTOINCREMENT, nome_categoria varchar(255), imagem VARCHAR(255), status NUMBER)"
db.run(TABELA_CATEGORIAS);

const TABELA_PRODUTOS =
  "CREATE TABLE produtos (ID INTEGER PRIMARY KEY AUTOINCREMENT, nome_produto varchar(255), categoria INTEGER, desc_produto varchar(255), imagem varchar(255), valor REAL, restauranteID INTEGER, status INTEGER)"
db.run(TABELA_PRODUTOS);

const TABELA_OPCOES =
  "CREATE TABLE opcoes (ID INTEGER PRIMARY KEY AUTOINCREMENT, nome_opcao varchar(255), obrigatorio BOOLEAN, qtd_obrigatorio NUMBER, selecao NUMBER, produtoID INTEGER, vinculo INTEGER)"
db.run(TABELA_OPCOES);

const TABELA_ADICIONAIS =
  "CREATE TABLE adicionais (ID INTEGER PRIMARY KEY AUTOINCREMENT, nome_adicional varchar(255), desc_adicional varchar(255), valor_adicional REAL, qtd_limite INTEGER, vinculo INTEGER, foto VARCHAR(255))"
db.run(TABELA_ADICIONAIS);

// Qual adicionais que a opcao tem
const TABELA_OPCOES_ADICIONAIS =
  "CREATE TABLE opcoes_adicionais (ID INTEGER PRIMARY KEY AUTOINCREMENT, opcaoID INTEGER, adicionalID INTEGER)"
db.run(TABELA_OPCOES_ADICIONAIS);

// Qual opcao que esta vinculado a adicionais
const TABELA_ADICIONAIS_OPCOES =
  "CREATE TABLE adicionais_opcoes (ID INTEGER PRIMARY KEY AUTOINCREMENT, opcaoID INTEGER, adicionalID INTEGER)"
db.run(TABELA_ADICIONAIS_OPCOES);

const TABELA_RESTAURANTES =
  "CREATE TABLE restaurantes (ID INTEGER PRIMARY KEY AUTOINCREMENT, cnpj varchar(255), razao_social varchar(255), desc_restaurante varchar(255), nome_fantasia varchar(255), telefone varchar(255), servico_entrega BOOLEAN, especialidade NUMERIC, logo varchar(255), enderecoID INTEGER, status INTEGER)"
db.run(TABELA_RESTAURANTES);

const TABELA_ENDERECOS =
  "CREATE TABLE enderecos (ID INTEGER PRIMARY KEY AUTOINCREMENT, cep varchar(255), estado varchar(255), cidade varchar(255), bairro varchar(255), endereco varchar(255), numero varchar(255), lat varchar(255), long varchar(255)) "
db.run(TABELA_ENDERECOS);

const TABELA_USUARIOS =
  "CREATE TABLE usuarios (ID INTEGER PRIMARY KEY AUTOINCREMENT, email varchar(255), celular varchar(255), senha varchar(255), nome varchar(255), sobrenome varchar(255),  cpf INT,  rg varchar(255), orgao_emissor varchar(255), tipo INT, enderecoID INTEGER, imagem varchar(255), restauranteID INTEGER, tokenLogin varchar(255))"
db.run(TABELA_USUARIOS);

const TABELA_PEDIDOS =
  "CREATE TABLE pedidos (ID INTEGER PRIMARY KEY AUTOINCREMENT, usuarioID INTEGER, restauranteID INTEGER, status NUMBER, valorTotal REAL, dataPedido TEXT)"
db.run(TABELA_PEDIDOS);

const TABELA_PEDIDOS_PRODUTOS =
  "CREATE TABLE pedidos_produtos (ID INTEGER PRIMARY KEY AUTOINCREMENT, pedidoID INTEGER, produtoID INTEGER)"
db.run(TABELA_PEDIDOS_PRODUTOS);

const TABELA_PEDIDOS_ADICIONAIS =
  "CREATE TABLE pedidos_adicionais (ID INTEGER PRIMARY KEY AUTOINCREMENT, pedidoID INTEGER, adicionalID INTEGER)"
db.run(TABELA_PEDIDOS_ADICIONAIS);

db.close();