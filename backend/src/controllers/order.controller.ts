export const createOrder = (request, response) => {
  response.send("food-order/ Post huselt irlee");
};

export const getAllOrders = (request, response) => {
  response.send("food-order/ Get huselt irlee");
};

export const getOrdersByUserId = (request, response) => {
  response.send("food-order/:userId Get huselt irlee");
};

export const updateOrder = (request, response) => {
  response.send("food-order/:orderId Patch huselt irlee");
};
