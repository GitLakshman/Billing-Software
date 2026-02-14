import { SearchIcon } from "lucide-react";
import { useState } from "react";

const SearchBox = ({ onSearch }: { onSearch: (text: string) => void }) => {
  const [searchText, setSearchText] = useState("");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);
    onSearch(text);
  };

  return (
    <div className="flex rounded-md shadow-sm">
      <input
        type="text"
        placeholder="search items..."
        className="flex-1 p-1 rounded-l-md border-none focus:outline-none bg-amber-50 text-gray-700"
        value={searchText}
        onChange={onChangeHandler}
      />
      <span className="inline-flex items-center px-2 rounded-r-md bg-yellow-500 text-black text-sm">
        <SearchIcon />
      </span>
    </div>
  );
};

export default SearchBox;
