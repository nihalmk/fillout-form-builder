import React, { useState, useRef } from "react";
import Icon from "../Icons/Icon";
import PageButtonMenu from "../ContextMenu/PageButtonMenu";

export interface Page {
  id: number;
  label: string;
  icon: string;
}

interface PageButtonProps {
  page: Page;
  onPageNameChange: (value: string) => void;
  onSelect: (page: Page) => void;
  isSelected: boolean;
  handleAddPage: (pageId: number) => void;
  isLast: boolean;
}
const PageSelectionButton = ({
  page,
  onPageNameChange,
  onSelect,
  isSelected,
  handleAddPage,
  isLast,
}: PageButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  const [editing, setEditing] = useState(false);
  const [btnFocused, setBtnFocused] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [addPageBtnFocused, setAddPageBtnFocused] = useState(false);

  const onDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setContextMenu({ x: rect.left, y: rect.top });
    }
  };

  const closeContextMenu = () => setContextMenu(null);
  return (
    <div className="flex items-center">
      {contextMenu && (
        <PageButtonMenu onClose={closeContextMenu} contextMenu={contextMenu} />
      )}
      <div
        ref={buttonRef}
        onMouseEnter={() => setBtnFocused(true)}
        onMouseLeave={() => setBtnFocused(false)}
        onClick={() => onSelect(page)}
        className={`h-8 flex items-center gap-2 px-2.5 py-1 rounded-lg outline outline-neutral-200 cursor-pointer ${
          isSelected
            ? "bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02)]"
            : `${
                btnFocused ? "bg-gray-400/30" : "bg-gray-400/20"
              } text-slate-500`
        } ${
          editing
            ? "bg-blue-50 outline-blue-400"
            : "outline-gray-400 hover:outline-blue-600"
        }`}
        onDoubleClick={onDoubleClick}
      >
        <Icon image={`${page.icon}${!isSelected ? "-disabled" : ""}`} />
        {editing ? (
          <input
            className="bg-transparent outline-none border-b border-blue-400 w-24"
            value={page.label}
            onChange={(e) => onPageNameChange(e.target.value)}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <span className="max-w-[8ch] truncate">{page.label}</span>
        )}
        {isSelected && !editing && (
          <div onClick={handleContextMenu}>
            <Icon image="dot-menu" />
          </div>
        )}
      </div>

      <div
        className="flex items-center cursor-pointer h-full py-2"
        onMouseEnter={() => setAddPageBtnFocused(true)}
        onMouseLeave={() => setAddPageBtnFocused(false)}
        onClick={() => handleAddPage(page.id)}
      >
        <div className="w-5 h-[1.50px] border-t border-dashed border-stone-300" />
        {!isLast && (
          <div
            className={`flex items-center whitespace-nowrap overflow-hidden transition-all duration-500 ease-in-out ${
              addPageBtnFocused ? "max-w-xs" : "max-w-0"
            }`}
          >
            <div className="w-4 h-4 px-0.5 py-0.5 bg-white rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02)] outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-200 inline-flex justify-center items-center gap-2 overflow-hidden mx-1">
              <Icon image="plus" />
            </div>
            <div className="w-5 h-[1.50px] border-t border-dashed border-stone-300" />
          </div>
        )}
      </div>
    </div>
  );
  //   return (
  //     <div className="cursor-pointer h-8 p-2 bg-white rounded-lg  outline outline-[0.50px] outline-offset-[-0.50px] outline-blue-600 inline-flex justify-center items-center gap-2 overflow-hidden">
  //       <div className="flex justify-start items-center gap-1.5">
  //         <div className="w-5 h-5 relative overflow-hidden">
  //           <Icon image="file-text" />
  //         </div>
  //         <div className="text-center justify-start text-zinc-900 text-sm font-medium leading-tight">
  //           {text}
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default PageSelectionButton;
