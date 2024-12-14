import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import cl from './SearchForm.module.css'; // Импорт стилей

const SearchForm = ({ searchInput, setSearchInput, onSearch }) => {
    return (
        <div className={cl.search_wrapper}>
            <div className={cl.searchForm}>
            <Input
                placeholder="Введите ссылку"
                value={searchInput.search}
                onChange={(e) =>
                    setSearchInput({ ...searchInput, search: e.target.value })
                }
            />
            <Input
                type="number"
                min="0"
                step="500"
                placeholder="Введите время скана"
                value={searchInput.timeSearch}
                onChange={(e) =>
                    setSearchInput({ ...searchInput, timeSearch: e.target.value })
                }
            />
            <Button  onClick={onSearch}>Искать посты</Button>
        </div>
        </div>
    );
};

export default SearchForm;
