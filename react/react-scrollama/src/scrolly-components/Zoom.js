import React from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { Flex } from 'rebass'
import dataViz from '../demos/dataviz.jpg'


export default function Zoom(props) {
  const {
    src,
    steps,
    active
  } = props

  return (
    <Flex
      height='inherit'
      width='inherit'
      bg='#DE59EB'
      justifyContent='flex-start'
      >
      <TransformWrapper
        defaultScale={.25}
        defaultPositionX={0}
        defaultPositionY={0}
        options={{
          disabled:true,
          centerContent:false,
          limitToBounds:false,
        }}
        >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <TransformComponent>
            <img src={dataViz} alt="dataviz infographic" />
          </TransformComponent>
        )}
      </TransformWrapper>
    </Flex>
  )
}
