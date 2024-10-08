import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MulticolorLegend from '../views/multicolor_legend/home/Home'
import ChartsOnTop from '../views/charts-on-top/home/Home'

const MyRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<MulticolorLegend/>} />
            <Route path='/chartsontop' element={<ChartsOnTop/>} />
        </Routes>
    )
}

export default MyRoutes