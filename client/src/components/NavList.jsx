import { List, ListItem, Typography } from '@material-tailwind/react'
import { Link, useLocation } from 'react-router-dom'
import { navList } from '../lib/data'

// import NavListMenu from './NavListMenu'


export default function NavList() {
    const path = useLocation().pathname
  return (
    <List className="mt-4 md:mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
            {navList.map(item=><Typography
                key={item.id}
                as="div"
                variant="small"
                color={"blue-gray"}
                className={`font-medium ${path === item.link && 'bg-blue-gray-100 rounded-lg'}` }
                
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4"><Link to={item.link}>{item.title}</Link></ListItem>
            </Typography>)}
            {/* <NavListMenu /> */}
            
        </List>
  )
}


