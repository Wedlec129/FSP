
import { useState } from "react";
import PostList from "../../components/Post/PostList/PostList";
import MentionList from "../../components/Mention/MentionList/MentionList";
import Loader from "../../components/UI/Loader/Loader";
import { useFetching } from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import SearchForm from "../../components/SearchForm/SearchForm";

export default function Posts() {

    const [posts, setPosts] = useState([]);
    const [mentions, setMentions] = useState([]);

    const [searchInput, setSearchInput] = useState({
        search: 'elonmusk',
        timeSearch: 1500
    });

    // Функция для загрузки постов и упоминаний
    const [fetchPostsAndMentions, isLoading, loadingError] = useFetching(async () => {
        const response = await PostService.getAll(searchInput.search, searchInput.timeSearch);
        setPosts(response.data.posts);
        setMentions(response.data.mentions);
    });

    // Функция для обработки поиска
    const search = () => {
        setPosts([]);
        setMentions([]);
        fetchPostsAndMentions();
    };



    return (
        <div className="App">
            <SearchForm
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                onSearch={search}
            />

            <hr style={{ margin: '15px 0' }} />

            {loadingError && <h1>Ошибка при загрузке: {loadingError}</h1>}

            <div className="content">
                <div className="posts">
                    <h2>Посты</h2>
                    <PostList posts={posts} />
                </div>

                <div className="mentions">
                    <h2>Упоминания</h2>
                    <MentionList mentions={mentions} />
                </div>
            </div>

            {isLoading && <Loader style={{ margin: "50px" }} />}
        </div>
    );
}
