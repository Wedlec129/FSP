import React from "react";
import cl from './MentionItem.module.css';

const MentionItem = ({ mention }) => {
    return (
        <div className={cl.mentionContainer}>
            <div className={cl.mentionAuthor}>
                <strong>{mention.authorName}</strong>
            </div>
            <div className={cl.mentionText}>
                {mention.mentionText}
            </div>


            <div className={cl.mentionDate}>
                {new Date(mention.tweetDate).toLocaleString()}
            </div>

            <div className={cl.mentionLikes}>
                Лайки: {mention.mentionLikes ? mention.mentionLikes : 0}
            </div>


        </div>
    );
};

export default MentionItem;
