import React, { useEffect } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { Flex } from 'rebass'
import dataViz from '../demos/dataviz.jpg'


const TransformHandler = props => {
  const {
    setTransform,
    active,
    steps
  } = props
  useEffect(() => {
    setTransform(
      steps[active? active : 0].x,
      steps[active? active : 0].y,
      steps[active? active : 0].s,
      1000,
      'easeOut'
    )
  }, [active, steps, setTransform])
  return props.children
}

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
        defaultScale={steps[active? active : 0].s}
        defaultPositionX={steps[active? active : 0].x}
        defaultPositionY={steps[active? active : 0].y}
        options={{
          centerContent:false,
          limitToBounds:false,
        }}
        wheel={{disabled: true}}
        pan={{disabled: true}}
        pinch={{disabled: true}}
        doubleClick={{disabled: true}}
        >
        {({ setTransform, ...rest }) => (
          <TransformHandler
            setTransform={setTransform}
            active={active}
            steps={steps}
            >
            <TransformComponent>
              <img src={dataViz} alt="dataviz infographic" />
            </TransformComponent>
          </TransformHandler>
        )}
      </TransformWrapper>
    </Flex>
  )
}
