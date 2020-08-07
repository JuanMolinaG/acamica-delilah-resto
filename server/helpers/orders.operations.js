const { getUserBy } = require('./users.querys');

const buildOrdersResponse = (ordersData) => {
  const ordersObj = async () => {
    return Promise.all(
      ordersData.map(async (order) => {
        const orderItem = {};
        orderItem.status = order.status;
        orderItem.time = order.updatedAt;
        orderItem.id = order.id;
        orderItem.description = order.description;
        orderItem.paymentMethodId = order.paymentMethodId;
        orderItem.productsValue = order.order_products.map((product) => {
          return product.productQuantity * product.product.price;
        });
        orderItem.Total = orderItem.productsValue.reduce((acc, curVal) => {
          return acc + curVal;
        });
        delete orderItem.productsValue;
        const user = await getUserBy('id', order.userId);
        orderItem.buyerName = user.fullname;
        orderItem.buyerAddress = user.address;
        return orderItem;
      })
    );
  };
  return ordersObj().then((data) => {
    return data;
  });
};

module.exports = { buildOrdersResponse };
