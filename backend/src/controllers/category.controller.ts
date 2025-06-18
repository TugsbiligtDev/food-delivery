export const getAllCategories = (request, response) => {
  response.send("food-category/ Get huselt irlee");
};

export const createCategory = (request, response) => {
  response.send("food-category/ Post huselt irlee");
};

export const updateCategory = (request, response) => {
  response.send("food-category/:categoryId Patch huselt irlee");
};

export const deleteCategory = (request, response) => {
  response.send("food-category/:categoryId Delete huselt irlee");
};
