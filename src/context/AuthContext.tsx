import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { url } from "../utils/url";
import { DataUserContext } from "./DataUserContext";
import { LoadingContext } from "./LoadingContext";

interface Props {
  children: React.ReactNode;
}
interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  setToken: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string | null>(null);
  const { setIsLoading } = useContext(LoadingContext);
  const { dataUser, setDataUser } = useContext(DataUserContext);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setTokenState(storedToken);
      }
    };

    loadToken();
  }, []);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axios.get(`${url}/personne/auth`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.error) {
          console.log("erroggggg");
          setDataUser({
            ...dataUser,
            statusAuth: false,
          });
          setIsLoading(false);
          if (token) {
            setToken(null);
          }
        } else {
          console.log(response.data);
          setDataUser({
            id: response.data.id,
            statut: response.data.statut,
            niveau: response.data.niveau,
            parcours: response.data.parcours,
            statusAuth: true,
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        console.log("accèes refuser §§§§");
      }
    };
    fetchProtectedData();
  }, [token]);

  const setToken = async (newToken: string | null) => {
    if (newToken) {
      await AsyncStorage.setItem("token", newToken);
    } else {
      await AsyncStorage.removeItem("token");
    }
    setTokenState(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
