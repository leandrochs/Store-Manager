const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../models/connection");

const ProductsService = require("../../../services/productsService");
const ProductsModel = require("../../../models/productsModel");

describe("(Camada Service de products - Produtos)", () => {
  describe("Quando busca todos os produtos", () => {
    before(async () => {
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

    after(async () => {
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

  describe("Quando busca produtos por id", () => {
    describe("Quando não existe um produto com o id informado", () => {
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

    describe("Quando existe um produto com o id informado", () => {
      before(async () => {
        sinon.stub(ProductsModel, "getById").resolves({
          id: 1,
          name: "Martelo de Thor",
          quantity: 10,
        });
      });

      after(async () => {
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

  describe("Quando cadastra um produto", () => {
    describe("Quando a requisição é feita com o atributo name igual um já cadastrado", () => {
      before(async () => {
        sinon.stub(ProductsModel, "getByName").resolves({
          id: 1,
          name: "Martelo de Thor",
          quantity: 10,
        });
      });

      after(async () => {
        ProductsModel.getByName.restore();
      });

      it("retorna um objeto com as chaves 'error' e 'message'", async () => {
        const response = await ProductsService.create({
          name: "Martelo de Thor",
          quantity: 10,
        });
        expect(response).to.include.all.keys("error", "message");
      });
    });

    describe("Quando o cadastro é realizado", () => {
      before(async () => {
        sinon.stub(ProductsModel, "create").resolves({
          id: 1,
          name: "Novo Produto",
          quantity: 10,
        });
      });

      after(async () => {
        ProductsModel.create.restore();
      });

      it("retorna um objeto", async () => {
        const response = await ProductsService.create({
          name: "Novo Produto",
          quantity: 10,
        });
        expect(response).to.be.an("object");
      });

      it("O objeto não está vazio", async () => {
        const response = await ProductsService.create({
          name: "Novo Produto",
          quantity: 10,
        });
        expect(response).to.be.not.empty;
      });

      it("Objeto possui chaves id, name e quantity", async () => {
        const response = await ProductsService.create({
          name: "Novo Produto",
          quantity: 10,
        });
        expect(response).to.include.all.keys("id", "name", "quantity");
      });
    });
  });

  describe("Quando atualiza um produto", () => {
    describe("Quando o id não existe", () => {
      const id = 9999;
      const name = "Martelo de Thor";
      const quantity = 100;

      before(async () => {
        sinon.stub(ProductsModel, "getById").resolves(null);
      });

      after(async () => {
        ProductsModel.getById.restore();
      });

      it("retorna undefined", async () => {
        const response = await ProductsService.update(id, name, quantity);
        expect(response).to.include.all.keys("error", "message");
      });
    });

    describe("Quando a atualizacao é realizada", () => {
      const id = 1;
      const name = "Martelo de Thor";
      const quantity = 100;

      before(async () => {
        sinon.stub(ProductsModel, "update").resolves({
          id: "1",
          name: "Martelo de Thor",
          quantity: 100,
        });
      });

      after(async () => {
        ProductsModel.update.restore();
      });

      it("retorna um objeto", async () => {
        const response = await ProductsService.update(id, name, quantity);
        expect(response).to.be.an("object");
      });

      it("O objeto não está vazio", async () => {
        const response = await ProductsService.update(id, name, quantity);
        expect(response).to.be.not.empty;
      });

      it("Objeto possui chaves id, name e quantity", async () => {
        const response = await ProductsService.update(id, name, quantity);
        expect(response).to.include.all.keys("id", "name", "quantity");
      });
    });
  });

  describe("Quando deleta um produto", async () => {
    describe("Quando o id do produto não existe", async () => {
      const id = 9999;

      before(async () => {
        sinon.stub(ProductsModel, "getById").resolves(null);
      });

      after(async () => {
        ProductsModel.getById.restore();
      });

      it("retorna propriedades 'error' e 'message'", async () => {
        const response = await ProductsService.deleteById(id);
        expect(response).to.include.all.keys("error", "message");
      });
    });

    describe("Quando o produto é deletado", async () => {
      const id = 1;

      before(async () => {
        sinon
          .stub(ProductsModel, "getById")
          .resolves({ id: 1, name: "Martelo de Thor", quantity: 10 });
      });

      after(async () => {
        ProductsModel.getById.restore();
      });

      it("retorna um objeto", async () => {
        const response = await ProductsService.deleteById(1);
        expect(response).to.be.an("array");
      });

      it("O objeto não está vazio", async () => {
        const response = await ProductsService.deleteById(1);
        expect(response).to.be.not.empty;
      });

      it("Objeto possui chaves id, name e quantity", async () => {
        const response = await ProductsService.deleteById(1);
        expect(...response).to.include.all.keys("idDeleted");
      });
    });
  });
});
