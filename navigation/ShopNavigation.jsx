import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import React from "react";

import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductOverview: {
      screen: ProductOverviewScreen,
      // navigationOptions: {
      //   headerTitle: "All Products",
      // },
    },
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const OrderNavigator = createStackNavigator(
  {
    Orders: OrderScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "ios" ? "ios-list" : "md-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);
const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "ios" ? "ios-create" : "md-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Order: OrderNavigator,
    Admin: AdminNavigator,
  },
  {
    drawerPosition: "right",
    contentOptions: {
      activeTintColor: "#e91e63",
      itemsContainerStyle: {
        paddingVertical: 20,
        fontSize: 25,
      },
    },
  }
);

export default createAppContainer(ShopNavigator);
