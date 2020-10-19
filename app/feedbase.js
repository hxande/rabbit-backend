const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database('./db/sample.db');

// ===== ==== ==== Categorias ==== === === ====

const insertOfertas =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Ofertas especiais', 'ofertas.png', 1)"
db.run(insertOfertas);

const insertAlcool =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Álcool', 'alcool.png', 1)"
db.run(insertAlcool);

const insertAsiatica =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Asiática', 'asiatica.png', 1)"
db.run(insertAsiatica);

const insertBrasileira =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Brasileira', 'brasileira.png', 1)"
db.run(insertBrasileira);

const insertCaldos =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Caldo', 'caldo.png', 1)"
db.run(insertCaldos);

const insertChinesa =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Chinesa', 'chinesa.png', 1)"
db.run(insertChinesa);

const insertConveniencia =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Conveniência', 'conveniencia.png', 1)"
db.run(insertConveniencia);

const insertFitness =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Fitness', 'fitness.png', 1)"
db.run(insertFitness);

const insertFrutosdomar =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Frutos do mar', 'frutosdomar.png', 1)"
db.run(insertFrutosdomar);

const insertGrill =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Grill', 'grill.png', 1)"
db.run(insertGrill);

const insertHamburguer =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Hambúrguer', 'hamburguer.png', 1)"
db.run(insertHamburguer);

const insertJapones =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Japonesa', 'japones.png', 1)"
db.run(insertJapones);

const insertMassa =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Massa', 'massa.png', 1)"
db.run(insertMassa);

const insertMexicana =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Mexicana', 'mexicana.png', 1)"
db.run(insertMexicana);

const insertPadaria =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Padaria', 'padaria.png', 1)"
db.run(insertPadaria);

const insertPizza =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Pizza', 'pizza.png', 1)"
db.run(insertPizza);

const insertSalada =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Salada', 'salada.png', 1)"
db.run(insertSalada);

const insertSobremesa =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Sobremesa', 'sobremesa.png', 1)"
db.run(insertSobremesa);

const insertSorvetes =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Sorvetes', 'sorvetes.png', 1)"
db.run(insertSorvetes);

const insertVegana =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Vegana', 'vegana.png', 1)"
db.run(insertVegana);

const insertVegetariana =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Vegetariana', 'vegetariana.png', 1)"
db.run(insertVegetariana);


// ===== ==== ==== ==== === ==== === === ====


// ==-========= Restaurante padrão  ======== ==== 
const INSERIR_ENDERECO_RESTAURANTE =
  "INSERT INTO enderecos (cep, estado, cidade, bairro, endereco, numero, lat, long) VALUES ('71906500', 'DF', 'Brasilia', 'Aguas Claras', 'Avenida Parque aguas claras', '602', '', null)"
db.run(INSERIR_ENDERECO_RESTAURANTE);

const INSERIR_DONO_RESTAURANTE =
  "INSERT INTO usuarios (email, celular, senha, nome, sobrenome,  cpf,  rg, orgao_emissor, tipo, enderecoID, imagem, restauranteID) VALUES ('rafaelffa1@hotmail.com', '9964240543', '$2y$12$ywOtwG1c5zq0g6hnAaJLluGkG7Dv49ptTRTA5NZz2Ccfos4Fu7aei', 'Rafael', 'Almeida', '04372866143', '3051620', 'SSP/DF', 1, 1, '', 1)"
db.run(INSERIR_DONO_RESTAURANTE);

const INSERIR_RESTAURANTE =
  "INSERT INTO restaurantes (cnpj, razao_social, desc_restaurante, nome_fantasia, telefone, servico_entrega, especialidade, logo, enderecoID, status) VALUES ('00000000000000', 'subyway .ltda', 'restaurante de saladas e sanduiches fitness', 'Subway', '9964240543', 0, 1, 'subwaylagosul.jpeg', 1, 1)"
db.run(INSERIR_RESTAURANTE);

// @@@@ ==-========= produtos do Restaurante padrão  ======== ====

const INSERIR_PRODUTO_RESTAURANTE1 =
  "INSERT INTO produtos (nome_produto, categoria, desc_produto, imagem, valor, restauranteID, status) VALUES ('Combo Frango Teriaki', 2, 'Sanduiche de 15 cm com recheio de frango teriaki, cockie tradicional e refrigerante', '/img/produtos/subway_combo2.jpg', 25, 1, 1)"
db.run(INSERIR_PRODUTO_RESTAURANTE1);

// @@@@@@@@@ ==-========= Opções do produto 1 ======== ====
const INSERIR_OPCAO_PRODUTO_RESTAURANTE1 =
  "INSERT INTO opcoes (nome_opcao, obrigatorio, qtd_obrigatorio, selecao, produtoID, vinculo) VALUES ('Escolha o tamanho do pão', 1, 1, 1, 1, 0)"
