'use strict';

const e = React.createElement;

class Produtos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: []
    }
  }

  componentWillMount = () => {
    this.fetchProdutos();
  }

  // Portas Automaticas e controle de acesso.
  // Venda, Instalação e Manutenção (Portas Automaticas, Portas de vidro temperado, Molas aereas hidraulicas
  // Molas hidraulicas aereas, e de pisos, barras anti panico nas portas corta fogo, controle de acesso (biometrico, senha e cartão)).
  // catraca vidro temperado e os acessorios, vidro laminado, fechaduras eletricas, eletronicas, eletromecanicas e eletromagneticas.
  // contrato de manutenção(com fornecimento de peças ou com fornecimento de mao de obra),
  // fornecimento de aluminio e estruturas

  fetchProdutos = () => {
    $.ajax({
      type: "GET",
      url: `http://${window.location.host}/produto/listar`,
      success: (produtos) => {
        let produtosImagemMudada = []
        for (let index = 0; index < produtos.length; index++) {
          const element = produtos[index];
          element.imagemArray = produtos[0].imagem.split(',');
          produtosImagemMudada.push(element)
        }
        this.setState({ produtos: produtosImagemMudada });
        console.log(produtosImagemMudada)
      }
    })
  }

  irParaPortifolioSingle = (e, id) => {
    e.preventDefault();
    window.location.href = `http://${window.location.host}/portifolio-single?produto=${id}`
  }


  render() {
    const { produtos } = this.state;
    return (
      <div class="row portfolio-list sort-destination" data-sort-id="portfolio">

        {produtos.map(produto => {
          return (
            <div style={{ cursor: 'pointer' }} class="col-md-6 col-lg-4 isotope-item brands">
              <div class="portfolio-item">
                <a onClick={(e) => this.irParaPortifolioSingle(e, produto.ID)}>
                  <span class="thumb-info thumb-info-lighten border-radius-0">
                    <span class="thumb-info-wrapper border-radius-0">
                      <img src={`img/${produto.imagemArray[0]}`} class="img-fluid border-radius-0" alt="" />
                      <span class="thumb-info-title">
                        <span class="thumb-info-inner">{produto.nome_produto}</span>
                        <span class="thumb-info-type">{produto.categoria}</span>
                      </span>
                      <span class="thumb-info-action">
                        <span class="thumb-info-action-icon bg-dark opacity-8"><i class="fas fa-plus"></i></span>
                      </span>
                    </span>
                  </span>
                </a>
              </div>
            </div>
          )
        })}

        <div style={{ display: 'none' }} class="col-md-6 col-lg-4 isotope-item brands">
          <div class="portfolio-item">
            <a href="portfolio-single-wide-slider.html">
              <span class="thumb-info thumb-info-lighten border-radius-0">
                <span class="thumb-info-wrapper border-radius-0">
                  <img src="img/projects/project.jpg" class="img-fluid border-radius-0" alt="" />

                  <span class="thumb-info-title">
                    <span class="thumb-info-inner">Presentation</span>
                    <span class="thumb-info-type">Brand</span>
                  </span>
                  <span class="thumb-info-action">
                    <span class="thumb-info-action-icon bg-dark opacity-8"><i class="fas fa-plus"></i></span>
                  </span>
                </span>
              </span>
            </a>
          </div>
        </div>



      </div>
    );
  }
}

const domContainer = document.querySelector('#produtos');
ReactDOM.render(e(Produtos), domContainer);