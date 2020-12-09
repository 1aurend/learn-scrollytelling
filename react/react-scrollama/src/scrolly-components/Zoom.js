import React, {
  useEffect,
  useRef
} from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { Box } from 'rebass'


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
    if (active === null) { return }
    const nextX = steps[active].x
    const nextY = steps[active].y
    const nextS = steps[active].s
    if (nextS === prevS.current && nextX === prevX.current && nextY === prevY.current) { return }
    const ToPx = () => {
      const xPx = -pxFactor.current.width*(nextS-1)*nextX
      const yPx = -pxFactor.current.height*(nextS-1)*nextY
      return {x: xPx, y: yPx}
    }
    const {x, y} = ToPx()
    setTransform(
      x,
      y,
      nextS,
      1000,
      'easeOut'
    )
    prevX.current = nextX
    prevY.current = nextY
    prevS.current = nextS
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
    <Box
      height='inherit'
      width='inherit'
      bg='#DE59EB'
      >
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={0}
        defaultPositionY={0}
        options={{
          centerContent:false,
          limitToWrapper:false,
          limitToBounds:false,
        }}
        wheel={{disabled: true}}
        pan={{disabled: true}}
        pinch={{disabled: true}}
        doubleClick={{disabled: true}}
        >
        {({ setTransform, setScale, ...rest }) => (
          <TransformHandler
            setTransform={setTransform}
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
    </Box>
  )
}
