import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        {title && (
          <h2 className="mb-2 text-xl font-semibold" id="modal-title">
            {title}
          </h2>
        )}
        {description && (
          <p className="mb-4 text-gray-600" id="modal-description">
            {description}
          </p>
        )}
        <button
          className="absolute text-gray-600 top-2 right-2 hover:text-gray-800"
          onClick={onClose}
          aria-label="Close dialog"
        >
          &times;
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
