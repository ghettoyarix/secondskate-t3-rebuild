import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { hide, modalSlice } from "../../../redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import BidEditor from "../../BidEditor";
import { UploadProvider } from "../../../~/context/UploadContext";
import { useAppDispatch, useAppSelector } from "hooks/redux";
const EditBidModal = () => {
  const dispatch = useAppDispatch();
  const { updateModalFlag, defaultValues } = useAppSelector(
    (state) => state.modal
  );
  const [open, setOpen] = useState(false);

  const handleOpen = () => {};
  const handleClose = () => {
    dispatch(hide());
  };

  return (
    <Modal
      onClose={handleClose}
      open={updateModalFlag}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" absolute left-0 right-0 top-[10%] mx-auto h-[80%]   max-h-[800px] w-[60%] overflow-scroll rounded-xl bg-white  ">
        <UploadProvider>
          <div className="flex justify-center ">
            <BidEditor updateMod defaultValues={defaultValues}></BidEditor>
          </div>
        </UploadProvider>
      </div>
    </Modal>
  );
};

export default EditBidModal;
