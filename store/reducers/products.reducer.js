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
      return {
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.id
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.id
        ),
      };
  }
  return state;
};
