import PRODUCTS from "../../data/dummyData";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

// console.log(initialState.availableProducts);

export default (state = initialState, action) => {
  return state;
};
