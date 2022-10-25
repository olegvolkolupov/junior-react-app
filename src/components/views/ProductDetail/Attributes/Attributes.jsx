import React, { Component } from "react";

import styles from "./Attributes.module.css";

export default class Attributes extends Component {
  state = {
    selectedAttributeId: "",
  };

  componentDidMount() {
    this.setState({
      selectedAttributeId: this.props.attribute.items[0].id,
    });
  };

  componentDidUpdate(prevProps, prevState) { 
    let {selectedAttributeId} = this.state;
    if(selectedAttributeId !== prevState.selectedAttributeId) {
      this.props.changeSelectedAttribute(this.props.attribute.id, selectedAttributeId);
    }
  } 

  setSelectedAttributeId = (id) => {
    this.setState({
      selectedAttributeId: id,
    });
  };

  render() {
    let { selectedAttributeId } = this.state;
    const { attribute } = this.props;
    const { name, type, items } = attribute;

    const isItemTextType = type === "text";
    const itemContainerStyle = isItemTextType
      ? styles.textContainer
      : styles.swatchContainer;
    const itemStyle = isItemTextType
      ? styles.textItemBox
      : styles.swatchItemBox;
    const selectedItemStyle = isItemTextType
      ? styles.textItemBox + " " + styles.selectedTextBox
      : styles.swatchItemBox + " " + styles.selectedSwatchBox;

    return (
      <div className={styles.container}>
        <div className={styles.name}>{name}:</div>

        <div className={itemContainerStyle}>
          {items &&
            items.map(({ id, value }) => (
              <div
                key={id}
                className={
                  id === selectedAttributeId ? selectedItemStyle : itemStyle
                }
                onClick={() => this.setSelectedAttributeId(id)}
              >
                {isItemTextType ? (
                  value
                ) : (
                  <div
                    style={{ background: value, width: "32px", height: "32px" }}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }
}