db.run(INSERIR_OPCAO_PRODUTO_RESTAURANTE1);

const INSERIR_ADICIONAL_OPCAO_PRODUTO_RESTAURANTE1 =
  "INSERT INTO adicionais (nome_adicional, desc_adicional, valor_adicional, qtd_limite) VALUES ('15cm', '', 0, null)"
db.run(INSERIR_ADICIONAL_OPCAO_PRODUTO_RESTAURANTE1);

const INSERIR_RELACAO_ADICIONAL_OPCAO_PRODUTO_RESTAURANTE1 =
  "INSERT INTO opcoes_adicionais (opcaoID, adicionalID) VALUES (1, 1)"
db.run(INSERIR_RELACAO_ADICIONAL_OPCAO_PRODUTO_RESTAURANTE1);
// @@@@@@@@@ ===== ==== ==== ==== === ==== === === ====

// @@@@@@@@@ ==-========= Opções 2 do produto 1 ======== ====
const INSERIR_OPCAO2_PRODUTO_RESTAURANTE1 =
  "INSERT INTO opcoes (nome_opcao, obrigatorio, qtd_obrigatorio, selecao, produtoID, vinculo) VALUES ('Escolha o tipo de pão', 1, 1, 1, 1, 0)"
db.run(INSERIR_OPCAO2_PRODUTO_RESTAURANTE1);

// adicional 1
const INSERIR_ADICIONAL1_OPCAO2_PRODUTO_RESTAURANTE1 =
  "INSERT INTO adicionais (nome_adicional, desc_adicional, valor_adicional, qtd_limite, vinculo) VALUES ('Integral', '', 3.40, null, 0)"
db.run(INSERIR_ADICIONAL1_OPCAO2_PRODUTO_RESTAURANTE1);

const INSERIR_RELACAO_ADICIONAL1_OPCAO2_PRODUTO_RESTAURANTE1 =
  "INSERT INTO opcoes_adicionais (opcaoID, adicionalID) VALUES (2, 2)"
db.run(INSERIR_RELACAO_ADICIONAL1_OPCAO2_PRODUTO_RESTAURANTE1);
// =======

// adicional 2
const INSERIR_ADICIONAL2_OPCAO2_PRODUTO_RESTAURANTE1 =
  "INSERT INTO adicionais (nome_adicional, desc_adicional, valor_adicional, qtd_limite, vinculo) VALUES ('Manteiga Temperada', '', 5.00, null, 0)"
db.run(INSERIR_ADICIONAL2_OPCAO2_PRODUTO_RESTAURANTE1);

const INSERIR_RELACAO_ADICIONAL2_OPCAO2_PRODUTO_RESTAURANTE1 =
  "INSERT INTO opcoes_adicionais (opcaoID, adicionalID) VALUES (2, 3)"
db.run(INSERIR_RELACAO_ADICIONAL2_OPCAO2_PRODUTO_RESTAURANTE1);
//  =======

// adicional 3
const INSERIR_ADICIONAL3_OPCAO2_PRODUTO_RESTAURANTE1 =
  "INSERT INTO adicionais (nome_adicional, desc_adicional, valor_adicional, qtd_limite, vinculo) VALUES ('Italiano', '', 4.35, null, 0)"
db.run(INSERIR_ADICIONAL3_OPCAO2_PRODUTO_RESTAURANTE1);

const INSERIR_RELACAO_ADICIONAL3_OPCAO2_PRODUTO_RESTAURANTE1 =
  "INSERT INTO opcoes_adicionais (opcaoID, adicionalID) VALUES (2, 4)"
db.run(INSERIR_RELACAO_ADICIONAL3_OPCAO2_PRODUTO_RESTAURANTE1);
//  =======

// @@@@@@@@@ ===== ==== ==== ==== === ==== === === ====

// @@@@@@@@@ =========== Opções 3 do produto 1 ======== ====
const INSERIR_OPCAO3_PRODUTO_RESTAURANTE1 =
  "INSERT INTO opcoes (nome_opcao, obrigatorio, qtd_obrigatorio, selecao, produtoID, vinculo) VALUES ('Escolha o tipo do queijo', 1, 2, 2, 1, 0)"
db.run(INSERIR_OPCAO3_PRODUTO_RESTAURANTE1);

// adicional 1
const INSERIR_ADICIONAL1_OPCAO3_PRODUTO_RESTAURANTE1 =
  "INSERT INTO adicionais (nome_adicional, desc_adicional, valor_adicional, qtd_limite, vinculo) VALUES ('Mussarela', '', 5.98, null, 0)"
db.run(INSERIR_ADICIONAL1_OPCAO3_PRODUTO_RESTAURANTE1);

