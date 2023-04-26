import React, {
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import { CONDITIONS } from "~/constants/index";
import { type Option } from "~/models/FilterOptions";
import formChangeHandler from "~/helpers/formChangeHandler";
import { z } from "zod";
export const FormDataScheme = z.object({
  title: z.string().max(25),
  price: z.number().max(9999),
  description: z.string().max(100),
  size: z.string().optional(),
});
import Router from "next/router";
type FormData = z.infer<typeof FormDataScheme>;
import type { UploadCategory, UploadType } from "~/models/Upload";
import { ProductWithOwner } from "~/server/models/products";

type UploadContextType = {
  // state related to selected files
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;

  // state related to selected category and type
  chosenCategory: UploadCategory;
  chosenType: UploadType;
  setChosenCategory: Dispatch<SetStateAction<UploadCategory>>;
  setChosenType: Dispatch<SetStateAction<UploadType>>;

  // state related to selected brand and condition
  chosenBrand: Option;
  chosenCondition: Option;
  setChosenBrand: Dispatch<SetStateAction<Option>>;
  setChosenCondition: Dispatch<SetStateAction<Option>>;

  // state related to main photo and form data
  mainPhoto: string;
  setMainPhoto: Dispatch<SetStateAction<string>>;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;

  // state related to uploading process and error handling
  uploading: boolean;
  setUploading: Dispatch<SetStateAction<boolean>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;

  // state related to edit mode and product information
  updateMod: boolean;
  setupdateMod: Dispatch<SetStateAction<boolean>>;
  product?: ProductWithOwner;

  // event handler for input/textarea changes
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  // list of available categories
  categories: UploadCategory[];
};

const UploadContext = React.createContext<UploadContextType>(
  {} as UploadContextType
);

export function useUpload() {
  return useContext(UploadContext);
}

export function UploadProvider({
  children,
  product,
}: {
  children: React.ReactNode;
  product?: ProductWithOwner;
}) {
  const categories = [
    {
      title: "Skateboards",
      value: "skateboards",
      types: [
        { title: "Decks", value: "decks" },
        { title: "Trucks", value: "trucks" },
        { title: "Wheels", value: "wheels" },
        { title: "Other", value: "other" },
        { title: "Completes", value: "completes" },
      ],
    },
    {
      title: "Shoes",
      value: "shoes",
      types: [
        { title: "Leather", value: "leather" },
        { title: "Seude", value: "seude" },
        { title: "Canvas", value: "canvas" },
      ],
    },
  ];

  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [chosenCategory, setChosenCategory] = useState(categories[0]!);
  const [chosenType, setChosenType] = useState(chosenCategory.types[0]!);
  const [chosenBrand, setChosenBrand] = useState({} as Option);
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const [chosenCondition, setChosenCondition] = useState(
    CONDITIONS[0] as Option
  );
  const [mainPhoto, setMainPhoto] = useState("");
  const [updateMod, setupdateMod] = useState(false);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    formChangeHandler(event, formData, setFormData);
  };

  useEffect(() => {
    if (Router.asPath.includes("edit")) {
      setupdateMod(true);
    } else setupdateMod(false);
  }, [setupdateMod]);

  const value: UploadContextType = {
    files,
    setFiles,
    chosenType,
    setChosenType,
    chosenCategory,
    chosenBrand,
    setChosenBrand,
    chosenCondition,
    setChosenCondition,
    setMainPhoto,
    mainPhoto,
    setChosenCategory,
    categories,
    handleChange,
    formData,
    setUploading,
    uploading,
    error,
    setError,
    updateMod,
    setupdateMod,
    product,
    setFormData,
  };

  return (
    <UploadContext.Provider value={value}>{children}</UploadContext.Provider>
  );
}
