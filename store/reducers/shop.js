import PRODUCTS from "../../data/dummy";

const initailState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

const productsReducer = (state = initailState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default productsReducer;