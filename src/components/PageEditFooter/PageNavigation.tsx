import React from "react";
import PageSelectionButton, { Page } from "./PageSelectionButton";
import AddPageButton from "./AddPageButton";

interface PageNavigationProps {
  onSelect: (page: Page) => void;
  pages: Page[];
  selectedPage?: Page;
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  onSelect,
  pages,
  selectedPage,
  setPages,
}) => {
  const handleNameChange = (id: number, value: string) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, label: value } : p))
    );
  };

  // TODO: can use another key for sorting? use unique id for a page that's not changed
  const handleAddPage = (afterId?: number) => {
    setPages((currentPages) => {
      const insertionIndex =
        afterId !== undefined
          ? currentPages.findIndex((p) => p.id === afterId) + 1
          : currentPages.length;

      const validInsertionIndex = Math.max(0, insertionIndex);

      const newPagePlaceholder = { id: -1, label: "", icon: "file-text" };

      const pagesWithPlaceholder = [
        ...currentPages.slice(0, validInsertionIndex),
        newPagePlaceholder,
        ...currentPages.slice(validInsertionIndex),
      ];

      // Re-number all pages to ensure IDs are unique and sequential.
      // This is the "reordering" part.
      const reorderedPages = pagesWithPlaceholder.map((page, index) => {
        const newId = index + 1;
        return {
          ...page,
          id: newId,
          label:
            page.id === -1
              ? `Page ${pagesWithPlaceholder.length + 1}`
              : page.label,
        };
      });

      // Find the newly created page to select it.
      const newPage = reorderedPages[validInsertionIndex];
      if (newPage) {
        onSelect(newPage);
      }

      return reorderedPages;
    });
  };

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex items-center p-4 w-max">
        {pages.map((page, idx) => (
          <PageSelectionButton
            key={page.id}
            page={page}
            isSelected={selectedPage?.id === page.id}
            onPageNameChange={(val) => handleNameChange(page.id, val)}
            onSelect={onSelect}
            handleAddPage={handleAddPage}
            isLast={idx === pages.length - 1}
          />
        ))}

        <AddPageButton onClick={handleAddPage} />
      </div>
    </div>
  );
};

export default PageNavigation;
