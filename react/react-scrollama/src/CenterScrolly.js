import React, {
  useState,
  useEffect,
  cloneElement
} from 'react'
import scrollama from 'scrollama'
import 'intersection-observer'
import {
  Box,
  Flex
} from 'rebass'


const createScrollamaTrigger = (offset, callback, id) => {
  const trigger = scrollama()
  trigger
    .setup({
      step: `${id}-step`,
      offset: offset,
      progress: true,
      threshold: 4,
      debug: true
    })
    .onStepProgress(callback)
  window.addEventListener('resize', trigger.resize)
}


export default function CenterScrolly({ children, steps, id }) {
  const [activeStep, setActive] = useState(0)
  const [opacity, setOpacity] = useState([0.2, 0.2])
  useEffect(() => {
    const changeOpacity = response => {
      setOpacity(opacity => {return {...opacity, [response.index]: 0.2 + response.progress}})
    }
    createScrollamaTrigger(0.5, changeOpacity)
  }, [])

  const boxSteps = steps.map(step => {
    return <Box
            bg='teal'
            sx={{opacity: opacity[0]}}
            width='40%'
            height='10%'
            className={`${id}-step`}
            textAlign='center'
            mb='20%'
            >
            {step}
          </Box>
  })
  const onlyChild = React.children.only(children)
  const animation = cloneElement(onlyChild, {active: activeStep})

  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      p='10%'
      >
      <Box
        border='2px solid teal'
        width='50%'
        height='50%'
        className={`${id}-step`}
        sx={{position: 'sticky', top: '25%'}}
        >
        {animation}
      </Box>
      {boxSteps}
    </Flex>
  )
}
