import React from "react";
import MentionItem from "../MentionItem/MentionItem";
import cl from "./MentionList.module.css";
import Button from "../../UI/Button/Button";

const MentionList = ({ mentions }) => {

    if (!mentions.length) {
        return <h1>Нет упоминаний</h1>;
    }


    const exportData = () => {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(mentions, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "mentions.json";
        link.click();
    };
    return (
        <>

            <h1>Всего упоминаний: {mentions.length}</h1>
            <Button onClick={exportData}>Скачать все</Button>

            <div className={cl.mentionList}>
                {mentions.map((mention, index) => (
                    <MentionItem key={index} mention={mention}/>
                ))}
            </div>

        </>

    );
};

export default MentionList;
