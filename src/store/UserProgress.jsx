import { createContext, useState } from "react";
const UserProressContext = createContext({
  progress: "",
  showModal: () => {},
  hideModal: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");
  function showModal() {
    setUserProgress("modal");
  }
  function hideModal() {
    setUserProgress("");
  }
  function showCheckout() {
    setUserProgress("checkout");
  }
  function hideCheckout() {
    setUserProgress("");
  }
  const valueCtx = {
    progress: userProgress,
    showModal,
    hideModal,
    showCheckout,
    hideCheckout,
  };
  return (
    <UserProressContext.Provider value={valueCtx}>
      {children}
    </UserProressContext.Provider>
  );
}

export default UserProressContext;
