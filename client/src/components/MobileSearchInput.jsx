import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Button, Input } from '@material-tailwind/react'
import React from 'react'

export default function MobileSearchInput() {
    const [open, setOpen] = React.useState()

    return (
        <div className="relative   gap-2 lg:hidden flex duration-300">
            <Input
                label="Type here..."
                containerProps={{
                    className: `w-[200px]   ${ open?'focus:block focus:-translate-y-0':' hidden -translate-y-10'} `,
                }}
            />

            <Button
                size="sm"
                color="white"
                className={`!absolute lg:p-0 p-1 bg-transparent   ${open?'border-none ':'border-[1px] border-blue-500'}   shadow-none  right-1 top-1/2 -translate-y-1/2 lg:rounded-lg rounded-full`}
                onClick={()=>setOpen(!open)}
            >
                <MagnifyingGlassIcon className="h-6 w-6 text-blue-500" />
            </Button>
        </div>
    )
}
