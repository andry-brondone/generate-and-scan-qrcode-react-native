import React, { createContext, SetStateAction, useState } from "react";

interface DataUser {
  id: number;
  statut: "délégué" | "organisateur" | "";
  niveau: string;
  parcours: string;
  statusAuth: boolean;
}

interface DataUserContextProps {
  dataUser: DataUser;
  setDataUser: React.Dispatch<SetStateAction<DataUser>>;
}

interface Props {
  children: React.ReactNode;
}

export const DataUserContext = createContext<DataUserContextProps>({
  dataUser: {
    id: 0,
    statut: "",
    niveau: "",
    parcours: "",
    statusAuth: false,
  },
  setDataUser: () => {},
});

export const DataUserProvider = ({ children }: Props) => {
  const [dataUser, setDataUser] = useState<DataUser>({
    id: 0,
    statut: "",
    niveau: "",
    parcours: "",
    statusAuth: false,
  });

  return (
    <DataUserContext.Provider value={{ dataUser, setDataUser }}>
      {children}
    </DataUserContext.Provider>
  );
};
