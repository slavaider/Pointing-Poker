import React, { FC, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import SettingsIssuesCard from "./SettingsIssuesCard";
import ModalIssues from "./Issues-modal";
import styles from "./Issues.module.scss";
import stylesPage from "../Settings.module.scss";
import { useAppSelector } from "src/hooks";

interface Cards {
  cardTitle: string;
  priority: string;
  linkToIssue: string;
  id: number;
}

const Issues: FC = () => {
  const issues: Cards[] = useAppSelector((state) => state.settings.issues);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const priorityValueDefault = "Low";
  const idLastIssue = issues.length > 0 ? issues[issues.length - 1].id : 0;
  const onClick = () => {
    setIsModalVisible(true);
  };
  return (
    <div>
      <h4 className={stylesPage.title}>Issues:</h4>
      <div className={styles.container}>
        {issues.map((item, index) => (
          <SettingsIssuesCard
            cardTitle={item.cardTitle}
            priority={item.priority}
            linkToIssue={item.linkToIssue}
            id={item.id}
            key={`${item.cardTitle}-${index}`}
          />
        ))}
        <button className={styles.card__wrapper_new__issue} onClick={onClick}>
          Create new Issue
          <PlusOutlined />
        </button>
      </div>
      {isModalVisible ? (
        <ModalIssues
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          props={{
            cardTitle: "",
            priority: priorityValueDefault,
            linkToIssue: "",
            id: idLastIssue + 1,
          }}
          issueMode="create"
          modalTitle="Create Issue"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Issues;
