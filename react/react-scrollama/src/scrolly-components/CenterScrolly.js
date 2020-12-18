import React, {
  useState,
  useEffect,
  cloneElement,
  Children
} from 'react'
import 'intersection-observer'
import {
  Box,
  Flex,
  Text
} from 'rebass'
import PropTypes from 'prop-types'
import createScrollamaTrigger from '../utils/createScrollamaTrigger'


export default function CenterScrolly(props) {
  const {
    children,
    steps,
    id,
    topOffset,
    bottomOffset,
    stickyHeight,
    stickyWidth,
    textBoxColor,
    minOpacity,
    maxOpacity,
    textBoxWidth,
    textColor,
    spacingBetween,
    fontSize,
    titleSize
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

  const title = steps.title ? steps.title : null
  const boxSteps = Object.keys(steps)
    .filter(step => step !== 'title')
    .map((step, i) => {
      return <Box
              bg={`${textBoxColor}FF`}
              sx={{
                zIndex: 99,
              }}
              width={textBoxWidth}
              className={`${id}-step`}
              textAlign='center'
              color={textColor}
              fontSize={fontSize}
              fontFamily={`Castoro`}
              m='10%'
              mb={spacingBetween}
              key={i}
              p='20px'
              >
              {steps[step]}
            </Box>
    })
  const onlyChild = Children.only(children)
  const animation = cloneElement(onlyChild, {active: activeStep, imgWidth: stickyWidth})

  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      p={0}
      >
      <Box
        className={`${id}-sticky`}
        width={stickyWidth}
        sx={{
          position: 'sticky',
          top: `${topOffset*100}%`,
        }}
        >
        <Flex
          flexDirection='column'
          justifyContent='center'
          bg='black'
          height='100vh'
          >
          {animation}
        </Flex>
      </Box>
      <Box
        height={title ? `100vh` : `${bottomOffset*100}vh`}
        pt='40vh'
        sx={{
          zIndex: 99,
        }}
        >
        <Box
          width={textBoxWidth}
          fontSize={titleSize}
          fontFamily={`Castoro`}
          fontWeight={800}
          textAlign='center'
          bg={`${textBoxColor}FF`}
          p='20px'
          >
          {title}
        </Box>
        <Text
          fontFamily={`Castoro`}
          textAlign='center'
          fontSize='1.25rem'
          pt='1.25rem'
          >
          Scroll down to begin.
        </Text>
      </Box>
      {boxSteps}
      <Box
        height={`${topOffset*150}vh`}
        width={textBoxWidth}
        >
      </Box>
    </Flex>
  )
}

CenterScrolly.propTypes = {
  steps: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  topOffset: PropTypes.number,
  bottomOffset: PropTypes.number,
  stickyHeight: PropTypes.string,
  stickyWidth: PropTypes.string,
  textBoxColor: PropTypes.string,
  minOpacity: PropTypes.number,
  maxOpacity: PropTypes.number,
  textBoxWidth: PropTypes.string,
  textColor: PropTypes.string,
  spacingBetween: PropTypes.string,
  fontSize: PropTypes.string,
  titleSize: PropTypes.string
}

CenterScrolly.defaultProps = {
  id: 'xyz',
  topOffset: 0.2,
  bottomOffset: 0.8,
  stickyHeight: '60vh',
  stickyWidth: '60vw',
  textBoxColor: '#d6dbe1',
  minOpacity: 0.4,
  maxOpacity: 0.9,
  textBoxWidth: '40%',
  textColor: 'black',
  spacingBetween: '40%',
  fontSize: '1em',
  titleSize: '2em'
}
