import React, {
  useEffect,
  useState,
  useRef
} from 'react'
import {
  Flex,
  Box,
  Button
} from 'theme-ui'
import useWindowSize from '../hooks/useWindowSize'
import dataViz from '../demos/dataviz.jpg'


const ZoomWrapper = ({children}) => {
  return (
    <Box
      width='fit-content'
      height='fit-content'
      m={0}
      sx={{
        border: '10px solid #3D4849',
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
    <Flex
      width='fit-content'
      height='fit-content'
      m={0}
      sx={{
        border: '5px solid #5257F7',
        transform: `translate(${translate}) scale(${scale})`,
        transition: transition,
      }}
      >
      {children}
    </Flex>
  )
}


export default function Viewer(props) {
  const {
    src,
    steps,
    active,
    imgWidth
  } = props
  const windowSize = useWindowSize()
  const [translate, setTranslate] = useState(null)
  const [scale, setScale] = useState(null)
  const [transition, setTransition] = useState(null)
  const prevSize = useRef(windowSize)

  useEffect(() => {
    if (windowSize.width !== prevSize.current.width ||
      windowSize.height !== prevSize.current.height) {
      setTransition(null)
      prevSize.current = windowSize
    }
  }, [windowSize])

  const animateTransition = () => {
    setTransition('transform 2s ease-out')
    setTranslate(`${-36*8}%, ${32*8}%`)
    setScale(8)
  }
  const reverseTransition = () => {
    setTransition('transform 2s ease-out')
    setTranslate(0)
    setScale(1)
  }


  return (
    <Flex
      sx={{
        flexDirection:'column',
        minHeight:'100vh',
        justifyContent:'center',
        alignItems:'center',
      }}
      width='100vw'
      >
      <ZoomWrapper>
        <ZoomContent
          translate={translate}
          scale={scale}
          transition={transition}
          >
          <img src={dataViz} alt="dataviz infographic" style={{width: '75vw'}}/>
        </ZoomContent>
      </ZoomWrapper>
      <Button
        bg='#3D4849'
        m='20px'
        mb='10px'
        onClick={animateTransition}
        >
        move!
      </Button>
      <Button
        bg='#3D4849'
        m='20px'
        mt='10px'
        onClick={reverseTransition}
        >
        back
      </Button>
    </Flex>
  )
}
