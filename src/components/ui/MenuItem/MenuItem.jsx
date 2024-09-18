import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import styles from "./MenuItem.module.css";

const animateLayoutChanges = (args) => false;

export const MenuItem = ({
  activeTab,
  handleTabChange,
  title,
  index,
  disabled,
}) => {
  const { active, over, setNodeRef } = useSortable({
    id: title,
    data: {
      type: "tab",
      children: [],
    },
    animateLayoutChanges,
  });

  useEffect(() => {

  }, [])

  const isOverTab =
    over && title === over.id && active?.data.current?.type !== "tab";

  return (
      <li
        key={index}
        className={classNames(styles.tab, {
          [styles.selected]: index === activeTab,
          [styles.hover]: isOverTab,
        })}
        onClick={() => handleTabChange(index)}
      >
        <span> {title}</span>
        <div className={styles.container} ref={disabled ? undefined : setNodeRef} />
      </li>
  );
};
