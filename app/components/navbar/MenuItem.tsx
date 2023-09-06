import React from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  setIsOpen: (isOpen: boolean) => void;
}

const MenuItem = ({ onClick, label, setIsOpen }: MenuItemProps) => {
  const handleClick = () => {
    setIsOpen(false);
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </div>
  );
};

export default MenuItem;
