import React, {
  useEffect,
  useState,
  useRef
} from 'react'
import {
  Flex,
  Box,
  Button
} from 'rebass'


export default function Viewer(props) {
  const [translate, setTranslate] = useState(null)
  const [scale, setScale] = useState(null)
  const [transition, setTransition] = useState(null)

  const animateTransition = () => {
    setTransition('transform 2s ease-out')
    setTranslate('10vw, 10vw')
    setScale(2)
    setTimeout(() => setTransition(null), 2500)
  }
  const reverseTransition = () => {
    setTransition('transform 2s ease-out')
    setTranslate(0)
    setScale(1)
    setTimeout(() => setTransition(null), 2500)
  }

  return (
    <Flex
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      width='100vw'
      height='100vh'
      >
      <Flex
        width='50vw'
        height='50vw'
        justifyContent='center'
        alignItems='center'
        sx={{
          border: '10px solid #3D4849',
          zIndex: 10,
          overflow: 'hidden',
        }}
        >
        <Flex
          bg='#DE59EB'
          sx={{
            border: '5px solid #5257F7',
            transform: `translate(${translate}) scale(${scale})`,
            transition: transition,
            flexShrink: 0
          }}
          height='60vw'
          width='60vw'
          justifyContent='center'
          alignItems='center'
          >
          <Box
            bg='white'
            height='5vw'
            width='5vw'
            >
          </Box>
        </Flex>
      </Flex>
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
