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
        orderItem.total = orderItem.productsValue.reduce((acc, curVal) => {
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

const buildSingleOrderResponse = async ([orderData]) => {
  const order = {};
  order.id = orderData.id;
  order.order_products = orderData.order_products;
  order.productsValue = order.order_products.map((product) => {
    return product.productQuantity * product.product.price;
  });
  order.total = order.productsValue.reduce((acc, curVal) => {
    return acc + curVal;
  });
  delete order.productsValue;
  order.status = orderData.status;
  order.paymentMethodId = orderData.paymentMethodId;
  const user = await getUserBy('id', orderData.userId);
  order.buyerAddress = user.address;
  order.buyerName = user.fullname;
  order.buyerEmail = user.email;
  order.buyerUsername = user.username;
  order.buyerPhone = user.phone;
  return order;
};

module.exports = { buildOrdersResponse, buildSingleOrderResponse };
