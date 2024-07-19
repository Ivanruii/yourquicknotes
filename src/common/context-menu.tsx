import React, { useRef, useEffect, MouseEvent } from "react";

interface ContextMenuProps {
  position: { x: number; y: number };
  onClose: () => void;
  actions: { label: string; onClick: () => void }[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  position,
  onClose,
  actions,
}) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      contextMenuRef.current &&
      !contextMenuRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener(
      "mousedown",
      handleClickOutside as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener
      );
    };
  }, []);

  return (
    <div
      ref={contextMenuRef}
      className="fixed bg-white border border-gray-300 rounded shadow-lg"
      style={{ top: position.y, left: position.x }}
    >
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => {
            action.onClick();
            onClose();
          }}
          className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};
