import React, { Component } from "react";
import PropTypes from "prop-types";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.productQuantity };

  }



  resetQuantity() {
    this.setState({
      value: 1
    });
  }

  decrement = (e) => {
    e.preventDefault();
    if (this.state.value <= 1) {
      return this.state.value;
    } else {
      this.setState(
        prevState => ({
          value: Number(prevState.value) - 1
        }),
        function () {
          this.props.updateQuantity(this.state.value);
        }
      );
    }
  }
  increment = (e) => {
    this.setState(
      prevState => ({
        value: Number(prevState.value) + 1
      }),
      function () {
        this.props.updateQuantity(this.state.value);
      }
    );
    e.preventDefault();
  }
  feed(e) {
    this.setState(
      {
        value: this.refs.feedQty.value
      },
      function () {
        this.props.updateQuantity(this.state.value);
      }
    );
  }


  render() {
    return (
      <div className="stepper-input">
        <button className="decrement" onClick={this.decrement}>
          -
        </button>
        <input
          ref="feedQty"
          type="number"
          className="quantity"
          value={this.state.value}
          onChange={this.feed.bind(this)}
        />
        <button className="increment" onClick={this.increment}>
          +
        </button>
      </div>
    );
  }
}

Counter.propTypes = {
  value: PropTypes.number
};

export default Counter;
