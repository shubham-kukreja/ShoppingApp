import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cartItem";
import { ADD_ORDER } from "../actions/orders";

const initailState = {
  items: {},
  totalAmount: 0,
};

export default (state = initailState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      if (state.items[addedProduct.id]) {
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      }
    case REMOVE_FROM_CART:
      const currentQty = state.items[action.pid].quantity;
      const selectedCartItem = state.items[action.pid];
      if (currentQty > 1) {
        let updatedCartItems = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.prodPrice,
          selectedCartItem.prodTitle,
          selectedCartItem.sum - selectedCartItem.prodPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItems };
        return {
          ...state,
          items: updatedCartItems,
          totalAmount: state.totalAmount - selectedCartItem.prodPrice,
        };
      } else {
        let updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
        return {
          ...state,
          items: updatedCartItems,
          totalAmount: state.totalAmount - selectedCartItem.prodPrice,
        };
      }
      case ADD_ORDER :
        return initailState;
    default:
      return state;
  }
};
