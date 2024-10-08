import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MulticolorLegend from '../views/multicolor_legend/home/Home'

const MyRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<MulticolorLegend/>} />
        </Routes>
    )
}

export default MyRoutes