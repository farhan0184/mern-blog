import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@material-tailwind/react";


export default function SearchInput() {
    return (
        <div className="relative lg:flex hidden gap-2 ">
            <Input
                label="Type here..."
                containerProps={{
                    className: "lg:w-[200px] lg:block hidden ",
                }}
            />

            <Button
                size="sm"
                color="white"
                className="!absolute lg:p-0 p-1 bg-transparent lg:border-none border-2   shadow-none  right-1 top-1/2 -translate-y-1/2 lg:rounded-lg rounded-full"
            >
                <MagnifyingGlassIcon className="h-6 w-6 text-blue-500" />
            </Button>
        </div>
    )
}
