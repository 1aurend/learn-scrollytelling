import React, {
   useState,
   useEffect
 } from 'react'
import { Box } from 'rebass'


export default function MockAnim({ active }) {
  const [bg, setBg] = useState('#3D4849')
  useEffect(() => {
    switch (active) {
    case null:
      setBg('#3D4849')
      return
    case 0:
      setBg('#F5502F')
      return
    case 1:
      setBg('#D62D5D')
      return
    case 2:
      setBg('#DE59EB')
      return
    case 3:
      setBg('#8546D4')
      return
    case 4:
      setBg('#5257F7')
      return
    default:
      setBg('#3D4849')
      return
    }
  }, [active])
  return (
    <Box
      height='inherit'
      width='inherit'
      bg={bg}
      >
    </Box>
  )
}
