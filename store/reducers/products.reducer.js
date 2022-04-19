import PRODUCTS from "../../data/dummyData";

import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products.action";

import Product from "../../models/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

// console.log(initialState.availableProducts);

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const { title, description, price, imageUrl } = action.productData;
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        title,
        description,
        imageUrl,
        price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (p) => p.id === action.id
      );
      console.log("id ", action.id);
      const updatedItem = new Product(
        action.id,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,

        state.userProducts[productIndex].price
      );
      console.log("updatedItem: ", updatedItem);

      const updatedUserProducts = [...state.userProducts];

      const availableProductsIndex = state.availableProducts.findIndex(
        (p) => p.id === action.id
      );

      const updatedAvailableProducts = [...state.availableProducts];

      updatedAvailableProducts[availableProductsIndex] = updatedItem;

      updatedUserProducts[productIndex] = updatedItem;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        updatedProducts: updatedUserProducts,
      };

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
