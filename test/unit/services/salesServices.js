const sinon = require("sinon");
const { expect } = require("chai");

const SalesService = require("../../../services/salesService");
const SalesModel = require("../../../models/salesModels");

describe("(Camada Service de sales - Vendas)", () => {
  describe("Quando busca todas as vendas", () => {
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

  describe("Quando busca vendas por id", () => {
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
        expect(response[0]).to.include.all.keys(
          "date",
          "productId",
          "quantity"
        );
      });
    });
  });

  describe("Quando cadastra um produto", () => {
    describe("Quando o cadastro é realizado", () => {
      before(() => {
        sinon
          .stub(SalesModel, "create")
          .resolves({ id: 3, itemsSold: [{ productId: 1, quantity: 3 }] });
      });

      after(() => {
        SalesModel.create.restore();
      });

      it("retorna um objeto", async () => {
        const response = await SalesService.create([
          { productId: 1, quantity: 3 },
        ]);
        expect(response).to.be.an("object");
      });

      it("O objeto não está vazio", async () => {
        const response = await SalesService.create([
          { productId: 1, quantity: 3 },
        ]);
        expect(response).to.be.not.empty;
      });

      it("Objeto possui chaves id, e itemsSold", async () => {
        const response = await SalesService.create([
          { productId: 1, quantity: 3 },
        ]);
        expect(response).to.include.all.keys("id", "itemsSold");
      });
    });
  });
});
