import React from "react";
import { useDraggable } from "@dnd-kit/core";

interface DraggableItemProps {
  id: string;
  label: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, label }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-move p-2 mb-2 bg-white border border-gray-400 rounded shadow ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {label}
    </div>
  );
};

export default DraggableItem;
