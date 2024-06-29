import React, { createContext, SetStateAction, useState } from "react";
import { string } from "yup";

interface Props {
  children: React.ReactNode;
}

export const TokenContext = createContext({
  token: "",
  setToken: string as React.Dispatch<SetStateAction<string>>,
});

export const TokenProvider = ({ children }: Props) => {
  const [token, setToken] = useState("");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
