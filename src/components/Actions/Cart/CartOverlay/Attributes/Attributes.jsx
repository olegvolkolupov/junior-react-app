import React, { Component } from "react";

import styles from "./Attributes.module.css";

export default class Attributes extends Component {
  render() {
    const { attribute, selectedAttributes } = this.props;
    const { name, type, items } = attribute;

    const isItemTextType = type === "text";
    const itemsContainerStyle = isItemTextType
      ? styles.textContainer
      : styles.swatchContainer;
    const itemStyle = isItemTextType
      ? styles.textBox
      : styles.swatchBox;
    const selectedItemStyle = isItemTextType
      ? styles.textBox + " " + styles.selectedTextBox
      : styles.swatchBox + " " + styles.selectedSwatchBox;

    return (
      <div className={styles.container}>
        <div className={styles.name}>{name}:</div>

        <div className={itemsContainerStyle}>
          {items &&
            items.map(({ id, value }) => (
              <div
                key={id}
                className={
                  id === selectedAttributes[attribute.id] ? selectedItemStyle : itemStyle
                }
              >
                {isItemTextType ? (
                  value
                ) : (
                  <div
                    style={{ background: value, width: "20px", height: "20px" }}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }
}
