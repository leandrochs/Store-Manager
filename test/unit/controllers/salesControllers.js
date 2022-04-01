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
    describe("Quando não existe uma venda com o id informado", async () => {
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
        expect(response.json.calledWith({ message: "Sale not found" })).to.be
          .true;
      });
    });

    describe("Quando existe uma venda com o id informado", async () => {
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

  describe("Quando cadastra uma nova venda", () => {
    describe("Quando a requisição é feita sem o atributo productId", async () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = [
          {
            quantity: 2,
          },
        ];

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SalesService, "create").resolves({
          error: 400,
          message: '"productId" is required',
        });
      });

      after(() => {
        SalesService.create.restore();
      });

      it('é chamado o método "status" passando 400', async () => {
        await SalesController.create(request, response);
        expect(response.status.calledWith(400)).to.be.true;
      });

      it('é chamado o método "json" passando a mensagem productId is required', async () => {
        await SalesController.create(request, response);
        expect(
          response.json.calledWith({
            message: '"productId" is required',
          })
        ).to.be.true;
      });
    });

    describe("Quando a requisição é feita sem o atributo quantity", async () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = [
          {
            productId: 1,
          },
        ];

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SalesService, "create").resolves({
          error: 400,
          message: '"quantity" is required',
        });
      });

      after(() => {
        SalesService.create.restore();
      });

      it('é chamado o método "status" passando 400', async () => {
        await SalesController.create(request, response);
        expect(response.status.calledWith(400)).to.be.true;
      });

      it('é chamado o método "json" passando a mensagem quantity is required', async () => {
        await SalesController.create(request, response);
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
        request.body = [
          {
            productId: 1,
            quantity: 0,
          },
        ];

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SalesService, "create").resolves({
          error: 422,
          message: '"quantity" must be greater than or equal to 1',
        });
      });

      after(() => {
        SalesService.create.restore();
      });

      it('é chamado o método "status" passando 422', async () => {
        await SalesController.create(request, response);
        expect(response.status.calledWith(422)).to.be.true;
      });

      it('é chamado o método "json" passando a mensagem "quantity" must be greater than or equal to 1', async () => {
        await SalesController.create(request, response);
        expect(
          response.json.calledWith({
            message: '"quantity" must be greater than or equal to 1',
          })
        ).to.be.true;
      });
    });

    describe("Quando o cadastro é feito com sucesso", async () => {
      const response = {};
      const request = {};

      before(() => {
        request.body = [
          {
            productId: 1,
            quantity: 2,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ];

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SalesService, "create").resolves({
          id: 3,
          itemsSold: [
            {
              productId: 1,
              quantity: 2,
            },
            {
              productId: 2,
              quantity: 5,
            },
          ],
        });
      });

      after(() => {
        SalesService.create.restore();
      });

      it('é chamado o método "status" passando o código 201', async () => {
        await SalesController.create(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });

      it('é chamado o método "json" passando um objeto', async () => {
        await SalesController.create(request, response);
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });
});
