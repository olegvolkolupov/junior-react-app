import React, { Component } from 'react'
import { connect } from "react-redux";

import CurrencyItems from "./CurrencyItems";
import CurrencyChoiceModal from "./CurrencyChoiceModal";

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
    })
  };

  changeCurrency = (event) => {
    this.props.setCurrencyId(event.target.dataset.index);
    this.props.setCurrencySymbol(event.target.textContent.split(" ")[0]);
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
    const { currentCurrencySymbol } = this.props;
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
          <CurrencyChoiceModal
            onBackdropClick={this.toggleCurrencyChoiceVisibility}
          >
            <div className={styles.currencyModal}>
              <ul
                className={styles.currenciesList}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
              >
                <CurrencyItems
                  onCurrencyItemClick={this.changeCurrency}
                  currencyItemStyle={styles.currencyItem}
                />
              </ul>
            </div>
          </CurrencyChoiceModal>
        )}
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    currentCurrencySymbol: state.currencySymbol,
  };
};
    
let mapDispatchToProps = {
  setCurrencyId: setCurrencyId,
  setCurrencySymbol: setCurrencySymbol,
};
  
export default connect(mapStateToProps, mapDispatchToProps)(CurrencyChoice);