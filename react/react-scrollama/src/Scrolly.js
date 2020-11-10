import React, { useState, useEffect } from 'react'
import scrollama from 'scrollama'
import 'intersection-observer'
import {
  Box,
  Flex
} from 'rebass'
import Test from './Test'

const createScrollamaTrigger = (offset, callback) => {
  const trigger = scrollama()
  trigger
    .setup({
      step: '.step',
      offset: offset,
      progress: true,
      threshold: 4,
      debug: true
    })
    .onStepProgress(callback)
  window.addEventListener('resize', trigger.resize)
}

export default function Scrolly({ children }) {
  const [opacity, setOpacity] = useState([0.2, 0.2])
  useEffect(() => {
    const changeOpacity = response => {
      setOpacity(opacity => {return {...opacity, [response.index]: 0.2 + response.progress}})
    }
    createScrollamaTrigger(0.5, changeOpacity)
  }, [])

  console.log(children)

  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      height='200vh'
      bg='gray'
      >
      <Box
        height='80vh'
        >
      </Box>
      <Box
        bg='teal'
        sx={{opacity: opacity[0]}}
        width='40%'
        height='10%'
        className='step'
        textAlign='center'
        mb='20%'
        >
        Opacity: {opacity[0]*100}%
      </Box>
      <Test opacity={opacity} />
      <Box
        height='80vh'
        >
      </Box>
    </Flex>
  )
}
