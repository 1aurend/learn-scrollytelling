import React from 'react'
import CenterScrolly from '../scrolly-components/CenterScrolly'
import SideScrolly from '../scrolly-components/SideScrolly'
import steps from './textSteps'
import Zoom from '../scrolly-components/Zoom'
import dataViz from './dataviz.jpg'


export default function ZoomEx() {
  const zooms = {
    0: {x: 0, y: 0, s: 1},
    1: {x: 0, y: 0, s: 3},
    2: {x: 0, y: 0, s: 2},
    3: {x: 0, y: 0, s: 4},
    4: {x: 0, y: 0, s: 1}
  }

  return (
    <SideScrolly
      id='main'
      steps={steps}
      topOffset={0}
      animationPadding={0}
      textColumnWidth={0.25}
      stickyWidth={'75vw'}
      stickyHeight={'100vh'}
      spacingBetween={'90vh'}
      >
      <Zoom steps={zooms} src={dataViz} />
    </SideScrolly>
  )
}
