import React, { Component } from "react";
import CartScrollBar from "./CartScrollBar";
import EmptyCart from "../empty-states/EmptyCart";
import { CSSTransition } from 'react-transition-group';
import { findDOMNode } from "react-dom";
import cart from '../images/cart.png';
import '../css/components/header.css'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      cart: this.props.cartItems,
      mobileSearch: false
    };
  }


  handleClickOutside(event) {
    const cartNode = findDOMNode(this.refs.cartPreview);
    if (cartNode.classList.contains("active")) {
      if (!cartNode || !cartNode.contains(event.target)) {
        this.setState({
          showCart: false
        });
        event.stopPropagation();
      }
    }
  }


  componentDidMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }


  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  handleCart(e) {
    e.preventDefault();
    this.setState({
      showCart: !this.state.showCart
    });
  }


  handleSubmit(e) {
    e.preventDefault();
  }


  handleMobileSearch(e) {
    e.preventDefault();
    this.setState({
      mobileSearch: true
    });
  }


  handleSearchNav(e) {
    e.preventDefault();
    this.setState(
      {
        mobileSearch: false
      },
      function () {
        this.refs.searchBox.value = "";
        this.props.handleMobileSearch();
      }
    );
  }


  render() {
    let cartItems;
    cartItems = this.state.cart.map(product => {
      return (
        <li className="cart-item" key={product.name}>
          <img className="product-image" src={product.image} alt="product" />
          <div className="product-info">
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
          </div>
          <div className="product-total">
            <p className="quantity">
              {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
            </p>
            <p className="amount">{product.quantity * product.price}</p>
          </div>
          <button
            className="product-remove"
            onClick={this.props.removeProduct.bind(this, product.id)}
          >
            X
          </button>
        </li>
      );
    });
    let view;
    if (cartItems.length <= 0) {
      view = <EmptyCart />;
    } else {
      view = (
        <CSSTransition
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component="ul"
          className="cart-items"
        >
          <div key={cartItems.id}>
            {cartItems}
          </div>
        </CSSTransition>
      );
    }
    return (
      <header>
        <div className="container">
          <h1>FruitMart</h1>
          <div className="search">
            <button
              className="mobile-search"
              onClick={this.handleMobileSearch.bind(this)}
            >
            </button>
            <form
              action="#"
              method="get"
              className={
                this.state.mobileSearch ? "search-form active" : "search-form"
              }
            >
              <button
                className="back-button"
                onClick={this.handleSearchNav.bind(this)}
              >
              </button>
              <input
                type="search"
                ref="searchBox"
                placeholder="Search for Fruits"
                className="search-keyword"
                onChange={this.props.handleSearch}
              />
              <button
                className="search-button"
                type="submit"
                onClick={this.handleSubmit.bind(this)}
              >Search</button>
            </form>
          </div>

          <div className="cart">
            <div className="cart-info">
              <table>
                <tbody>
                  <tr>
                    <td>No. of items</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.totalItems}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Sub Total</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.total}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              className="cart-icon"
              onClick={this.handleCart.bind(this)}
              ref="cartButton"
            >
              <img width="30" height="30"
                className={this.props.cartBounce ? "tada" : " "}
                src={cart}
                alt="Cart"
              />
              {this.props.totalItems ? (
                <span className="cart-count">{this.props.totalItems}</span>
              ) : (
                  ""
                )}
            </button>
            <div
              className={
                this.state.showCart ? "cart-preview active" : "cart-preview"
              }
              ref="cartPreview"
            >
              <CartScrollBar>{view}</CartScrollBar>
              <div className="action-block">
                <button
                  type="button"
                  className={this.state.cart.length > 0 ? " " : "disabled"}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
