import React, { Component } from "react";
import Product from "./Product";
import LoadingProducts from "../loaders/Products";
import NoResults from "../empty-states/NoResults";
import  {CSSTransition}  from 'react-transition-group';
import '../css/components/products.css'

class Products extends Component {

  render() {
    let productsData;
    let word = this.props.searchWord;


    function searchingFor(word) {
      return function(x) {
        return x.name.toLowerCase().includes(word.toLowerCase()) || !word;
      };
    }
    productsData = this.props.productsList
      .filter(searchingFor(word))
      .map(product => {
        return (
          <Product
            key={product.id}
            price={product.price}
            name={product.name}
            image={product.image}
            id={product.id}
            addToCart={this.props.addToCart}
            productQuantity={this.props.productQuantity}
            updateQuantity={this.props.updateQuantity}
            openModal={this.props.openModal}
          />
        );
      });

    // Empty and Loading States
    let view;
    if (productsData.length <= 0 && !word) {
      view = <LoadingProducts />;
    } else if (productsData.length <= 0 && word) {
      view = <NoResults />;
    } else {
      view = (
        <CSSTransition
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component="div"
          className="products"
        >
          <div key={productsData.id}>
          {productsData}
          </div>
        </CSSTransition>
      );
    }
    return <div className="products-wrapper">{view}</div>;
  }
}

export default Products;
