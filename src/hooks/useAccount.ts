import { useContext } from "react";

import { AccountContext } from "~contexts/account/AccountContext";

// Create consumer
const useAccount = () => {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error("Account context must be used within an AccountProvider");
  }

  return context;
};

export default useAccount;