const INSERIR_RELACAO_ADICIONAL1_OPCAO3_PRODUTO_RESTAURANTE1 =
  "INSERT INTO opcoes_adicionais (opcaoID, adicionalID) VALUES (3, 5)"
db.run(INSERIR_RELACAO_ADICIONAL1_OPCAO3_PRODUTO_RESTAURANTE1);
// =======

// adicional 2
const INSERIR_ADICIONAL2_OPCAO3_PRODUTO_RESTAURANTE1 =
  "INSERT INTO adicionais (nome_adicional, desc_adicional, valor_adicional, qtd_limite, vinculo) VALUES ('Prato', '', 6.99, null, 0)"
db.run(INSERIR_ADICIONAL2_OPCAO3_PRODUTO_RESTAURANTE1);

const INSERIR_RELACAO_ADICIONAL2_OPCAO3_PRODUTO_RESTAURANTE1 =
  "INSERT INTO opcoes_adicionais (opcaoID, adicionalID) VALUES (3, 6)"
db.run(INSERIR_RELACAO_ADICIONAL2_OPCAO3_PRODUTO_RESTAURANTE1);
// =======

// adicional 3
const INSERIR_ADICIONAL3_OPCAO3_PRODUTO_RESTAURANTE1 =
  "INSERT INTO adicionais (nome_adicional, desc_adicional, valor_adicional, qtd_limite, vinculo) VALUES ('Cheddar', '', 0, null, 0)"
db.run(INSERIR_ADICIONAL3_OPCAO3_PRODUTO_RESTAURANTE1);

const INSERIR_RELACAO_ADICIONAL3_OPCAO3_PRODUTO_RESTAURANTE1 =
  "INSERT INTO opcoes_adicionais (opcaoID, adicionalID) VALUES (3, 7)"
db.run(INSERIR_RELACAO_ADICIONAL3_OPCAO3_PRODUTO_RESTAURANTE1);
// =======



// @@@@@@@@@ =========== Opções 4 do produto 1 ======== ====
const INSERIR_OPCAO4_PRODUTO_RESTAURANTE1 =
  "INSERT INTO opcoes (nome_opcao, obrigatorio, qtd_obrigatorio, selecao, produtoID, vinculo) VALUES ('Escolha os itens da salada', 0, 2, 2, 1, 0)"
db.run(INSERIR_OPCAO4_PRODUTO_RESTAURANTE1);

// adicional 1
const INSERIR_ADICIONAL1_OPCAO4_PRODUTO_RESTAURANTE1 =
  "INSERT INTO adicionais (nome_adicional, desc_adicional, valor_adicional, qtd_limite, vinculo) VALUES ('Tomate', '', 5.98, null, 0)"
db.run(INSERIR_ADICIONAL1_OPCAO4_PRODUTO_RESTAURANTE1);

const INSERIR_RELACAO_ADICIONAL1_OPCAO4_PRODUTO_RESTAURANTE1 =
  "INSERT INTO opcoes_adicionais (opcaoID, adicionalID) VALUES (4, 8)"
db.run(INSERIR_RELACAO_ADICIONAL1_OPCAO4_PRODUTO_RESTAURANTE1);
// =======

// adicional 2
const INSERIR_ADICIONAL2_OPCAO4_PRODUTO_RESTAURANTE1 =
  "INSERT INTO adicionais (nome_adicional, desc_adicional, valor_adicional, qtd_limite, vinculo) VALUES ('Alface', '', 6.99, null, 0)"
db.run(INSERIR_ADICIONAL2_OPCAO4_PRODUTO_RESTAURANTE1);

const INSERIR_RELACAO_ADICIONAL2_OPCAO4_PRODUTO_RESTAURANTE1 =
  "INSERT INTO opcoes_adicionais (opcaoID, adicionalID) VALUES (4, 9)"
db.run(INSERIR_RELACAO_ADICIONAL2_OPCAO4_PRODUTO_RESTAURANTE1);
// =======

// adicional 3
const INSERIR_ADICIONAL4_OPCAO4_PRODUTO_RESTAURANTE1 =
  "INSERT INTO adicionais (nome_adicional, desc_adicional, valor_adicional, qtd_limite, vinculo) VALUES ('Azeitona', '', 0, null, 0)"
db.run(INSERIR_ADICIONAL4_OPCAO4_PRODUTO_RESTAURANTE1);

const INSERIR_RELACAO_ADICIONAL4_OPCAO4_PRODUTO_RESTAURANTE1 =
  "INSERT INTO opcoes_adicionais (opcaoID, adicionalID) VALUES (4, 10)"
db.run(INSERIR_RELACAO_ADICIONAL4_OPCAO4_PRODUTO_RESTAURANTE1);
// =======


// @@@@@@@@@ ===== ==== ==== ==== === ==== === === ====

// ===== ==== ==== ==== === ==== === === ====

// ===== ==== ==== ==== === ==== === === ====

db.close();