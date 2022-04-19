import React from "react";
import { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, TextInput, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

// buttons
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

// action to edit
import * as productActions from "../../store/actions/products.action";

const EditProductScreen = ({ navigation }) => {
  const item = navigation.getParam("item");

  const dispatch = useDispatch();

  const [title, setTitle] = useState(item ? item.title : "");
  const [imageUrl, setImageUrl] = useState(item ? item.imageUrl : "");
  const [price, setPrice] = useState(item ? item.price.toString() : "");
  const [description, setDescription] = useState(item ? item.description : "");

  const submitHandler = useCallback(() => {
    item
      ? dispatch(
          productActions.updateProduct(item.id, title, description, imageUrl)
          // updateProduct = (id, title, description, imageUrl)
        )
      : dispatch(
          productActions.createProduct(title, description, +price, imageUrl)
        );
  }, [dispatch, description, title, imageUrl, price]);
  useEffect(() => {
    navigation.setParams({
      submit: submitHandler,
      title,
      description,
      image: imageUrl,
    });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.container}>
          <Text style={styles.text}>TITLE</Text>
          <TextInput
            value={title}
            onChangeText={(newTitle) => setTitle(newTitle)}
            style={styles.input}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>IMAGE URL</Text>
          <TextInput
            value={imageUrl}
            onChangeText={(newImage) => setImageUrl(newImage)}
            style={styles.input}
          />
        </View>
        {!item && (
          <View style={styles.container}>
            <Text style={styles.text}>PRICE</Text>
            <TextInput
              value={price}
              onChangeText={(newPrice) => setPrice(newPrice)}
              style={styles.input}
            />
          </View>
        )}
        <View style={styles.container}>
          <Text style={styles.text}>description </Text>
          <TextInput
            value={description}
            onChangeText={(newDescription) => setDescription(newDescription)}
            style={styles.input}
          />
        </View>
      </View>
    </ScrollView>
  );
};
EditProductScreen.navigationOptions = ({ navigation }) => {
  const item = navigation.getParam("item");
  const submitHandler = navigation.getParam("submit");

  return {
    headerTitle: item ? item.title : "Add New Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={Platform.OS === "ios" ? "ios-checkmark" : "md-checkmark"}
          onPress={submitHandler}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  container: {
    width: "100%",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  text: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
});

export default EditProductScreen;
