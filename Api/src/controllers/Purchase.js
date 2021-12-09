const SagittariiService = require('../services/Sagittarii');
class PurchaseController {
  async index(req, res) {
    const { id } = req.params;

    SagittariiService.listPurchases({}, (err, purchases) => {
      if (err)
        return res.status(500).json({
          message: 'Error getting pucrhases',
          error: err,
        });

      return res.json(purchases);
    });
  }

  async show(req, res) {
    const { id } = req.params;

    SagittariiService.getPurchaseById({ id }, (err, purchase) => {
      if (err)
        return res.status(500).json({
          message: 'Error getting purchase',
          error: err,
        });

      return res.json(purchase);
    });
  }

  async store(req, res) {
    const purchaseRequest = req.body;

    SagittariiService.createPurchase(
      {
        purchase: {
          userId: purchaseRequest.userId,
          title: purchaseRequest.title,
          value: purchaseRequest.valor,
        },
      },
      (err, purchase) => {
        if (err) {
          return res.status(400).json({ error: err });
        }

        return res.json(purchase);
      }
    );
  }
}

module.exports = new PurchaseController();
