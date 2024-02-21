import { createContext, useReducer } from "react";
export const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearItem: () => {},
});
function CartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];

    if (existCartItemIndex > -1) {
      const updatedItem = {
        ...state.items[existCartItemIndex],
        quantity: state.items[existCartItemIndex].quantity + 1,
      };
      updatedItems[existCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        ...action.item,
        quantity: 1,
      });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedItems = [...state.items];
    if (existingItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }
  return state;
}
export default function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(CartReducer, {
    items: [],
  });
  function handleAddItem(item) {
    cartDispatch({
      type: "ADD_ITEM",
      item,
    });
  }
  function handleRemoveItem(id) {
    cartDispatch({
      type: "REMOVE_ITEM",
      id,
    });
  }
  function handleClearItem() {
    cartDispatch({
      type: "CLEAR_CART",
    });
  }
  const valueCtx = {
    items: cartState.items,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    clearItem: handleClearItem,
  };
  return (
    <CartContext.Provider value={valueCtx}>{children}</CartContext.Provider>
  );
}
