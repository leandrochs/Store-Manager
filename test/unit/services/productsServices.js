const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");

const ProductsService = require("../../../services/productsService");
const ProductsModel = require("../../../models/productsModel");

describe("Produtos - (Camada Service) Quando busca todos os produtos", () => {
  before(() => {
    sinon.stub(ProductsModel, "getAllProducts").resolves([
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
    ]);
  });

  after(() => {
    ProductsModel.getAllProducts.restore();
  });

  it("retorna um array", async () => {
    const response = await ProductsService.getAllProducts();
    expect(response).to.be.an("array");
  });

  it("O array não está vazio", async () => {
    const response = await ProductsService.getAllProducts();
    expect(response).to.be.not.empty;
  });

  it("É um array de objetos", async () => {
    const response = await ProductsService.getAllProducts();
    expect(response[0]).to.be.an("object");
  });

  it("Objeto possui chaves id, name e quantity", async () => {
    const response = await ProductsService.getAllProducts();
    expect(response[0]).to.include.all.keys("id", "name", "quantity");
  });
});

describe("Produtos - (Camada Service) Quando busca produtos por id", () => {
  describe("quando não existe um produto com o id informado", () => {
    before(async () => {
      sinon.stub(ProductsModel, "getById").resolves();
    });

    after(async () => {
      ProductsModel.getById.restore();
    });

    it("retorna undefined", async () => {
      const response = await ProductsService.getById();
      expect(response).to.be.undefined;
    });
  });

  describe("quando existe um produto com o id informado", () => {
    before(() => {
      sinon.stub(ProductsModel, "getById").resolves({
        id: 1,
        name: "Martelo de Thor",
        quantity: 10,
      });
    });

    after(() => {
      ProductsModel.getById.restore();
    });

    it("retorna um objeto", async () => {
      const response = await ProductsService.getById(1);
      expect(response).to.be.an("object");
    });

    it("O objeto não está vazio", async () => {
      const response = await ProductsService.getById(1);
      expect(response).to.be.not.empty;
    });

    it("Objeto possui chaves id, name e quantity", async () => {
      const response = await ProductsService.getById(1);
      expect(response).to.include.all.keys("id", "name", "quantity");
    });
  });
});
