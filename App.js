import { StyleSheet } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { useState } from "react";
import { composeWithDevTools } from "redux-devtools-extension";

// font
import AppLoading from "expo-app-loading";

import ShopNavigation from "./navigation/ShopNavigation";
import productsReducer from "./store/reducers/products.reducer";
import CartReducer from "./store/reducers/cart.reducers";

const reducers = combineReducers({
  products: productsReducer,
  cart: CartReducer,
});

const store = createStore(reducers, composeWithDevTools());

const fetchFonts = async () => {
  return await Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFondLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFondLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({});
