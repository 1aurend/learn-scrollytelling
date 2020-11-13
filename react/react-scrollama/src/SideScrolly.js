import React, {
  useState,
  useEffect,
  cloneElement,
  Children
} from 'react'
import 'intersection-observer'
import {
  Box,
  Flex
} from 'rebass'
import PropTypes from 'prop-types'
import createScrollamaTrigger from './utils/createScrollamaTrigger'


export default function SideScrolly(props) {
  const {
    children,
    steps,
    id,
    topOffset,
    bottomOffset,
    textBoxColor,
    minOpacity,
    maxOpacity,
    textBoxWidth,
    textColor,
    spacingBetween,
    right
  } = props
  const [activeStep, setActive] = useState(null)
  const numSteps = Object.keys(steps).length
  const [opacity, setOpacity] = useState(Array(numSteps).fill(minOpacity))

  useEffect(() => {
    const intersectTop = response => {
      const newOpacity = response.progress > maxOpacity ? maxOpacity :
       response.progress < minOpacity ? minOpacity :
       response.progress
      setOpacity(opacity => {return {...opacity, [response.index]: newOpacity}})
    }
    const intersectBottom = response => {
      const newOpacity = response.progress > maxOpacity ? minOpacity :
       response.progress < 1-maxOpacity ? maxOpacity :
       1-response.progress < minOpacity ? minOpacity :
       1-response.progress
      setOpacity(opacity => {return {...opacity, [response.index]: newOpacity}})
    }
    const reset = response => {
      if (response.direction === 'up' && response.index === 0) {
        setActive(null)
      }
    }
    const activateStep = response => {
      setActive(response.index)
    }
    const topParams = {
      offset: topOffset,
      progress: intersectTop,
      enter: activateStep,
      id: id
    }
    const bottomParams = {
      offset: bottomOffset,
      progress: intersectBottom,
      enter: activateStep,
      exit: reset,
      id: id
    }
    createScrollamaTrigger(topParams)
    createScrollamaTrigger(bottomParams)
  }, [id, bottomOffset, topOffset, maxOpacity, minOpacity])

  const boxSteps = Object.values(steps).map((step, i) => {
    return <Box
            bg={`${textBoxColor}${Math.round(opacity[i]*100)}`}
            sx={{
              zIndex: 99,
              '@media screen and (max-width: 64em)': {
                fontSize: '.9em'
              }
            }}
            width={textBoxWidth}
            className={`${id}-step`}
            textAlign='center'
            color={textColor}
            fontSize='1em'
            m='10%'
            mb={spacingBetween}
            key={i}
            p='20px'
            >
            {step}
          </Box>
  })
  const onlyChild = Children.only(children)
  const animation = cloneElement(onlyChild, {active: activeStep})

  return (
    <Flex
      flexDirection='row'
      >
      {right && <Flex
        flexDirection='column'
        alignItems='center'
        p='10%'
        width='50%'
        >
        <Box
          height={`${bottomOffset*100}vh`}
          width={textBoxWidth}
          >
        </Box>
        {boxSteps}
        <Box
          height={`${topOffset*100}vh`}
          width={textBoxWidth}
          >
        </Box>
      </Flex>}
      <Flex
        flexDirection='column'
        alignItems='center'
        p='10%'
        width='50%'
        >
        <Box
          className={`${id}-sticky`}
          sx={{position: 'sticky', top: `${topOffset*100}%`}}
          >
          {animation}
        </Box>
      </Flex>
      {!right && <Flex
        flexDirection='column'
        alignItems='center'
        p='10%'
        width='50%'
        >
        <Box
          height={`${bottomOffset*100}vh`}
          width={textBoxWidth}
          >
        </Box>
        {boxSteps}
        <Box
          height={`${topOffset*100}vh`}
          width={textBoxWidth}
          >
        </Box>
      </Flex>}
    </Flex>
  )
}

SideScrolly.propTypes = {
  steps: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  topOffset: PropTypes.number,
  bottomOffset: PropTypes.number,
  textBoxColor: PropTypes.string,
  minOpacity: PropTypes.number,
  maxOpacity: PropTypes.number,
  textBoxWidth: PropTypes.string,
  textColor: PropTypes.string,
  spacingBetween: PropTypes.string,
  right: PropTypes.bool
}

SideScrolly.defaultProps = {
  id: 'xyz',
  topOffset: 0.25,
  bottomOffset: 0.75,
  textBoxColor: '#d6dbe1',
  minOpacity: 0.4,
  maxOpacity: 0.9,
  textBoxWidth: '90%',
  textColor: 'black',
  spacingBetween: '150%',
  right: true,
}
