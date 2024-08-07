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
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { HiDocumentText } from "react-icons/hi";
import { MdInsertComment } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignoutSuccess } from "../redux/user/userSlice";
import axios from "axios";

export function Sidebar({ isDrawer, closeDrawer }) {
  const { user } = useSelector(state => state.user)
  const location = useLocation();
  const [tab, setTab] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log(user)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  const handleSignOut = async () => {
    try {
      const res = await axios.post('/api/user/signout')
      if (res.status === 200) {
        dispatch(userSignoutSuccess())
      } else {
        console.log(res?.data?.message)
      }
    } catch (error) {
      console.log(error?.response?.data?.message)
    }
  }
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
        {user.isAdmin && <>
          <Link to={'/dashboard?tab=dash'}>
            <ListItem className={`text-gray-700 dark:text-white py-4  flex justify-between   ${tab === 'dash' ? "bg-gray-200 dark:bg-white/20" : "hover:bg-gray-200 dark:hover:bg-white/20"}`}>
              <span className="flex items-center">
                <ListItemPrefix>
                  <FaUsers className="h-5 w-5" />
                </ListItemPrefix>
                Dashboard
              </span>
            </ListItem>
          </Link>
        </>
        }
        <Link to={'/dashboard?tab=profile'}>
          <ListItem className={`text-gray-700 dark:text-white  flex justify-between   ${tab === 'profile' ? "bg-gray-200 dark:bg-white/20" : "hover:bg-gray-200 dark:hover:bg-white/20"}`}>
            <span className="flex items-center">
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </span>
            <span className="py-1 px-2 bg-gray-500 text-white rounded-lg">{user.isAdmin ? 'Admin' : 'User'}</span>
          </ListItem>
        </Link>
        {
          user.isAdmin && <>

            <Link to={'/dashboard?tab=users'}>
              <ListItem className={`text-gray-700 dark:text-white py-4  flex justify-between   ${tab === 'users' ? "bg-gray-200 dark:bg-white/20" : "hover:bg-gray-200 dark:hover:bg-white/20"}`}>
                <span className="flex items-center">
                  <ListItemPrefix>
                    <FaUsers className="h-5 w-5" />
                  </ListItemPrefix>
                  Users
                </span>
              </ListItem>
            </Link>
            <Link to={'/dashboard?tab=comments'}>
              <ListItem className={`text-gray-700 dark:text-white py-4  flex justify-between   ${tab === 'comments' ? "bg-gray-200 dark:bg-white/20" : "hover:bg-gray-200 dark:hover:bg-white/20"}`}>
                <span className="flex items-center">
                  <ListItemPrefix>
                    <MdInsertComment className="h-5 w-5" />
                  </ListItemPrefix>
                  Comments
                </span>
              </ListItem>
            </Link>
            <Link to={'/dashboard?tab=posts'}>
              <ListItem className={`text-gray-700 dark:text-white py-4  flex justify-between   ${tab === 'posts' ? "bg-gray-200 dark:bg-white/20" : "hover:bg-gray-200 dark:hover:bg-white/20"}`}>
                <span className="flex items-center">
                  <ListItemPrefix>
                    <HiDocumentText className="h-5 w-5" />
                  </ListItemPrefix>
                  Posts
                </span>
              </ListItem>
            </Link>

          </>
        }

        <ListItem onClick={handleSignOut} className="text-gray-700 py-4 dark:text-white hover:bg-gray-200 dark:hover:text-white  dark:hover:bg-white/20">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}