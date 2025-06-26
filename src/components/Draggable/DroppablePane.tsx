import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DraggableItemProps {
  children: React.ReactNode;
}

const DroppablePane: React.FC<DraggableItemProps> = ({ children }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "droppable-pane" });

  return (
    <div
      ref={setNodeRef}
      style={{
        backgroundColor: isOver ? "#e0e0e0" : "transparent",
        transition: "background-color 0.2s ease",
      }}
      className="flex-1 p-4 h-full border border-gray-200 rounded overflow-y-auto"
    >
      {children}
    </div>
  );
};

export default DroppablePane;
