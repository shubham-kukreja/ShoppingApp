import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://reactnative-e8f5b.firebaseio.com/products.json"
    );
    const res = await response.json();
    const loadedProducts = [];
    for (const key in res) {
      loadedProducts.push(
        new Product(
          key,
          "u1",
          res[key].title,
          res[key].imageUrl,
          res[key].description,
          res[key].price
        )
      );
    }
    dispatch({
      type: SET_PRODUCTS,
      products: loadedProducts,
    });
  };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  return (dispatch) => {
    fetch("https://reactnative-e8f5b.firebaseio.com/products.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        title,
        description,
        imageUrl,
        price,
      },
    });
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
