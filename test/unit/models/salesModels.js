const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../../models/connection");
const SalesModels = require("../../../models/salesModels");

describe("(Camada Model de sales - Vendas)", () => {
  describe("Quando busca todas as vendas", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([
        [
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
        ],
      ]);
    });

    after(() => {
      connection.execute.restore();
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

  describe("Quando busca vendas por id", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([
        [
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
        ],
      ]);
    });

    after(() => {
      connection.execute.restore();
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

  describe("Quando o cadastra uma venda", () => {
    const payloadSale = [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    before(async () => {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it("retorna um objeto", async () => {
      const response = await SalesModels.create(payloadSale);
      expect(response).to.be.an("object");
    });

    it("O objeto não está vazio", async () => {
      const response = await SalesModels.create(payloadSale);
      expect(response).to.be.not.empty;
    });

    it("Objeto possui chaves id, name e quantity", async () => {
      const response = await SalesModels.create(payloadSale);
      expect(response).to.include.all.keys("id", "itemsSold");
    });
  });

  describe("Quando uma venda é atualizada", () => {
    const payloadSale = [
      {
        productId: 1,
        quantity: 6,
      },
    ];

    before(async () => {
      sinon.stub(connection, "execute").resolves([[]]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it("retorna um objeto", async () => {
      const response = await SalesModels.update(payloadSale);
      expect(response).to.be.an("object");
    });

    it("O objeto não está vazio", async () => {
      const response = await SalesModels.update(payloadSale);
      expect(response).to.be.not.empty;
    });

    it("Objeto possui chaves id, name e quantity", async () => {
      const response = await SalesModels.update(payloadSale);
      expect(response).to.include.all.keys("saleId", "itemUpdated");
    });
  });
});
