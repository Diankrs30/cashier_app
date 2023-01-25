import "./App.css";
import Card from "../src/components/cardProducts/CardProduct";
import CardCheckout from "../src/components/cardCheckout/CardCheckout";
import ModalHistory from "../src/components/modalAllHistory/AllHistory";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import userActions from "./redux/actions/user";
import transactionActions from "./redux/actions/transaction";

function App() {
  const products = [
    {
      id: 1,
      name: "Beras",
      picture: "https://ipanganan.com/images/banner1a.png",
      price: 10000,
    },
    {
      id: 2,
      name: "Teh",
      picture: "https://cf.shopee.co.id/file/2c559cae36b8f0b9008a73cfe861927d",
      price: 9000,
    },
    {
      id: 3,
      name: "Gula",
      picture:
        "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/11/6/556a6450-25f6-41d2-8cc3-07f35d4989e7.jpg",
      price: 14000,
    },
    {
      id: 4,
      name: "Kopi",
      picture:
        "https://assets.promediateknologi.com/crop/0x0:0x0/750x500/photo/2022/05/11/2929532943.png",
      price: 8000,
    },
    {
      id: 5,
      name: "Telur",
      picture:
        "https://cdn-2.tstatic.net/batam/foto/bank/images/telur-ayam_20180416_112847.jpg",
      price: 12000,
    },
    {
      id: 6,
      name: "Jeruk",
      picture:
        "https://png.pngtree.com/png-clipart/20201208/original/pngtree-stack-cut-oranges-png-image_5529928.jpg",
      price: 18000,
    },
    {
      id: 7,
      name: "Apel",
      picture:
        "https://png.pngtree.com/png-clipart/20190614/original/pngtree-photo-realistic-of-red-apple-full-editable-isolated-on-white-png-image_3718196.jpg",
      price: 28000,
    },
  ];

  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user.dataUser);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState({
    userid: null,
    total: null,
  });

  const handleSelect = (e) => {
    // console.log(e.target.value);
    setBody({ ...body, userid: e.target.value });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      return toast.warning("Keranjang kosong", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }

    if (body.userid === null) {
      return toast.warning("User harus diisi!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }

    // console.log(cart);
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    // console.log(total);

    const checkoutSuccess = () => {
      toast.success("Transaction success!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    };

    const checkoutDenied = () => {
      toast.error("Transaction failed!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    };
    const payload = {
      userid: body.userid,
      total: total,
    };

    dispatch(
      transactionActions.createTransactionThunk(
        payload,
        checkoutSuccess,
        checkoutDenied
      )
    );
  };

  const handleHistory = async () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(userActions.getAllUsersThunk());
  }, [dispatch]);

  return (
    <div className="body-container">
      <div className="container-product">
        {products.map((item, idx) => {
          return <Card key={idx} data={item} cart={cart} setCart={setCart} />;
        })}
      </div>
      <div className="container-cart">
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
        <div className="wrapper-cart">
          {cart.map((item, idx) => {
            return (
              <CardCheckout
                key={idx}
                index={idx}
                data={item}
                cart={cart}
                setCart={setCart}
              />
            );
          })}
        </div>
        <div className="button-checkout">
          <button onClick={handleCheckout}>Checkout</button>
        </div>
        <ToastContainer />
        <div className="button-seeTransaction">
          <button onClick={handleHistory}>See all history</button>
        </div>
        <ModalHistory
          open={open}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
}

export default App;
