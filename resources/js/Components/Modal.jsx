import React, { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { Box } from "@mui/material";

const Modal = ({ open, onClose, children }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        style={{ position: "relative", zIndex: 100000 }}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "black",
              opacity: "25%",
            }}
          />
        </Transition.Child>

        <Box sx={{ position: "fixed", overflowY: "auto", inset: 0 }}>
          <Box
            sx={{
              display: "flex",
              minHeight: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-150"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel>{children}</Dialog.Panel>
            </Transition.Child>
          </Box>
        </Box>
      </Dialog>
    </Transition>
  );
};

export default Modal;
