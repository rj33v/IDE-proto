import React, { useContext, useEffect, useState } from "react";
import EditorContentContext from "../../context/EditorContentContext";

//const { DragDropContext, Draggable, Droppable } = "react-beautiful-dnd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const EditorPane = (props) => {
  const { items, setItems } = useContext(EditorContentContext);
  const { groups, setGroups } = useContext(EditorContentContext);
  const { buildAndSave } = props;

  return (
    <div className="pane">
      <h3>Editor Pane</h3>

      <DragDropContext
        onDragEnd={(result) => {
          const { destination, draggableId, source, type } = result;

          if (!destination) {
            return;
          }

          if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
          ) {
            return;
          }

          if ("group" === type) {
            const sourceIndex = source.index;
            const targetIndex = destination.index;

            const workValue = items.slice();
            const [deletedItem] = workValue.splice(sourceIndex, 1);
            workValue.splice(targetIndex, 0, deletedItem);

            buildAndSave(workValue);

            return;
          }
          console.log("groups", groups[source.droppableId]);

          const sourceDroppableIndex = groups[source.droppableId];
          const targetDroppableIndex = groups[destination.droppableId];
          console.log("sourceDroppableIndex", sourceDroppableIndex);
          console.log("targetDroppableIndex", targetDroppableIndex);

          const sourceItems = items[sourceDroppableIndex].items.slice();
          const targetItems =
            source.droppableId !== destination.droppableId
              ? items[targetDroppableIndex].items.slice()
              : sourceItems;

          // Pull the item from the source.
          const [deletedItem] = sourceItems.splice(source.index, 1);
          targetItems.splice(destination.index, 0, deletedItem);

          const workValue = items.slice();
          workValue[sourceDroppableIndex] = {
            ...items[sourceDroppableIndex],
            items: sourceItems
          };
          workValue[targetDroppableIndex] = {
            ...items[targetDroppableIndex],
            items: targetItems
          };

          console.log("workValue", workValue);
          //console.log("EditorContentContext", EditorContentContext)
          setItems(workValue);
        }}
      >
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable draggableId={item.id} key={item.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <DroppableList key={item.id} {...item} />

                      {/* {items[0].map((item, index) => {
                      //console.log("items", items)
                      return (
                        <div>{item.label}</div>
                      )}
                    )} */}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

const DroppableList = ({ id, items, label, tint }) => {
  return (
    <div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div className={`holder holder--tint-${tint}`}>
              <div className="holder__title">{label}</div>
              <div className="holder__content">
                <ul className="list">
                  {items.map((item, index) => (
                    <li className="list__item" key={item.id}>
                      <Draggable draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            className="card"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            {item.label}
                          </div>
                        )}
                      </Draggable>
                    </li>
                  ))}
                  {provided.placeholder}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default EditorPane;
