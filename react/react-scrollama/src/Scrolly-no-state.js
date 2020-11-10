import React, { useState, useEffect } from 'react'
import scrollama from 'scrollama'
import 'intersection-observer'
import {
  Box,
  Flex
} from 'rebass'

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

export default function StatelessScrolly() {
  useEffect(() => {
    const changeOpacity = response => {
      const el = response.element
      el.style.opacity = 0.2 + response.progress
      el.textContent = `Opacity: ${(0.2+response.progress)*100}%`
    }
    createScrollamaTrigger(0.5, changeOpacity)
  }, [])

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
        sx={{opacity: 0.2}}
        width='40%'
        height='10%'
        className='step'
        textAlign='center'
        mb='20%'
        >
        Opacity: 20%
      </Box>
      <Box
        bg='teal'
        sx={{opacity: 0.2}}
        width='40%'
        height='10%'
        className='step'
        textAlign='center'
        >
        Opacity: 20%
      </Box>
      <Box
        height='80vh'
        >
      </Box>
    </Flex>
  )
}
