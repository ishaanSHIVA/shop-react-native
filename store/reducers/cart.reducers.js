import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart.actions";

import CartItem from "../../models/cart-item";
import { DELETE_PRODUCT } from "../actions/products.action";

const initialState = {
  items: {},
  sum: 0,
};

export default addToCart = (state = initialState, action) => {
  switch (action.type) {
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
      q;
    case DELETE_PRODUCT:
      if (!state.items[action.id]) {
        return state;
      }
      const id = action.id;
      const updatedItems = { ...state.items };
      delete updatedItems.items[id];
      return {
        ...state,
        items: updatedItems,
        sum: state.sum - state.items[id].sum,
      };
    case REMOVE_FROM_CART:
  }

  return state;
};
