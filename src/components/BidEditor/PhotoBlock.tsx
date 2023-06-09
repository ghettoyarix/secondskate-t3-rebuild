import React, { useEffect } from "react";

import Dropzone from "react-dropzone";
import Dragger from "src/components/widgets/Dragger";

import { useUpload } from "src/context/UploadContext";
import { getImageUrl } from "src/helpers/getImageUrl";
const PhotoBlock = () => {
  const {
    setMainPhoto,
    files,
    setFiles,
    product,
    mergedArray,
    setMergedArray,
  } = useUpload();

  const handleFilesChange = (acceptedFiles: File[]) => {
    if (files.length < 4) {
      setFiles([...files, ...acceptedFiles]);
    }
  };

  const filterFiles = (obj: File | string) => {
    const filteredFiles = mergedArray.filter((file) => file !== obj);
    setMergedArray(filteredFiles);
    if (files.length == 1) {
      setMainPhoto("");
    }
  };

  return (
    <>
      <div>
        <h2
          onClick={() => console.log(mergedArray, files)}
          className="Upload file"
        >
          Drag or choose your file to upload
        </h2>
        <p className="text-reg text-gray">Drag or choose your file to upload</p>
      </div>

      <Dropzone
        maxFiles={4}
        onDrop={(acceptedFiles) => handleFilesChange(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="mb-8 max-h-[182px]  cursor-pointer rounded-xl bg-lightOne py-16">
                <div className="flex flex-col items-center justify-center gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 5C3 2.79086 4.79086 1 7 1H15.3431C16.404 1 17.4214 1.42143 18.1716 2.17157L19.8284 3.82843C20.5786 4.57857 21 5.59599 21 6.65685V19C21 21.2091 19.2091 23 17 23H7C4.79086 23 3 21.2091 3 19V5ZM19 8V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14V5C14 6.65685 15.3431 8 17 8H19ZM18.8891 6C18.7909 5.7176 18.6296 5.45808 18.4142 5.24264L16.7574 3.58579C16.5419 3.37035 16.2824 3.20914 16 3.11094V5C16 5.55228 16.4477 6 17 6H18.8891Z"
                      fill="#777E91"
                    />
                    <path
                      d="M11.6172 9.07588C11.4993 9.12468 11.3888 9.19702 11.2929 9.29289L8.29289 12.2929C7.90237 12.6834 7.90237 13.3166 8.29289 13.7071C8.68342 14.0976 9.31658 14.0976 9.70711 13.7071L11 12.4142V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V12.4142L14.2929 13.7071C14.6834 14.0976 15.3166 14.0976 15.7071 13.7071C16.0976 13.3166 16.0976 12.6834 15.7071 12.2929L12.7071 9.29289C12.4125 8.99825 11.9797 8.92591 11.6172 9.07588Z"
                      fill="#777E91"
                    />
                  </svg>
                  <p className="text-gray">
                    PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      <Dragger
        updateArray={(object) => {
          setMergedArray(object);
        }}
        providedArray={mergedArray || []}
        removeItem={filterFiles}
      ></Dragger>
    </>
  );
};

export default PhotoBlock;
