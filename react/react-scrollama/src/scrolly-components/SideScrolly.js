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


export default function SideScrolly(props) {
  const {
    children,
    steps,
    id,
    topOffset,
    bottomOffset,
    stickyHeight,
    stickyWidth,
    textBoxColor,
    textBoxWidth,
    textColor,
    spacingBetween,
    right,
    textColumnWidth,
    animationPadding,
    fontSize,
    titleSize
  } = props
  const [activeStep, setActive] = useState(null)
  const numSteps = Object.keys(steps).length

  useEffect(() => {
    const reset = response => {
      if (response.direction === 'up' && response.index === 0) {
        setActive(null)
      }
    }
    const activateTopStep = response => {
      if (response.direction === 'up') {
        setActive(response.index)
      }
    }
    const activateBottomStep = response => {
      if (response.direction === 'down') {
        setActive(response.index)
      }
    }
    const topParams = {
      offset: topOffset,
      enter: activateTopStep,
      id: id
    }
    const bottomParams = {
      offset: bottomOffset,
      enter: activateBottomStep,
      exit: reset,
      id: id
    }
    createScrollamaTrigger(topParams)
    createScrollamaTrigger(bottomParams)
  }, [id, bottomOffset, topOffset])

  const title = steps.title ? steps.title : null
  const boxSteps = Object.keys(steps)
    .filter(step => step !== 'title')
    .map((step, i) => {
      return <Box
              bg={textBoxColor}
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
              fontSize={fontSize}
              fontFamily={`Castoro`}
              mb={i+1 === numSteps? '100%' : spacingBetween}
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
      flexDirection='row'
      >
      {right && <Flex
        flexDirection='column'
        alignItems='center'
        p='5%'
        width={`${textColumnWidth*100}%`}
        >
        <Box
          height={title ? `100vh` : `${bottomOffset*100}vh`}
          width={textBoxWidth}
          fontSize={titleSize}
          fontFamily={`Castoro`}
          fontWeight={800}
          textAlign='center'
          pt='40vh'
          >
          {title}
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
      </Flex>}
      <Flex
        flexDirection='column'
        alignItems='center'
        p={animationPadding}
        width={`${(1-textColumnWidth)*100}%`}
        >
        <Box
          className={`${id}-sticky`}
          height={stickyHeight}
          width={stickyWidth}
          sx={{position: 'sticky', top: `${topOffset*100}%`}}
          >
          {animation}
        </Box>
      </Flex>
      {!right && <Flex
        flexDirection='column'
        alignItems='center'
        p='5%'
        width={`${textColumnWidth*100}%`}
        >
        <Box
          height={`${bottomOffset*100}vh`}
          width={textBoxWidth}
          >
        </Box>
        {boxSteps}
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
  stickyHeight: PropTypes.string,
  stickyWidth: PropTypes.string,
  textBoxColor: PropTypes.string,
  textBoxWidth: PropTypes.string,
  textColor: PropTypes.string,
  spacingBetween: PropTypes.string,
  right: PropTypes.bool,
  textColumnWidth: PropTypes.number,
  animationPadding: PropTypes.string,
  fontSize: PropTypes.string,
  titleSize: PropTypes.string
}

SideScrolly.defaultProps = {
  id: 'xyz',
  topOffset: 0.25,
  bottomOffset: 0.75,
  stickyHeight: '50vh',
  stickyWidth: '40vw',
  textBoxColor: '#d6dbe1',
  textBoxWidth: '90%',
  textColor: 'black',
  spacingBetween: '150%',
  right: true,
  textColumnWidth: 0.5,
  animations: '5%',
  fontSize: '1em',
  titleSize: '2em'
}
