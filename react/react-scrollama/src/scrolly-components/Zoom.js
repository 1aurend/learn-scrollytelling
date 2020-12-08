import React, {
  useEffect,
  useRef
} from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { Flex } from 'rebass'


const TransformHandler = props => {
  const {
    setTransform,
    active,
    steps,
    el,
    children,
  } = props
  const prevX = useRef(0)
  const prevY = useRef(0)
  const prevS = useRef(1)
  const pxFactor = useRef()
  useEffect(() => {
    if (el) {
      el.onload = () => {pxFactor.current = el.getBoundingClientRect()}
    }
  }, [el])
  useEffect(() => {
    console.log(active)
    console.log(pxFactor.current)

    if (active === null) { return }
    const nextX = steps[active].x
    const nextY = steps[active].y
    const nextS = steps[active].s
    if (nextS === prevS.current) { return }
    const deltaX = prevX.current + nextX
    const deltaY = prevY.current + nextY
    const deltaS = -(nextS - prevS.current)
    const imgFractionToPx = () => {
      const xPx = deltaS > 0 ? -pxFactor.current.width*deltaS*.5 : (pxFactor.current.width*deltaS*.5)
      console.log(xPx)
      const yPx = deltaS > 0 ? -pxFactor.current.height*deltaS*.5 : (pxFactor.current.height*deltaS*.5)
      console.log(yPx)
      return {x: xPx, y: yPx}
    }
    let {x, y} = imgFractionToPx()
    const s = steps[active].s
    // if (nextS === 1) {
    //   x = 0
    //   y = 0
    // }
    setTransform(
      x,
      y,
      s,
      1000,
      'easeOut'
    )
    prevX.current = nextX
    prevY.current = nextY
    prevS.current = nextS
    // pxFactor.current.width = pxFactor.current.width/(nextS*3)
    // pxFactor.current.height = pxFactor.current.height/(nextS*3)
  }, [active, steps, setTransform, el])
  return children
}

export default function Zoom(props) {
  const {
    src,
    steps,
    active,
    imgWidth
  } = props
  const imgRef = useRef()

  return (
    <Flex
      height='inherit'
      width='inherit'
      bg='#DE59EB'
      justifyContent='flex-start'
      >
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={0}
        defaultPositionY={0}
        options={{
          centerContent:false,
          limitToWrapper:true,
        }}
        wheel={{disabled: true}}
        pan={{disabled: true}}
        pinch={{disabled: true}}
        doubleClick={{disabled: true}}
        >
        {({ setTransform, setScale, ...rest }) => (
          <TransformHandler
            setTransform={setTransform}
            setScale={setScale}
            active={active}
            steps={steps}
            el={imgRef.current}
            >
            <TransformComponent>
              <img ref={imgRef} src={src} alt="dataviz infographic" style={{width: imgWidth}}/>
            </TransformComponent>
          </TransformHandler>
        )}
      </TransformWrapper>
    </Flex>
  )
}
