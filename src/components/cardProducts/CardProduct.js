import styles from "../cardProducts/CardProduct.module.css";
import DefaultImg from "../../assets/images/defaultImage.png";

import React from "react";

function CardProduct(data) {
  const currency = (price) => {
    return (
      "Rp " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };

  const handleAddCart = () => {
    const cart = data.cart;
    const filter = cart.filter((item) => item.name === data.data.name)
    if(filter.length === 0) {
      data.setCart([...cart, data.data])
    }
  }
  return (
    <div className={styles["card-container"]}>
      <div className={styles["wrapper-img"]}>
        <img src={data.data.picture !== null ? data.data.picture : DefaultImg} alt="products" />
      </div>
      <div className={styles["wrapper-description"]}>
        <h3>{data.data.name}</h3>
        <p>{currency(data.data.price)}</p>
        <button onClick={handleAddCart}>Add to cart</button>
      </div>
    </div>
  );
}

export default CardProduct;
