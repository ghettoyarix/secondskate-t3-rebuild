import React, { memo } from "react";
import {
  DragDropContext,
  Draggable,
  type DropResult,
} from "react-beautiful-dnd";
import Image from "next/image";
import { StrictModeDroppable } from "./StrictDropable";

interface DraggerProps {
  providedArray: File[];
  updateArray: (newArray: File[]) => void;
  removeItem: (item: File) => void;
}

function Dragger({ providedArray, updateArray, removeItem }: DraggerProps) {
  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = Array.from(providedArray);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem!);

    updateArray(items);
  }
  return (
    <div>
      <header>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <StrictModeDroppable droppableId="characters" direction="horizontal">
            {(provided) => (
              <div
                className="grid grid-cols-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {providedArray.map((file, index) => {
                  return (
                    <Draggable
                      key={file.name}
                      draggableId={file.name}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative "
                        >
                          <div className=" relative 	    mb-3 h-[156px]  w-[156px]">
                            <Image
                              alt="preview"
                              className="rounded-md object-cover"
                              fill
                              src={URL.createObjectURL(file)}
                            ></Image>
                          </div>

                          <Image
                            alt="remove"
                            onClick={() => removeItem(file)}
                            className="absolute left-[126px] top-2 cursor-pointer rounded-full bg-white"
                            height={24}
                            id={index.toString()}
                            width={24}
                            src={"/svg/remove.svg"}
                          ></Image>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </header>
    </div>
  );
}
const memoDragger = memo(Dragger);
export default memoDragger;
