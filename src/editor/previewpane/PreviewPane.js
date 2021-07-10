import React, { useContext } from "react";

import EditorContentContext from "../../context/EditorContentContext";

const PreviewPane = () => {
  const { items, setItems } = useContext(EditorContentContext);
  const { groups, setGroups } = useContext(EditorContentContext);

  return (
    <div className="pane">
      <h3>PreviewPane</h3>

      {/* {items.map((item, index) => {
                      return (
                        <div>{item.label}</div>
                      )}
                    )} */}
    </div>
  );
};

export default PreviewPane;
