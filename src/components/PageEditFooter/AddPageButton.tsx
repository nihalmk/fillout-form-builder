import React, { useState } from "react";
import Icon from "../Icons/Icon";

interface AddPageButtonProps {
  onClick: () => void;
}

const AddPageButton = ({ onClick }: AddPageButtonProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
      className={`h-8 flex items-center gap-2 px-2.5 py-1 rounded-lg outline outline-neutral-200 cursor-pointer inline-flex ${
        focused ? "hover:outline-blue-600" : ""
      }`}
      onClick={onClick}
    >
      <Icon image={"plus"} />
      <span>Add page</span>
    </div>
  );
};

export default AddPageButton;
