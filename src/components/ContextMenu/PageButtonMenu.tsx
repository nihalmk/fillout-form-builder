import React, { MouseEvent, useEffect, useRef } from "react";

interface PageButtonProps {
  contextMenu: { x: number; y: number };
  onClose: () => void;
}
const PageButtonMenu: React.FC<PageButtonProps> = ({
  contextMenu,
  onClose,
}) => {
  const contextRef = useRef<HTMLDivElement>(null);

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
  return (
    <div
      ref={contextRef}
      //   className="bg-white z-50 flex flex-col gap-1 rounded-xl  outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-200"
      className="cursor-pointer w-60 text-zinc-900 absolute bg-white shadow-md border rounded-xl border-neutral-200 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02)]"
      style={{
        top: contextMenu.y,
        left: contextMenu.x,
        transform: "translateY(calc(-100% - 4px))",
      }}
    >
      <div className="w-full h-10 rounded-t-xl p-3 bg-gray-50 border-b-[0.50px] border-neutral-200 inline-flex justify-start items-center gap-1 overflow-hidden">
        <div className="justify-center text-zinc-900 text-base font-medium leading-normal">
          Settings
        </div>
      </div>
      <div className="block w-full text-left px-3 py-1 hover:bg-gray-100 rounded text-sm">
        Set as first page
      </div>
      <div className="block w-full text-left px-3 py-1 hover:bg-gray-100 rounded text-sm">
        Rename
      </div>
      <div className="block w-full text-left px-3 py-1 hover:bg-gray-100 rounded text-sm">
        Copy
      </div>
      <div className="block w-full text-left px-3 py-1 hover:bg-gray-100 rounded text-sm">
        Duplicate
      </div>
      <div className="self-stretch h-[0.50px] relative bg-neutral-200" />
      <div className="block w-full text-left text-red-500 px-3 py-3 hover:bg-gray-100 rounded text-sm">
        Delete
      </div>
    </div>
  );
};

export default PageButtonMenu;
