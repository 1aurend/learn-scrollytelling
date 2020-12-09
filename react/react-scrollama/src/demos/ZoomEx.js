import React from 'react'
import CenterScrolly from '../scrolly-components/CenterScrolly'
import SideScrolly from '../scrolly-components/SideScrolly'
import Zoom from '../scrolly-components/Zoom'
import dataViz from './dataviz.jpg'
import { textSteps, imgSteps } from './imgZoom/content'


export default function ZoomEx() {
  return (
    <SideScrolly
      id='main'
      steps={textSteps}
      topOffset={0}
      bottomOffset={0.85}
      animationPadding={0}
      textColumnWidth={0.25}
      stickyWidth={'75vw'}
      stickyHeight={'100vh'}
      spacingBetween={'60vh'}
      fontSize={'1.75em'}
      titleSize={'2.5em'}
      textBoxColor={'none'}
      textBoxWidth={'100%'}
      >
      <Zoom steps={imgSteps} src={dataViz} />
    </SideScrolly>
  )
}
