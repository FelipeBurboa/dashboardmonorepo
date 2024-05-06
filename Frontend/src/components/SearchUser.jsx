import { IoSearchOutline } from "react-icons/io5";

const SearchUser = ({ setSearchValue, setPage }) => {
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    setPage(1);
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="searchSeccion border border-blue-500 h-12 rounded-lg flex items-center w-80">
        <div className=" bg-blue-500 text-white font-bold py-1 px-1 rounded m-2">
          <IoSearchOutline className="text-white" size={20} />
        </div>
        <input
          className="searchInput w-full border-none pl-2 mr-3"
          type="text"
          placeholder="Search"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchUser;
