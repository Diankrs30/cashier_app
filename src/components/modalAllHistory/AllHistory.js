import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AllHistory.module.css";
import transactionAction from "../../redux/actions/transaction";
import dayjs from "dayjs";

const AllHistory = (props) => {
  const dispatch = useDispatch();
  const allHistory = useSelector((state) => state.transaction.allTransactions);
  const dataUser = useSelector((state) => state.user.dataUser);
  const historyByUser = useSelector(
    (state) => state.transaction.transactionByUser
  );
  const [userId, setUserId] = useState("");
  const currency = (price) => {
    return (
      "Rp " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };

  const handleSelect = (e) => {
    setUserId(e.target.value);
  };

  const hancleSearch = () => {
    dispatch(transactionAction.getTransactionByUserThunk(userId));
  };

  useEffect(() => {
    dispatch(transactionAction.getAllTransactionsThunk());
    dispatch(transactionAction.getTransactionByUserThunk("1"));
  }, [dispatch]);

  return (
    <>
      {props.open ? (
        <div className={styles.modal}>
          <div className={styles["modal-content"]}>
            <div className={styles.close} onClick={() => props.setOpen(!props)}>
              <p>X</p>
            </div>
            <div className={styles.content}>
              <div>
                <div className={styles["modal-header"]}>
                  <p className={styles["modal-title"]}>History Transaction</p>
                </div>{" "}
                <div>
                  <table className={styles["table-container"]}>
                    <tr>
                      <th>Id Transaction</th>
                      <th>user Id</th>
                      <th>Total</th>
                      <th>Date</th>
                    </tr>
                    {allHistory.map((item, idx) => {
                      return (
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.userid}</td>
                          <td>{currency(item.total)}</td>
                          <td>
                            {dayjs(item.date).format("DD-MM-YYYY - hh:mm:ss")}
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
              <div className={styles.historyByUser}>
                <h3>Select history by user :</h3>
                <div className={styles.selectUser}>
                  <select onChange={handleSelect}>
                    <option value="">Select users</option>
                    {dataUser.map((item, idx) => {
                      return (
                        <option value={item.id} key={idx}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <button onClick={hancleSearch}>Search</button>
                </div>
                <div>
                  <table className={styles["table-container"]}>
                    <tr>
                      <th>Id Transaction</th>
                      <th>user Id</th>
                      <th>Total</th>
                      <th>Date</th>
                    </tr>
                    {historyByUser.map((item, idx) => {
                      return (
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.userid}</td>
                          <td>{currency(item.total)}</td>
                          <td>
                            {dayjs(item.date).format("DD-MM-YYYY - hh:mm:ss")}
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AllHistory;
