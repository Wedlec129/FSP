import React from "react";

import ConvertData from "../../../utils/DataFormatter";
import cl from './PostItem.module.css'

const PostItem = ({post,id}) => {

    return (

        <div className={cl.post_container}>
            <div className={cl.post_title}>
                <div className={cl.post_author_avatar}> {id} </div>
                <div className={cl.post_author_time}>{ConvertData(post.tweetDate)}</div>
            </div>
            <div className={cl.post_text}>
                {post.tweetContent}
                <div className={cl.post_url}>
                    <a href={post.mediaUrls} target="_blank" rel="noopener noreferrer">{post.mediaUrls}</a>
                </div>
            </div>
            <div className={cl.post_meta}>
                <div className={cl.post_meta_item}>Лайки: {post.tweetLikes}</div>
                <div className={cl.post_meta_item}>Ретвиты: {post.retweets}</div>
            </div>
        </div>

    )

}

export default PostItem;