import { ADD_TO_CART } from "../actions/cart.actions";

import CartItem from "../../models/cart-item";

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
      };
  }

  return state;
};
