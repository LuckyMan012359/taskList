import React from "react";
import { MenuItem } from "../MenuItem";
import styles from "./TabsPanel.module.css";

export const TabsPanel = ({ activeTab, handleTabChange, children }) => {
  const renderMenu = () => {
    return children.map((elem, index) => {
      return (
        <MenuItem
          key={elem.props.title + elem.props.id}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          title={elem.props.title}
          index={index}
          disabled={activeTab === index}
        />
      );
    });
  };

  return (
    <div>
      <ul className={styles.tabs}>{renderMenu()}</ul>
      <div className={styles.tabContent}>{children[activeTab]}</div>
    </div>
  );
};
