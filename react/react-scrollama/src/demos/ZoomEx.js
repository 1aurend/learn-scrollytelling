import React from 'react'
import CenterScrolly from '../scrolly-components/CenterScrolly'
import SideScrolly from '../scrolly-components/SideScrolly'
import ControlledZoom from '../scrolly-components/ControlledZoom'
import dataViz from './dataviz.jpg'
import { textSteps, imgSteps } from './imgZoom/content'
import useWindowSize from '../hooks/useWindowSize'


export default function ZoomEx() {
  const width = useWindowSize().width
  return (
    <>
    {width > 1028 &&
      <SideScrolly
        id='main'
        steps={textSteps}
        topOffset={0}
        bottomOffset={0.85}
        animationPadding={0}
        textColumnWidth={0.25}
        stickyWidth={'75vw'}
        stickyHeight={'100vh'}
        spacingBetween={'50vh'}
        fontSize={'1.75em'}
        titleSize={'2.5em'}
        textBoxColor={'none'}
        textBoxWidth={'100%'}
        >
        <ControlledZoom
          steps={imgSteps}
          src={dataViz}
          alt="biggest jpg I could find"
          />
      </SideScrolly>
    }
    {width <= 1028 &&
      <CenterScrolly
        id='main'
        steps={textSteps}
        topOffset={0}
        bottomOffset={.95}
        stickyWidth={'100vw'}
        stickyHeight={'100vh'}
        fontSize={'1.5em'}
        titleSize={'2.5em'}
        textBoxWidth={'60%'}
        minOpacity={1}
        maxOpacity={1}
        spacingBetween={'100vh'}
        >
        <ControlledZoom
          steps={imgSteps}
          src={dataViz}
          alt="biggest jpg I could find"
          />
      </CenterScrolly>
    }
  </>
  )
}
