import React from 'react'
import CenterScrolly from '../scrolly-components/CenterScrolly'
import SideScrolly from '../scrolly-components/SideScrolly'
import MockAnim from './MockAnim'
import steps from './textSteps'
import { Box } from 'rebass'
import Zoom from '../scrolly-components/Zoom'
import dataViz from './dataviz.jpg'


export default function ZoomEx() {
  return (
    <SideScrolly
      id='main'
      steps={steps}
      topOffset={0}
      animationPadding={0}
      textColumnWidth={0.25}
      stickyWidth={'75vw'}
      stickyHeight={'100vh'}
      >
      <Zoom />
    </SideScrolly>
  )
}
