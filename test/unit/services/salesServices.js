const sinon = require("sinon");
const { expect } = require("chai");

const SalesService = require("../../../services/salesService");
const SalesModel = require("../../../models/salesModels");

describe("Vendas - (Camada Service) Quando busca todas as vendas", () => {
  before(() => {
    sinon.stub(SalesModel, "getAllSales").resolves([
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
    ]);
  });

  after(() => {
    SalesModel.getAllSales.restore();
  });

  it("retorna um array", async () => {
    const response = await SalesService.getAllSales();
    expect(response).to.be.an("array");
  });

  it("O array não está vazio", async () => {
    const response = await SalesService.getAllSales();
    expect(response).to.be.not.empty;
  });

  it("É um array de objetos", async () => {
    const response = await SalesService.getAllSales();
    expect(response[0]).to.be.an("object");
  });

  it("Objeto possui chaves saleId, date, productId e quantity", async () => {
    const response = await SalesService.getAllSales();
    expect(response[0]).to.include.all.keys(
      "saleId",
      "date",
      "productId",
      "quantity"
    );
  });
});

describe("Vendas - (Camada Service) Quando busca vendas por id", () => {
  describe("quando não existe venda com o id informado", () => {
    before(async () => {
      sinon.stub(SalesModel, "getById").resolves();
    });

    after(async () => {
      SalesModel.getById.restore();
    });

    it("retorna undefined", async () => {
      const response = await SalesService.getById();
      expect(response).to.be.undefined;
    });
  });

  describe("quando existe venda com o id informado", () => {
    before(() => {
      sinon.stub(SalesModel, "getById").resolves([
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
      SalesModel.getById.restore();
    });

    it("retorna um array", async () => {
      const response = await SalesModel.getById(1);
      expect(response).to.be.an("array");
    });

    it("O array não está vazio", async () => {
      const response = await SalesModel.getById(1);
      expect(response).to.be.not.empty;
    });

    it("É um array de objetos", async () => {
      const response = await SalesModel.getById(1);
      expect(response[0]).to.be.an("object");
    });

    it("Objeto possui chaves date, productId e quantity", async () => {
      const response = await SalesModel.getById(1);
      expect(response[0]).to.include.all.keys("date", "productId", "quantity");
    });
  });
});
