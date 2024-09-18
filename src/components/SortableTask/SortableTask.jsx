import React, { useEffect } from "react";
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
      ref={props.pinned || props.editing ? null : setDraggableNodeRef}
      wrapperRef={props.pinned ? null : setDroppableNodeRef}
      style={style}
      depth={depth}
      ghost={isDragging}
      overTaskList={isDragging && overTaskList}
      disableSelection={iOS}
      disableInteraction={isSorting}
      handleProps={
        !props.editing &&
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
      isDisable={isDisable}
    />
  );
};
