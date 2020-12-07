import React from 'react'
import CenterScrolly from '../scrolly-components/CenterScrolly'
import SideScrolly from '../scrolly-components/SideScrolly'
import MockAnim from './MockAnim'
import steps from './textSteps'
import { Box } from 'rebass'
import Zoom from '../scrolly-components/Zoom'
import dataViz from './dataviz.jpg'


export default function ZoomEx() {
  const zooms = {
    0: {x: 0, y: 0, s: .25},
    1: {x: -100, y: -50, s: .5},
    2: {x: -150, y: -75, s: .75},
    3: {x: -50, y: -75, s: .75},
    4: {x: 0, y: 0, s: .25}
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
      <Zoom steps={zooms} />
    </SideScrolly>
  )
}
