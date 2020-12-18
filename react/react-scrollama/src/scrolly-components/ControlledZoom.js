import React, {
  useEffect,
  useState,
  useRef
} from 'react'
import { Box } from 'theme-ui'
import PropTypes from 'prop-types'
import useWindowSize from '../hooks/useWindowSize'


const ZoomWrapper = ({children}) => {
  return (
    <Box
      width='fit-content'
      height='fit-content'
      m={0}
      sx={{
        zIndex: 10,
        overflow: 'hidden',
      }}
      >
      {children}
    </Box>
  )
}

const ZoomContent = (props) => {
  const {
    translate,
    scale,
    transition,
    children
  } = props
  return (
    <Box
      width='fit-content'
      height='fit-content'
      m={0}
      sx={{
        transform: `translate(${translate}) scale(${scale})`,
        transition: transition,
      }}
      >
      {children}
    </Box>
  )
}


export default function ControlledZoom(props) {
  const {
    src,
    alt,
    imgWidth,
    steps,
    active,
  } = props
  const windowSize = useWindowSize()
  const [translate, setTranslate] = useState(null)
  const [scale, setScale] = useState(1)
  const [transition, setTransition] = useState(null)
  const prevSize = useRef(windowSize)
  const img = useRef(null)

  useEffect(() => {
    if (windowSize.width !== prevSize.current.width ||
      windowSize.height !== prevSize.current.height) {
      setTransition(null)
      prevSize.current = windowSize
    }
  }, [windowSize])

  useEffect(() => {
    if (active === null) {
      return
    }
    const currentStep = steps[active]
    if (windowSize.height < img.current.height ) {
      const hidden = (img.current.height-windowSize.height)/img.current.height
      if (1-currentStep.y < hidden) {
        const diff = currentStep.y-hidden
        setTranslate(`${(.5-currentStep.x)*currentStep.s*100}%, ${(((.5-currentStep.y)*currentStep.s)-diff)*100}%`)
      } else {
        setTranslate(`${(.5-currentStep.x)*currentStep.s*100}%, ${(.5-currentStep.y)*currentStep.s*100}%`)
      }
      setTransition(`transform ${currentStep.d || '2s'} ${currentStep.a || 'ease-out'}`)
      setScale(currentStep.s)
      return
    }
    setTransition(`transform ${currentStep.d || '2s'} ${currentStep.a || 'ease-out'}`)
    setTranslate(`${(.5-currentStep.x)*currentStep.s*100}%, ${(.5-currentStep.y)*currentStep.s*100}%`)
    setScale(currentStep.s)
  }, [active, steps, windowSize])

  return (
    <ZoomWrapper>
      <ZoomContent
        translate={translate}
        scale={scale}
        transition={transition}
        >
        <img ref={img} src={src} alt={alt} style={{width: imgWidth}}/>
      </ZoomContent>
    </ZoomWrapper>
  )
}

ControlledZoom.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  steps: PropTypes.object,
  active: PropTypes.number,
  imgWidth: PropTypes.string
}
ControlledZoom.defaultProps = {
  imgWidth: '75vw'
}
