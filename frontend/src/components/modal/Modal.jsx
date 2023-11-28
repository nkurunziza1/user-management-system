import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0  bg-black z-50 bg-opacity-70 ">
          {children}
          <button
            className="absolute top-0 right-0 m-4 text-white cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default Modal;
