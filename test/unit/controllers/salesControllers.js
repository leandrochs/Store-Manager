const sinon = require("sinon");
const { expect } = require("chai");

const SalesService = require("../../../services/salesService");
const SalesController = require("../../../controllers/salesController");

describe("(Camada Controller de sales - Vendas)", () => {
  describe("Quando busca todas as vendas", () => {
  const response = {};
  const request = {};

  const arrayResponse = [
    {
      saleId: 1,
      date: "2022-03-31T13:23:16.000Z",
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      date: "2022-03-31T13:23:16.000Z",
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      date: "2022-03-31T13:23:16.000Z",
      productId: 3,
      quantity: 15,
    },
  ];

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(SalesService, "getAllSales").resolves(arrayResponse);
  });

  after(() => {
    SalesService.getAllSales.restore();
  });

  it('é chamado o método "status" passando o código 200', async () => {
    await SalesController.getAllSales(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it("retorna um array de objetos", async () => {
    await SalesController.getAllSales(request, response);
    expect(response.json.calledWith(arrayResponse)).to.be.equal(true);
  });
});

describe("Quando busca vendas por id", () => {
  describe("E não existe uma venda com o id informado", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 10,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, "getById").resolves([]);
    });

    after(() => {
      SalesService.getById.restore();
    });

    it('é chamado o método "status" passando 404', async () => {
      await SalesController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.true;
    });

    it('é chamado o método "json" passando a mensagem "Products not found"', async () => {
      await SalesController.getById(request, response);
      expect(response.json.calledWith({ message: "Sale not found" })).to.be.true;
    });
  });

  describe("E existe uma venda com o id informado", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, "getById").resolves([
        {
          date: "2022-03-31T13:23:16.000Z",
          productId: 1,
          quantity: 5,
        },
        {
          date: "2022-03-31T13:23:16.000Z",
          productId: 2,
          quantity: 10,
        },
      ]);
    });

    after(() => {
      SalesService.getById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await SalesController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await SalesController.getById(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
});
