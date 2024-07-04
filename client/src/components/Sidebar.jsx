import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  IconButton,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

export function Sidebar({isDrawer, closeDrawer}) {
  const location = useLocation();
  const [tab, setTab] = useState('')
 
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])
  return (
    <Card className={`${!isDrawer && "h-[calc(100vh-2rem)] lg:block hidden  max-w-[16rem] shadow-xl border-r-[1px] "} rounded-none h-full w-full p-2   dark:bg-[rgb(16,32,42)] `}>
      <div className="mb-2 p-4 flex justify-between items-center">
        <Typography variant="h5" color="blue-gray" className="dark:!text-white">
          Sidebar
        </Typography>
        {isDrawer && <IconButton className="dark:text-white" variant="text" color="blue-gray" onClick={closeDrawer}>
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
          </IconButton>}
      </div>
      <List >

        {/* <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          E-Commerce
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem> */}
        <ListItem className={`text-gray-700 dark:text-white    ${tab === 'profile'?"bg-gray-200 dark:bg-white/20":"hover:bg-gray-200 dark:hover:bg-white/20"}`}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        {/* <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem> */}
        <ListItem className="text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:text-white  dark:hover:bg-white/20">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}