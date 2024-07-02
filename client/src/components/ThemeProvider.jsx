import React, { Children } from 'react'
import { useSelector } from 'react-redux'

export default function ThemeProvider({children}) {
    const {theme} = useSelector(state => state.theme)
  return (
    <div className={theme}>
        <div className='bg-white text-gray-700 dark:text-white dark:bg-[rgb(16,32,42)]'>
            {children}
        </div>
    </div>
  )
}
