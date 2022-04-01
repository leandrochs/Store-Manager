const sinon = require("sinon");
const { expect } = require("chai");

const ProductsService = require("../../../services/productsService");
const ProductsController = require("../../../controllers/productsController");

describe("(Camada Controller de products - Produtos)", () => {
  describe("Quando busca todos os produtos", () => {
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

  describe("Quando busca produtos por id", () => {
    describe("E não existe um produto com o id informado", async () => {
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

  describe("Quando cadastra um novo produto", () => {
    describe("Quando 'name' possui menos que 5 caracteres ", async () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = {
          name: "prod",
          quantity: 100,
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductsService, "create").resolves({
          error: 422,
          message: '"name" length must be at least 5 characters long',
        });
      });

      after(() => {
        ProductsService.create.restore();
      });

      it('é chamado o método "status" passando 422', async () => {
        await ProductsController.create(request, response);
        expect(response.status.calledWith(422)).to.be.true;
      });

      it('é chamado o método "json" passando a mensagem name length must be at least 5 characters long', async () => {
        await ProductsController.create(request, response);
        expect(
          response.json.calledWith({
            message: '"name" length must be at least 5 characters long',
          })
        ).to.be.true;
      });
    });

    describe("Quando a requisição é feita sem o atributo name", async () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = {
          quantity: 100,
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductsService, "create").resolves({
          error: 400,
          message: '"name" is required',
        });
      });

      after(() => {
        ProductsService.create.restore();
      });

      it('é chamado o método "status" passando 400', async () => {
        await ProductsController.create(request, response);
        expect(response.status.calledWith(400)).to.be.true;
      });

      it('é chamado o método "json" passando a mensagem name is required', async () => {
        await ProductsController.create(request, response);
        expect(
          response.json.calledWith({
            message: '"name" is required',
          })
        ).to.be.true;
      });
    });

    describe("Quando a requisição é feita sem o atributo quantity", async () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = {
          name: "produto",
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductsService, "create").resolves({
          error: 400,
          message: '"quantity" is required',
        });
      });

      after(() => {
        ProductsService.create.restore();
      });

      it('é chamado o método "status" passando 400', async () => {
        await ProductsController.create(request, response);
        expect(response.status.calledWith(400)).to.be.true;
      });

      it('é chamado o método "json" passando a mensagem name is required', async () => {
        await ProductsController.create(request, response);
        expect(
          response.json.calledWith({
            message: '"quantity" is required',
          })
        ).to.be.true;
      });
    });

    describe("Quando a requisição é feita com o quantity menor ou igual a 0", async () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = {
          name: "produto",
          quantity: 0,
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductsService, "create").resolves({
          error: 422,
          message: '"quantity" must be greater than or equal to 1',
        });
      });

      after(() => {
        ProductsService.create.restore();
      });

      it('é chamado o método "status" passando 422', async () => {
        await ProductsController.create(request, response);
        expect(response.status.calledWith(422)).to.be.true;
      });

      it('é chamado o método "json" passando a mensagem name is required', async () => {
        await ProductsController.create(request, response);
        expect(
          response.json.calledWith({
            message: '"quantity" must be greater than or equal to 1',
          })
        ).to.be.true;
      });
    });

  });
});
