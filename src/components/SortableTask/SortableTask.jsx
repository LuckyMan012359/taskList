import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Task } from "../ui";
import { iOS } from "../../helpers/utilities";

const animateLayoutChanges = ({ isSorting, wasDragging }) =>
  isSorting || wasDragging ? false : true;

export const SortableTask = ({
  id,
  depth,
  draggableIsGroup,
  isUpperDraggable,
  isBelowDraggable,
  isLastChild,
  previousItem,
  date,
  isDisable,
  ...props
}) => {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
    over,
  } = useSortable({
    id,
    animateLayoutChanges,
    data: {
      parentId: props.parentId,
      groupColor: props.color,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const overTaskList = over?.data.current?.type === "tab";

  return (
    <Task
      id={id}
      // ref={null}
      ref={props.pinned || props.editing ? null : setDraggableNodeRef}
      // wrapperRef={null}
      wrapperRef={props.pinned ? null : setDroppableNodeRef}
      style={style}
      depth={depth}
      // ghost={null}
      ghost={isDisable ? null : isDragging}
      overTaskList={isDragging && overTaskList}
      disableSelection={iOS}
      // disableInteraction={null}
      disableInteraction={isDisable ? null : isSorting}
      handleProps={
        isDisable
          ? null
          : !props.editing &&
            !props.pinned && {
              ...attributes,
              ...listeners,
            }
      }
      {...props}
      color={
        isDragging && !props.isGroup
          ? previousItem?.color || previousItem?.groupColor || props.color
          : props.color
      }
      date={date}
    />
  );
};
