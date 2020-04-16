import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const setOrder = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://reactnative-e8f5b.firebaseio.com/orders/${userId}.json`
    );
    const res = await response.json();
    const loadedOrders = [];
    for (const key in res) {
      loadedOrders.push(
        new Order(key, res[key].cartItems, res[key].totalAmount, res[key].date)
      );
    }
    dispatch({
      type: SET_ORDERS,
      orders: loadedOrders,
    });
  };
};
export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://reactnative-e8f5b.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );
    const res = await response.json();
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: res.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
