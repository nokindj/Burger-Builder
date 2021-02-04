import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = { ingredients: null, price: 0 };
  mySetState = (ingredients, price) => {
    this.setState({ ingredients: ingredients, totalPrice: price });
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      // ["salad", "1"]
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.mySetState(ingredients, price);
  }

  checkoutCancelledHandler = () => {
    // console.log(this.props);
    this.props.history.goBack(); // goes back to the last page
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data"); // goes to "/checkout/contact-data"
  };

  render() {
    return (
      <div>
        {this.state.ingredients && (
          <div>
            <CheckoutSummary
              ingredients={this.state.ingredients}
              checkoutCancelled={this.checkoutCancelledHandler}
              checkoutContinued={this.checkoutContinuedHandler}
            />
            <Route
              path={this.props.match.path + "/contact-data"}
              render={(props) => (
                <ContactData
                  ingredients={this.state.ingredients}
                  price={this.state.totalPrice}
                  {...props}
                />
              )}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Checkout;
