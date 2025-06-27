import React, { MouseEvent, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import Icon from "../Icons/Icon";

interface PageButtonProps {
  contextMenu: { x: number; y: number };
  onClose: () => void;
  menuItems: MenuItem[];
}
export interface MenuItem {
  id: string;
  text: string;
  iconName: string;
  onClick: () => void;
  isDestructive?: boolean;
  className?: string;
  addDivider?: boolean;
}

const PageButtonMenu: React.FC<PageButtonProps> = ({
  contextMenu,
  onClose,
  menuItems,
}) => {
  const contextRef = useRef<HTMLDivElement>(null);

  // Handle menu item closing
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | globalThis.MouseEvent) => {
      if (
        contextRef.current &&
        !contextRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);
  const menu = (
    <div
      ref={contextRef}
      className="cursor-pointer w-60 text-zinc-900 absolute bg-white shadow-md border rounded-xl border-neutral-200 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02)]"
      style={{
        top: contextMenu.y,
        left: contextMenu.x,
        transform: "translateY(calc(-100% - 9px))",
      }}
    >
      <div className="w-full h-10 rounded-t-xl p-3 bg-gray-50 border-b-[0.50px] border-neutral-200 inline-flex justify-start items-center gap-1 overflow-hidden">
        <div className="justify-center text-zinc-900 text-base font-medium leading-normal">
          Settings
        </div>
      </div>
      <div className="p-3">
        {menuItems.map((item, idx) => (
          <div key={idx}>
            {item.addDivider && (
              <div className="pb-3">
                <div className="gap-2 self-stretch h-[0.50px] relative bg-neutral-200" />
              </div>
            )}
            <button
              key={item.id}
              onClick={() => {
                item.onClick();
                onClose();
              }}
              className={`flex gap-2 w-full text-left py-1 hover:bg-gray-100 text-sm ${
                item.isDestructive ? "text-red-500" : ""
              } ${item.className || ""}`}
            >
              <Icon image={item.iconName} />
              <span>{item.text}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  return ReactDOM.createPortal(menu, document.body);
};

export default PageButtonMenu;
