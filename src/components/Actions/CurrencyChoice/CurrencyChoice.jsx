import React, { Component } from "react";
import { connect } from "react-redux";

import CurrencyItem from "./CurrencyItem";
import Backdrop from "./Backdrop";

import { setCurrencyId } from "../../../services/redux/actions/currencyActions";
import { setCurrencySymbol } from "../../../services/redux/actions/currencyActions";

import downArrow from "../../icons/arrow-down.svg";
import upArrow from "../../icons/arrow-up.svg";

import styles from "./CurrencyChoice.module.css";

class CurrencyChoice extends Component {
  state = {
    isCurrencyChoiceVisible: false,
  };

  toggleCurrencyChoiceVisibility = () => {
    this.setState({
      isCurrencyChoiceVisible: !this.state.isCurrencyChoiceVisible,
    });
  };

  changeCurrency = (event) => {
    this.toggleCurrencyChoiceVisibility();
    
    let currencyId = event.target.dataset.index;
    let currencySymbol = event.target.textContent.split(" ")[0];
    this.props.setCurrencyId(currencyId);
    this.props.setCurrencySymbol(currencySymbol);

    localStorage.setItem("currencyId", JSON.stringify(currencyId));
    localStorage.setItem("currencySymbol", JSON.stringify(currencySymbol));
  };

  onMouseOver = (event) => {
    if (event.target.nodeName === "LI") {
      event.target.classList.add("active-currency-item");
    }
  };

  onMouseOut = (event) => {
    if (event.target.nodeName === "LI") {
      event.target.classList.remove("active-currency-item");
    }
  };

  render() {
    const { isCurrencyChoiceVisible } = this.state;
    const { currency, currentCurrencySymbol } = this.props;
    return (
      <div className={styles.container}>
        <button
          className={styles.selectCurrencyButton}
          type="button"
          onClick={this.toggleCurrencyChoiceVisibility}
        >
          <div className={styles.currencyBtnNameContainer}>
            <span className={styles.currencyButtonName}>
              {currentCurrencySymbol}
            </span>
            <span>
              {isCurrencyChoiceVisible ? (
                <img src={upArrow} />
              ) : (
                <img src={downArrow} />
              )}
            </span>
          </div>
        </button>
        {isCurrencyChoiceVisible && (
          <>
            <Backdrop
              onBackdropClick={this.toggleCurrencyChoiceVisibility}
            />
            <div className={styles.currencyModal}>
              <ul
                className={styles.currenciesList}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
              >
                {currency.map((item, idx) => (
                  <CurrencyItem
                    key={item.label}
                    index={idx}
                    currency={item}
                    onCurrencyItemClick={this.changeCurrency}
                  />
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    currency: state.currency,
    currentCurrencySymbol: state.currencySymbol,
  };
};

let mapDispatchToProps = {
  setCurrencyId: setCurrencyId,
  setCurrencySymbol: setCurrencySymbol,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyChoice);
