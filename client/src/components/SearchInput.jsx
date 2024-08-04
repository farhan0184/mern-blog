import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function SearchInput() {
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.search) {
            const urlParams = new URLSearchParams(location.search);
            const searchTermFromUrl = urlParams.get("searchTerm");
            if (searchTermFromUrl) {
                setSearchTerm(searchTermFromUrl);
            }
        }else{
            setSearchTerm("")
        }
    }, [location.search])
    // console.log(location)

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            navigate(`/search?searchTerm=${searchTerm}`);
        }
    }
    return (
        <div className="relative lg:flex hidden gap-2 ">
            <Input
                label="Type here..."
                containerProps={{
                    className: "lg:w-[200px] lg:block hidden ",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Button
                size="sm"
                color="white"
                className="!absolute lg:p-0 p-1 bg-transparent lg:border-none border-2   shadow-none  right-1 top-1/2 -translate-y-1/2 lg:rounded-lg rounded-full"
                onClick={handleSearch}
            >
                <MagnifyingGlassIcon className="h-6 w-6 text-blue-500" />
            </Button>
        </div>
    )
}
