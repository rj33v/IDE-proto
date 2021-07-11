import React, { useContext, useEffect, useState } from "react";

import EditorPane from "./editorpane/EditorPane";
import PreviewPane from "./previewpane/PreviewPane";

// Context
import EditorContentContext from "../context/EditorContentContext";

import "./editor.scss";

const DATA = [
  {
    id: "af1",
    label: "Unselected filters",
    items: [
      { id: "af2", label: "Item 1" },
      { id: "af3", label: "Item 2" }
    ],
    tint: 1
  },
  {
    id: "af4",
    label: "Geography",
    items: [
      { id: "af5", label: "Item 3" },
      { id: "af6", label: "Item 4" }
    ],
    tint: 2
  },
  {
    id: "af7",
    label: "Company",
    items: [
      { id: "af8", label: "Item 5" },
      { id: "af9", label: "Item 6" }
    ],
    tint: 3
  },
  {
    id: "af71",
    label: "City",
    items: [
      { id: "af81", label: "Item 7" },
      { id: "af91", label: "Item 8" }
    ],
    tint: 4
  }
];

const Editor = () => {
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Mock an API call.
    buildAndSave(DATA);
  }, []);

  function buildAndSave(items) {
    const groups = {};
    console.log("items build and save", items);
    for (let i = 0; i < Object.keys(items).length; ++i) {
      console.log("items[i]", items[i].id);
      const currentGroup = items[i];
      groups[items[i].id] = i;
    }

    console.log("ITEMS", items);
    console.log("GROUPS", groups);

    setItems(items);
    setGroups(groups);
  }

  return (
    <main>
      <div className="panes">
        <EditorContentContext.Provider
          value={{ items, setItems, groups, setGroups }}
        >
          <EditorPane buildAndSave={buildAndSave} />
          <PreviewPane />
        </EditorContentContext.Provider>
      </div>
    </main>
  );
};

export default Editor;
