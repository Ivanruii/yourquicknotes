import React, { RefObject } from "react";

interface ContextMenuOption {
  label: string;
  action: () => void;
}

interface ContextMenuProps {
  show: boolean;
  position: { x: number; y: number } | null;
  options: ContextMenuOption[];
  contextMenuRef: RefObject<HTMLDivElement>;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  show,
  position,
  options,
  contextMenuRef,
}) => {
  if (!show || !position) return null;

  return (
    <div
      ref={contextMenuRef}
      className="fixed bg-white border border-gray-300 rounded shadow-lg"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={option.action}
          className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
