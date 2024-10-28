import React from "react";

const Modal = ({ isOpen, onClose, children, imageUrl }) => {
  return (
    <div
      className={`
        fixed inset-0 flex justify-center items-center
        transition-colors duration-300
        ${isOpen ? "visible bg-black/30" : "invisible"}
      `}
    >
      {/* Modal content with transition and medium size */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        className={`
          bg-white rounded-lg shadow-lg p-4 transition-all duration-300
          transform ${isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"}
          max-w-lg w-full max-h-[80vh] overflow-auto
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          X
        </button>
        {/* Display the image */}
        <img src={imageUrl} alt="Trail" className="w-full max-h-[60vh] object-cover" />
      </div>
    </div>
  );
};

export default Modal;
