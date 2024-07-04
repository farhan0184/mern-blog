import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Drawer, IconButton } from '@material-tailwind/react';
import React from 'react'
import { Sidebar } from './Sidebar';

export default function SidebarDrawer() {
    // const [open, setOpen] = React.useState(0);
    // const [openAlert, setOpenAlert] = React.useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    // const handleOpen = (value) => {
    //     setOpen(open === value ? 0 : value);
    // };

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);
    return (
        <div>
            <IconButton variant="text" size="lg" onClick={openDrawer} className='dark:text-white lg:hidden block'>
                {isDrawerOpen ? (
                    <XMarkIcon className="h-8 w-8 stroke-2" />
                ) : (
                    <Bars3Icon className="h-8 w-8 stroke-2" />
                )}
            </IconButton>
            <Drawer open={isDrawerOpen} onClose={closeDrawer} className=''>
                {/* <IconButton variant="text" color="blue-gray" onClick={closeDrawer} className='bg-transparent'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </IconButton> */}
                <Sidebar isDrawer={true} closeDrawer={closeDrawer}/>
            </Drawer>

        </div>
    )
}
