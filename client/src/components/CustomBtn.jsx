import React from 'react'
import LoafingBtnSvg from './LoafingBtnSvg'
import { Button } from '@material-tailwind/react'

export default function CustomBtn({title,loading}) {
    return (
        <Button type="submit" className="mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" fullWidth>
            {loading ? <LoafingBtnSvg /> : title}
        </Button>
    )
}
