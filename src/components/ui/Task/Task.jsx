import React, { forwardRef, useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { useOutsideAlerter } from "../../../hooks/useOutsideAlerter";
import { ColorPicker } from "../ColorPicker";
import { DatePicker } from "../DatePicker/DatePicker";
import styles from "./Task.module.css";

export const Task = forwardRef(
  (
    {
      id,
      childCount,
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      style,
      value,
      wrapperRef,
      isGroup,
      color,
      name,
      isSelected,
      onSelect,
      cloneDepth,
      overTaskList,
      mixedDepth,
      onResolve,
      checked,
      editing,
      date,
      isDisable,
      handleSaveTask,
      handleRemoveTask,
      handleChangePropertyTask,
      handleAddTaskToGroup,
      handleContextMenu,
      handleAddGap,
      handleAddTask,
      isGap: defaultIsGap,
      pinned,
      isPinnedTask,
      hasPinned,
      ...props
    },
    ref
  ) => {
    const titleRef = useRef(null);
    const contentWrapperRef = useRef(null);
    const [title, setTitle] = useState(name || "");
    const [isSaved, setIsSaved] = useState(false);

    const isGap = defaultIsGap && !editing;

    const getMargin = (depth, cloneDepth) => {
      switch (true) {
        case !!depth && !cloneDepth:
          return "-13px";
        case !depth && !!cloneDepth:
          return "13px";
        default:
          return "0px";
      }
    };

    const getMixedMargin = (depth) => {
      switch (true) {
        case !depth:
          return "-13px";
        case !!depth:
          return "13px";
        default:
          return "0px";
      }
    };

    const handleStartEditingChange = (e) => {
      e.stopPropagation();
      !editing && handleChangePropertyTask(id, "editing");
    };

    const onSaveTask = (task) => {
      handleSaveTask(task);
      setIsSaved(false);
    };

    const handleTaskClick = (e) => {
      if (e.detail > 1) {
        e.preventDefault();
      }
      onSelect(isGroup ? null : id);
      console.log(id);
    };

    const changeColor = (color) => {
      handleChangePropertyTask(id, "color", color);
    };

    const changeData = (date) => {
      handleChangePropertyTask(id, "date", date);
    };

    useEffect(() => {
      if (titleRef && titleRef.current) {
        titleRef.current.style.height = "5px";
        titleRef.current.style.height = titleRef.current.scrollHeight + "px";
      }
    }, []);

    const clickOutsideHandler = (isSubmit) => {
      if (!title && defaultIsGap) {
        onSaveTask({ id, title, checked });
        return;
      }
      if (!editing) return;
      if (isSubmit && !title) {
        onSaveTask({ id, title, checked, depth });
        onSelect(null);
        return;
      }

      if (isGroup) {
        handleChangePropertyTask(id, "name", title);
        handleChangePropertyTask(id, "editing", false);
      }

      title ? onSaveTask({ id, title, checked }) : handleRemoveTask(id);

      if (isSubmit) {
        isGroup ? handleAddTaskToGroup(id) : handleAddTask(id);
      }
    };

    useOutsideAlerter(contentWrapperRef, clickOutsideHandler, [title, editing]);

    const handleKeyDown = (e) => {
      if ((e.key === "Enter" || e.keyCode === 13) && !e.shiftKey) {
        clickOutsideHandler(true);
        e.preventDefault();
        return;
      }

      const key = e.key;
      if (key === "Backspace" || key === "Delete") {
        defaultIsGap && handleRemoveTask(id);
      }
    };

    useEffect(() => {
      if (titleRef.current) {
        titleRef.current.focus();
        titleRef.current.selectionStart = titleRef.current.value.length;
        titleRef.current.style.height = "5px";
        titleRef.current.style.height = titleRef.current.scrollHeight + "px";
      }
    }, [editing]);

    const content = (
      <>
        {!isGroup && (
          <input
            id="html"
            type="checkbox"
            className={styles.checkbox}
            checked={checked}
            onChange={onResolve}
          />
        )}
        <>
          <textarea
            ref={titleRef}
            id="textInput"
            type="text"
            className={classNames(styles.text, {
              [styles.groupText]: isGroup,
            })}
            value={editing ? title : name}
            readOnly={!editing}
            onFocus={(e) => !editing && e.preventDefault()}
            onChange={(e) => {
              e.target.style.height = "5px";
              e.target.style.height = e.target.scrollHeight + "px";
              setTitle(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          {!isGroup && (
            <div className={styles.dateIcon}>
              <DatePicker iniDate={date} onChange={changeData} />
            </div>
          )}

          {isGroup && (
            <div className={styles.dateIcon}>
              <ColorPicker color={color} onChange={changeColor} />
            </div>
          )}
        </>
      </>
    );

    return (
      <>
        <div
          className={classNames(
            styles.wrapper,
            clone && styles.clone,
            ghost && styles.ghost,
            disableSelection && styles.disableSelection,
            disableInteraction && styles.disableInteraction,
            overTaskList && styles.overTaskList,
            editing && !isGroup && styles.editing,
            isSaved && styles.saved
          )}
          ref={wrapperRef}
          style={{
            "--spacing": `${indentationWidth * depth}px`,
            "--groupColor": color,
          }}
          {...props}
        >
          <div
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              !isGroup && onSelect(id);
              handleContextMenu(
                e,
                id,
                isGroup,
                isGap,
                !!depth,
                isPinnedTask,
                hasPinned,
                checked
              );
            }}
            onMouseDown={!isGap ? handleTaskClick : undefined}
            onDoubleClick={handleStartEditingChange}
            className={classNames(styles.taskItem, {
              [styles.group]: isGroup,
              [styles.child]: !!depth,
              [styles.selected]: isSelected || editing,
              [styles.checked]: checked,
              [styles.editing]: editing && !isGroup,
              [styles.gap]: isGap,
              [styles.saved]: isSaved,
            })}
            ref={ref}
            style={{
              ...style,
              "--cloneDepth": `${
                indentationWidth * Number(depth ? !cloneDepth : -cloneDepth)
              }px`,
              "--cloneMargin":
                mixedDepth && depth !== cloneDepth
                  ? "0px"
                  : getMargin(depth, cloneDepth),
              "--cloneMarginRight":
                mixedDepth && depth !== cloneDepth
                  ? getMixedMargin(cloneDepth)
                  : "0px",
            }}
            {...handleProps}
          >
            <div
              className={classNames(styles.content, {
                [styles.contentEditing]: editing && !isGroup,
                [styles.saved]: isSaved,
              })}
              ref={contentWrapperRef}
            >
              {!isGap && content}
            </div>
          </div>
        </div>
      </>
    );
  }
);
