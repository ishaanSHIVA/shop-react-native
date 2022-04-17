import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart.actions";
import { ADD_ORDER } from "../actions/orders.actions";

import CartItem from "../../models/cart-item";
import { DELETE_PRODUCT } from "../actions/products.action";

const initialState = {
  items: {},
  sum: 0,
};

export default addToCart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return initialState;
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      let newOrUpdatedCartItem;

      if (state.items[addedProduct.id]) {
        const updateCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id] + productPrice
        );
        newOrUpdatedCartItem = updateCartItem;
      } else {
        const newCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
        newOrUpdatedCartItem = newCartItem;
      }

      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.id]: newOrUpdatedCartItem,
        },
        sum: state.sum + productPrice,
      };
    case DELETE_PRODUCT:
      const id = action.id;
      if (!state.items[id]) return state;
      const updatedItems = { ...state };
      delete updatedItems.items[id];
      return {
        ...state,
        items: updatedItems,
        sum: state.sum - state.items[id].sum,
      };
    case REMOVE_FROM_CART:
      const selectedProduct = state.items[action.id];
      const currentQuantity = state.items[action.id].quantity;

      let updatedItem;
      if (currentQuantity > 1) {
        updatedItem = new CartItem(
          selectedProduct.quantity - 1,
          selectedProduct.productPrice,
          selectedProduct.productTitle,
          selectedProduct.sum - selectedProduct.productPrice
        );
      } else {
        updatedItem = { ...state.items };
        delete updatedItem[action.id];
      }
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: updatedItem,
        },
        sum: state.sum - selectedProduct.productPrice,
      };
  }

  return state;
};
