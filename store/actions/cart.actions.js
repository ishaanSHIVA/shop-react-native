export const ADD_TO_CART = "add-to-cart";

export const addToCart = (product) => {
  return { type: ADD_TO_CART, product: product };
};
