import React, { useContext, useState, useEffect } from "react";
import { type ReactNode } from "react";
import { type ProductWithOwner } from "~/server/models/products";
import { useRouter } from "next/router";
import { profile } from "console";
interface BidContextType {
  product?: ProductWithOwner;
  previewImage?: string;
  still: boolean;
  editable: boolean;
  deletionInitiated: boolean;
  setDeletionInitiated: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleted: boolean;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

interface BidProviderProps extends Partial<BidContextType> {
  children: ReactNode;
}

const HeaderContext = React.createContext({} as BidContextType);

export function useBidContext(): BidContextType {
  return useContext(HeaderContext);
}

export function BidContextProvider({
  children,
  product,
  previewImage,
}: BidProviderProps) {
  const [deletionInitiated, setDeletionInitiated] = useState(false);
  const [still, setStill] = useState(false);
  const [editable, setEditable] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const route = useRouter().asPath;

  useEffect(() => {
    if (route !== "/") {
      setStill(true);
    }
    if (route.includes("profile/you")) {
      setEditable(true);
    }
  }, [route, still, editable]);

  const value: BidContextType = {
    product,
    deletionInitiated,
    setDeletionInitiated,
    previewImage,
    still,
    editable,
    isDeleted,
    setIsDeleted,
  };

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}
