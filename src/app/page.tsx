"use client";

import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import DraggableItem from "@/components/Draggable/DraggableItem";
import DroppablePane from "@/components/Draggable/DroppablePane";
import { Page } from "@/components/PageEditFooter/PageSelectionButton";
import PageNavigation from "@/components/PageEditFooter/PageNavigation";

const COMPONENTS = [
  { id: "textbox", label: "Text Box" },
  { id: "dropdown", label: "Dropdown" },
  // Add more?
];

type ActiveItem = {
  id: string;
  type: string;
};

export default function Home() {
  const [selectedPage, setSelectedPage] = useState<Page>();
  const [droppedItems, setDroppedItems] = useState<ActiveItem[]>([]);
  const [activeItem, setActiveItem] = useState<ActiveItem>();
  // Preset some pages selection
  const [pages, setPages] = useState<Page[]>([
    { id: 1, label: "Info", icon: "circle-info" },
    { id: 2, label: "Details", icon: "file-text" },
    { id: 3, label: "Other", icon: "file-text" },
    { id: 4, label: "Ending", icon: "circle-check" },
  ]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveItem({
      id: `${event.active.id}-${Date.now()}`,
      type: event.active.id as string,
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    if (over && over.id === "droppable-pane" && activeItem) {
      setDroppedItems((items) => [...items, activeItem]);
    }
    setActiveItem(undefined);
  };

  const handleDragCancel = () => {
    setActiveItem(undefined);
  };

  // In case selected page changes it's name
  useEffect(() => {
    const page = pages.find((p) => p.id === selectedPage?.id);
    if (page) {
      setSelectedPage(page);
    } else {
      setSelectedPage(pages[0]);
    }
  }, [pages, selectedPage]);

  /* TODO: Page component drag & drop functionality incomplete - Added for template design */

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex flex-col bg-gray-100">
        <main className="flex flex-1">
          {/* Left Pane */}
          <div className="w-[30%] max-w-[300px] h-[calc(100vh-64px)] p-4 bg-gray-100 border-r border-gray-300 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">Components</h2>
            {COMPONENTS.map((comp, idx) => (
              <div key={idx}>
                <DraggableItem id={comp.id} label={comp.label} />
              </div>
            ))}
          </div>

          {/* Right Pane */}
          <div className="w-[70%] flex-1 flex flex-col bg-white h-[calc(100vh-64px)]">
            <div className="flex-1 h-full m-4 bg-gray-100 rounded">
              <DroppablePane>
                <h2 className="text-lg font-semibold mb-2">
                  Form Preview - {selectedPage?.label}
                </h2>

                {/* MOVE TO COMPONENTS */}
                {droppedItems.map((item) => (
                  <div key={item.id} className="mb-2">
                    {item.type === "textbox" && (
                      <input
                        type="text"
                        placeholder="Text input"
                        className="w-full p-2 border border-gray-400 bg-white rounded"
                      />
                    )}
                    {item.type === "dropdown" && (
                      <select className="w-full p-2 border border-gray-400 bg-white rounded">
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </select>
                    )}
                  </div>
                ))}
              </DroppablePane>
            </div>
            <div className="bg-white flex justify-start gap-2">
              <PageNavigation
                pages={pages}
                setPages={setPages}
                selectedPage={selectedPage}
                onSelect={(page: Page) => {
                  setSelectedPage(page);
                }}
              />
            </div>
          </div>
          <DragOverlay>
            {activeItem ? (
              <DraggableItem
                id={activeItem.id}
                label={
                  COMPONENTS.find((c) => c.id === activeItem.type)?.label || ""
                }
              />
            ) : null}
          </DragOverlay>
        </main>
      </div>
    </DndContext>
  );
}
