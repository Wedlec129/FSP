import React from "react";
import PostItem from "../PostItem/PostItem";
import Button from "../../UI/Button/Button";
import cl from "./PostList.module.css";

const PostList = ({ posts }) => {

    if (!posts.length) {
        return <h1>Нет постов для отображения</h1>;
    }

    const exportData = () => {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(posts, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "posts.json";
        link.click();
    };

    return (
        <div>
            <h1>Всего постов: {posts.length}</h1>
            <Button onClick={exportData}>Скачать все</Button>
            <div className={cl.gridContainer}>
                {posts.map((post, index) => (
                    <PostItem key={index} post={post} id={index + 1} />
                ))}
            </div>
        </div>
    );
};

export default PostList;


