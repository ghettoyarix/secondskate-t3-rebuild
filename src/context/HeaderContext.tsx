import React, { useContext, useState, useEffect } from "react";
import { type ReactNode } from "react";
import { type ProductWithOwner } from "src/server/models/products";
import { api } from "src/utils/api";
interface Account {
  username: string;
  title: string;
  photoURL: string;
}

interface HeaderContextType {
  openFlag: boolean;
  setOpenFlag: React.Dispatch<React.SetStateAction<boolean>>;
  searchedValue: string;
  setSearchedValue: (value: string) => void;
  accountsFound: Account[];
  setAccountsFound: React.Dispatch<React.SetStateAction<Account[]>>;
  productsFound: ProductWithOwner[];
  setProductsFound: React.Dispatch<React.SetStateAction<ProductWithOwner[]>>;
  clearProducts: () => void;
  isLoading: boolean;
  totalProducts?: number;
}

interface HeaderProviderProps {
  children: ReactNode;
}
const HeaderContext = React.createContext({} as HeaderContextType);

export function useHeader(): HeaderContextType {
  return useContext(HeaderContext);
}
export function HeaderProvider({ children }: HeaderProviderProps) {
  const [accountsFound, setAccountsFound] = useState<Account[]>([]);
  const [productsFound, setProductsFound] = useState<ProductWithOwner[]>([]);
  const [openFlag, setOpenFlag] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");

  const { data, isFetching: isLoading } = api.product.getProducts.useQuery(
    {
      page: 1,
      title: searchedValue,
      limit: 3,
    },
    {
      onSuccess: (data) => {
        console.log(data);
        setProductsFound(data.products);
        console.log(searchedValue);
      },
      refetchOnWindowFocus: false,
      enabled: searchedValue !== "",
    }
  );
  const totalProducts = data?.totalProducts;
  const clearProducts = () => {
    setProductsFound([]);
  };
  const value: HeaderContextType = {
    searchedValue,
    setSearchedValue,
    accountsFound,
    setAccountsFound,
    productsFound,
    setProductsFound,
    openFlag,
    setOpenFlag,
    clearProducts,
    isLoading,
    totalProducts,
  };

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}
