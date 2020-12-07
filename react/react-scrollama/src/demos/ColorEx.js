import React from 'react'
import CenterScrolly from '../scrolly-components/CenterScrolly'
import SideScrolly from '../scrolly-components/SideScrolly'
import MockAnim from './MockAnim'
import steps from './textSteps'
import { Box } from 'rebass'


export default function ColorEx() {
  return (
    <>
    <Box
      height='75%'
      id='top-padding'
      >
    </Box>
    <CenterScrolly id='one' steps={steps}>
      <MockAnim />
    </CenterScrolly>
    <Box
      height='75%'
      id='middle-padding'
      >
    </Box>
    <SideScrolly id='two' steps={steps} textBoxColor='#76a9ee' right={false}>
      <MockAnim />
    </SideScrolly>
    <Box
      height='75%'
      id='middle-padding'
      >
    </Box>
    <SideScrolly
      id='three'
      steps={steps}
      textColumnWidth={0.3}
      stickyHeight='70vh'
      stickyWidth='50vw'
      topOffset={0.15}
      bottomOffset={0.85}
      >
      <MockAnim />
    </SideScrolly>
    <Box
      height='75%'
      id='bottom-padding'
      >
    </Box>
    </>
  )
}
