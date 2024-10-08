import { Button, Collapse, IconButton, Navbar, Typography } from '@material-tailwind/react';
import React from 'react'
import NavList from './NavList';
import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/outline';
import SearchInput from './SearchInput';
import MobileSearchInput from './MobileSearchInput';
import { Logo } from './index'
import { useDispatch, useSelector } from 'react-redux';
import { ProfileDropDown } from './ProfileDropDown';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import { toggleDarkMode } from '../redux/theme/themeSlice';
export default function NavbarSection() {
    const dispatch = useDispatch()
    const { theme } = useSelector(state => state.theme)
    const [openNav, setOpenNav] = React.useState(false);
    const [isClick, setIsClick] = React.useState(false);
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const { pathname: path } = useResolvedPath()

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    return (
        // mx-auto max-w-screen-2xl

        <Navbar className="fixed top-0 z-50 max-w-full px-4 py-4 rounded-none ">
            <div className="flex items-center justify-between ">
                <Logo />

                {/* search input */}
                <SearchInput />

                <div className="hidden lg:block">
                    <NavList />
                </div>
                {/* <div className=" gap-2 lg:flex">
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className=""
                        onClick={()=>setIsClick(!isClick)}
                    >
                        {isClick ?<MoonIcon className="h-6 w-6" strokeWidth={2} />: <SunIcon className="h-6 w-6" strokeWidth={2}/>}
                    </IconButton>
                    <Button variant="outlined" color='light-blue' size="sm">
                        Sign In
                    </Button>
                </div> */}
                <div className=' flex items-center gap-1 justify-end'>
                    <MobileSearchInput />
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className=""
                        onClick={() => dispatch(toggleDarkMode())}
                    >
                        {theme !== 'light' ? <MoonIcon className="h-6 w-6" strokeWidth={2} /> : <SunIcon className="h-6 w-6" strokeWidth={2} />}
                    </IconButton>
                    {!user ? <div>
                        { path === '/sign-in' ? <Button variant="outlined" color='light-blue' size="sm" onClick={() => navigate('/sign-up')}>
                            Sign Up
                        </Button>:<Button variant="outlined" color='light-blue' size="sm" onClick={()=> navigate('/sign-in')}>
                        Sign In
                    </Button>}
                    </div> : <ProfileDropDown user={user} />}
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="lg:hidden"
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                        ) : (
                            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                        )}
                    </IconButton>
                </div>

            </div>
            <Collapse open={openNav}>
                <NavList />

            </Collapse>
        </Navbar>
    );
}
