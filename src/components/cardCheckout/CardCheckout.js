import styles from "../cardCheckout/CardCheckout.module.css";
import DefaultImg from "../../assets/images/defaultImage.png";

import React from "react";

function CardCheckout(data) {
  const currency = (price) => {
    return (
      "Rp " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };

  const handleDelete = () => {
    const cart = data.cart;
    cart.splice(data.index, 1);
    data.setCart([...cart]);
  };

  return (
    <div className={styles["card-container"]}>
      <div className={styles["wrapper-img"]}>
        <img
          src={data.data.picture !== null ? data.data.picture : DefaultImg}
          alt="products"
        />
      </div>
      <div className={styles["wrapper-description"]}>
        <h3>{data.data.name}</h3>
        <p>{currency(data.data.price)}</p>
        <div className={styles.btn}>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default CardCheckout;
