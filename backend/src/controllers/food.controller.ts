export const getAllFoods = (request, response) => {
  response.send("food/ Get huselt irlee");
};

export const getFoodByid = (request, response) => {
  response.send("food/:foodId Get huselt irlee");
};

export const createFood = (request, response) => {
  response.send("food/ Post huselt irlee");
};

export const updateFood = (request, response) => {
  response.send("food/:foodId Patch huselt irlee");
};

export const deleteFood = (request, response) => {
  response.send("food/:foodId Delete huselt irlee");
};
