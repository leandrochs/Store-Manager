const sinon = require("sinon");
const { expect } = require("chai");

const SalesModels = require("../../../models/salesModels");

describe("Vendas - (Camada Model) Quando busca todas as vendas", () => {
  before(() => {
    sinon.stub(SalesModels, "getAllSales").resolves([
      {
        saleId: 1,
        date: "2022-03-31T01:33:34.000Z",
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: "2022-03-31T01:33:34.000Z",
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: "2022-03-31T01:33:34.000Z",
        productId: 3,
        quantity: 15,
      },
    ]);
  });

  after(() => {
    SalesModels.getAllSales.restore();
  });

  it("retorna um array", async () => {
    const response = await SalesModels.getAllSales();
    expect(response).to.be.an("array");
  });

  it("O array não está vazio", async () => {
    const response = await SalesModels.getAllSales();
    expect(response).to.be.not.empty;
  });

  it("É um array de objetos", async () => {
    const response = await SalesModels.getAllSales();
    expect(response[0]).to.be.an("object");
  });

  it("Objeto possui chaves saleId, date, productId e quantity", async () => {
    const response = await SalesModels.getAllSales();
    expect(response[0]).to.include.all.keys(
      "saleId",
      "date",
      "productId",
      "quantity"
    );
  });
});

describe("Vendas - (Camada Model) Quando busca vendas por id", () => {
  before(() => {
    sinon.stub(SalesModels, "getById").resolves([
      {
        date: "2022-03-31T01:33:34.000Z",
        productId: 1,
        quantity: 5,
      },
      {
        date: "2022-03-31T01:33:34.000Z",
        productId: 2,
        quantity: 10,
      },
    ]);
  });

  after(() => {
    SalesModels.getById.restore();
  });

  it("retorna um array", async () => {
    const response = await SalesModels.getById(1);
    expect(response).to.be.an("array");
  });

  it("O array não está vazio", async () => {
    const response = await SalesModels.getById(1);
    expect(response).to.be.not.empty;
  });

  it("É um array de objetos", async () => {
    const response = await SalesModels.getById(1);
    expect(response[0]).to.be.an("object");
  });

  it("Objeto possui chaves date, productId e quantity", async () => {
    const response = await SalesModels.getById(1);
    expect(response[0]).to.include.all.keys("date", "productId", "quantity");
  });
});
