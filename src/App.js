import React, { Component } from "react";
import axios from "axios";
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";



class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      cartBounce: false,
      word: "",
      category: "",
      quickViewProduct: {},
      totalItems: 0,
      totalAmount: 0,
      quantity: 1,
    };
  }
  // Fetch data from external API using axios
  getProducts() {
    let url =
      "https://my-json-server.typicode.com/anupamchap/React-shoppingcart/data"
    axios.get(url).then(response => {
      this.setState({
        products: [...response.data]
      });
    });
  }
  //remove product
  handleRemoveProduct = (id, e) => {
    let cart = this.state.cart;
    let index = cart.findIndex(x => x.id == id);
    cart.splice(index, 1);
    this.setState({
      cart: cart
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    e.preventDefault();
  }
  //check product
  checkProduct = (productID) => {
    let cart = this.state.cart;
    return cart.some(function (item) {
      return item.id === productID;
    });
  }
  //call api when the component will mount
  componentWillMount() {
    this.getProducts();
  }

//total items
  sumTotalItems = () => {
    let total = 0;
    let cart = this.state.cart;
    total = cart.length;
    this.setState({
      totalItems: total
    });
  }
//total amount
  sumTotalAmount = () => {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity);
    }
    this.setState({
      totalAmount: total
    });
  }

  
  // On Add to Cart
  handleAddToCart = (selectedProducts) => {
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    let productQty = selectedProducts.quantity;
    if (this.checkProduct(productID)) {
      let index = cartItem.findIndex(x => x.id == productID);
      cartItem[index].quantity =
        Number(cartItem[index].quantity) + Number(productQty);
      this.setState({
        cart: cartItem
      });
    } else {
      cartItem.push(selectedProducts);
    }
    this.setState({
      cart: cartItem,
      cartBounce: true
    });
    setTimeout(
      function () {
        this.setState({
          cartBounce: false,
          quantity: 1
        });
        console.log(this.state.quantity);
        console.log(this.state.cart);
      }.bind(this),
      1000
    );
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }

  // Do the search based on Keyword
  handleSearch = (event) => {
    this.setState({ word: event.target.value });
  }
  // Search Reset Mobile
  handleMobileSearch = () => {
    this.setState({ word: "" });
  }
  //Reset the Quantity
  updateQuantity = (qty) => {
    console.log("quantity hass been added...");
    this.setState({
      quantity: qty
    });
  }
  // filter on basis of category
  handleCategory = (event) => {
    this.setState({ category: event.target.value });
    console.log(this.state.category);
  }

  render() {
    return (
      <div className="container">
        <Header
          cartBounce={this.state.cartBounce}
          total={this.state.totalAmount}
          totalItems={this.state.totalItems}
          cartItems={this.state.cart}
          removeProduct={this.handleRemoveProduct}
          handleSearch={this.handleSearch}
          handleMobileSearch={this.handleMobileSearch}
          handleCategory={this.handleCategory}
          categoryWord={this.state.category}
          updateQuantity={this.updateQuantity}
          productQuantity={this.state.moq}
        />
        <Products
          productsList={this.state.products}
          searchWord={this.state.word}
          addToCart={this.handleAddToCart}
          productQuantity={this.state.quantity}
          updateQuantity={this.updateQuantity}
        />
        <Footer />

      </div>
    );
  }
}

export default App;
