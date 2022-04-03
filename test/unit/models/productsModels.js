const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../../models/connection");
const ProductsModels = require("../../../models/productsModel");

describe("(Camada Model de products - Produtos)", () => {
  describe("Quando busca todos os produtos", () => {
    before(async () => {
      sinon.stub(connection, "execute").resolves([
        [
          { id: 1, name: "Martelo de Thor", quantity: 10 },
          { id: 2, name: "Traje de encolhimento", quantity: 20 },
          { id: 3, name: "Escudo do Capitão América", quantity: 30 },
        ],
      ]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it("retorna um array", async () => {
      const response = await ProductsModels.getAllProducts();
      expect(response).to.be.an("array");
    });

    it("O array não está vazio", async () => {
      const response = await ProductsModels.getAllProducts();
      expect(response).to.be.not.empty;
    });

    it("É um array de objetos", async () => {
      const response = await ProductsModels.getAllProducts();
      expect(response[0]).to.be.an("object");
    });

    it("Objeto possui chaves id, name e quantity", async () => {
      const response = await ProductsModels.getAllProducts();
      expect(response[0]).to.include.all.keys("id", "name", "quantity");
    });
  });

  describe("Quando busca produtos por id", () => {
    before(async () => {
      sinon.stub(connection, "execute").resolves([
        [
          {
            id: 1,
            name: "Martelo de Thor",
            quantity: 10,
          },
        ],
      ]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it("retorna um objeto", async () => {
      const response = await ProductsModels.getById(1);
      expect(response).to.be.an("object");
    });

    it("O objeto não está vazio", async () => {
      const response = await ProductsModels.getById(1);
      expect(response).to.be.not.empty;
    });

    it("Objeto possui chaves id, name e quantity", async () => {
      const response = await ProductsModels.getById(1);
      expect(response).to.include.all.keys("id", "name", "quantity");
    });
  });

  describe("Quando o cadastra um produto", () => {
    const payloadProduct = {
      name: "Novo Produto",
      quantity: 10,
    };

    before(async () => {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it("retorna um objeto", async () => {
      const response = await ProductsModels.create(payloadProduct);
      expect(response).to.be.an("object");
    });

    it("O objeto não está vazio", async () => {
      const response = await ProductsModels.create(payloadProduct);
      expect(response).to.be.not.empty;
    });

    it("Objeto possui chaves id, name e quantity", async () => {
      const response = await ProductsModels.create(payloadProduct);
      expect(response).to.include.all.keys("id", "name", "quantity");
    });
  });

  describe("Quando a função getByName é chamada", () => {
    before(async () => {
      sinon.stub(connection, "execute").resolves([
        [
          {
            id: 1,
            name: "Martelo de Thor",
            quantity: 10,
          },
        ],
      ]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it("retorna um objeto", async () => {
      const response = await ProductsModels.getByName("Martelo de Thor");
      expect(response).to.be.an("object");
    });

    it("O objeto não está vazio", async () => {
      const response = await ProductsModels.getByName("Martelo de Thor");
      expect(response).to.be.not.empty;
    });

    it("Objeto possui chaves id, name e quantity", async () => {
      const response = await ProductsModels.getByName("Martelo de Thor");
      expect(response).to.include.all.keys("id", "name", "quantity");
    });
  });
});
