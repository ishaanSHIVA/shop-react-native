import PRODUCTS from "../../data/dummyData";

import { DELETE_PRODUCT } from "../actions/products.action";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

// console.log(initialState.availableProducts);

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      const id = action.id;
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.ownerId !== id
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.ownerId !== id
        ),
      };
  }
  return state;
};
