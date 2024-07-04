import { Typography } from '@material-tailwind/react'
import React from 'react'

export default function Logo({isFooter}) {
    return (
        <Typography
            as="a"
            href="/"
            variant="h6"
            className={`mr-4 cursor-pointer self-center whitespace-nowrap  ${isFooter?'text-lg':'text-sm'} sm:text-xl font-semibold dark:text-white text-gray-700 py-1.5 lg:ml-2`}
        >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Farhan&apos;s</span>Blog
        </Typography>
    )
}
