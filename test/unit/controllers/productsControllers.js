const sinon = require("sinon");
const { expect } = require("chai");

const ProductsService = require("../../../services/productsService");
const ProductsController = require("../../../controllers/productsController");

describe("Produtos - (Camada Controller) Quando busca todos os produtos", () => {
  const response = {};
  const request = {};

  const arrayResponse = [
    {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10,
    },
    {
      id: 2,
      name: "Traje de encolhimento",
      quantity: 20,
    },
    {
      id: 3,
      name: "Escudo do Capitão América",
      quantity: 30,
    },
  ];

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(ProductsService, "getAllProducts").resolves(arrayResponse);
  });

  after(() => {
    ProductsService.getAllProducts.restore();
  });

  it('é chamado o método "status" passando o código 200', async () => {
    await ProductsController.getAllProducts(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it("retorna um array de objetos", async () => {
    await ProductsController.getAllProducts(request, response);
    expect(response.json.calledWith(arrayResponse)).to.be.equal(true);
  });
});

describe("Produtos - (Camada Controller) Quando busca produtos por id", () => {
  describe("quando não existe um produto com o id informado", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 10,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, "getById").resolves(null);
    });

    after(() => {
      ProductsService.getById.restore();
    });

    it('é chamado o método "status" passando 404', async () => {
      await ProductsController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.true;
    });

    it('é chamado o método "json" passando a mensagem "Products not found"', async () => {
      await ProductsController.getById(request, response);
      expect(response.json.calledWith({ message: "Product not found" })).to.be
        .true;
    });
  });

  describe("quando existe um produto com o id informado", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, "getById").resolves({
        id: 1,
        name: "Martelo de Thor",
        quantity: 10,
      });
    });

    after(() => {
      ProductsService.getById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await ProductsController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await ProductsController.getById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
