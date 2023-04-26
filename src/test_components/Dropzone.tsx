import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useUploadProducts } from "~/hooks/useUploadProducts";
function Dropzone() {
  const { uploadProductMutation } = useUploadProducts();
  const { mutateAsync: uploadProduct } = uploadProductMutation;

  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(() => acceptedFiles);
  }, []);
  const test = async () => {
    await uploadProduct(files);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div>
        <button onClick={test}>dasdasdasd </button>
        {files &&
          files.map((file) => (
            <Image
              onClick={() => console.log(files)}
              key={file.name}
              height={40}
              width={40}
              src={URL.createObjectURL(file)}
              alt="ss"
            ></Image>
          ))}
      </div>
      <div
        className="border-black-100 h-20 w-[400px]   border-4"
        {...getRootProps()}
      >
        <input className="input-bordered h-20 border-2" {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag `&apos;` n `&apos;` drop some files here, or click to select
            files
          </p>
        )}
      </div>
    </>
  );
}
export default Dropzone;
