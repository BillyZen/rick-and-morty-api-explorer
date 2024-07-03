import s from "./search-bar.module.scss";
import { FaSearch } from "react-icons/fa";
import _ from "lodash";
import { SearchBarProps } from "../../../utils/type-definitions";

const SearchBar = ({ handleSearchCallback, searchQuery }: SearchBarProps) => {
  return (
    <div className={s.searchBar}>
      <FaSearch className={s.icon} />
      <input
        className={s.searchBarInput}
        placeholder={"Wubbalubbadubdub"}
        value={searchQuery}
        onChange={(e) => {
          handleSearchCallback(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
