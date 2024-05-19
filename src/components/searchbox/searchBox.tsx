import { IoSearchOutline } from "react-icons/io5";

interface SearchBoxProps {
    handleSearch: (text: string) => void;
    search: string;
    setSearch: (text: string) => void;
  }
  

export function SearchBox({ handleSearch, search, setSearch }: SearchBoxProps) {



    return (
        <div className="search-div h-[60%] bg-[#dfe5e758] w-[20rem] flex flex-row-reverse items-center rounded-3xl overflow-hidden">
            <span className="bg-[#c4cbcd58] rounded-full p-1 m-1">
                <IoSearchOutline className="h-8 w-8 text-[#0909093c] px-1"/>
            </span>
            <input 
                type="text" 
                className="h-full rounded-md outline-none w-full px-4 bg-transparent" 
                placeholder="Search users"
                value={search}
                onChange={(e) => {
                    const text = e.target.value;
                    setSearch(text);
                    handleSearch(text);
                  }}
            />
        </div>
    )
}