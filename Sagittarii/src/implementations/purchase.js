const PurchaseModel = require('../schemas/Purchase');

module.exports = {
  getPurchaseById: async (call, callback) => {
    console.log(call.request);
    const { id } = call.request;
    const purchase = await PurchaseModel.findById({ _id: id });
    callback(null, { purchase });
  },

  listPurchases: async (call, callback) => {
    const purchases = await PurchaseModel.find({});

    callback(null, {
      purchases: purchases.map((purchase) => {
        return {
          id: purchase._id.toString(),
          userId: purchase.userId,
          title: purchase.title,
          value: purchase.value,
        };
      }),
    });
  },

  createPurchase: async (call, callback) => {
    const { purchase } = call.request;

    delete purchase.id;

    const newPurchase = await PurchaseModel.create(purchase);

    callback(null, {
      purchase: { id: newPurchase._id, ...newPurchase.toObject() },
    });
  },
};
