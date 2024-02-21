import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";
import UserProressContext from "../store/UserProgress";
import { useContext } from "react";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProressContext);
  const totalCartItem = cartCtx.items.reduce((totalQuantity, item) => {
    return totalQuantity + item.quantity;
  }, 0);

  function handleShowModal() {
    userProgressCtx.showModal();
  }
  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="Logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowModal}>
          Cart ({totalCartItem})
        </Button>
      </nav>
    </div>
  );
}
