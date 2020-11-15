import React, { useEffect } from 'react'
import { Box } from 'rebass'
import axios from 'axios'


export default function Test({ opacity }) {
  // useEffect(() => {
  //   const config = {
  //     method: 'get',
  //     url: 'http://jkafader1.fnf.archive.org/api/song',
  //     responseType: 'application/json',
  //     credentials: true
  //   }
  //   const songs = async () => {
  //     try {
  //       const data = await axios(config)
  //       console.log(data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   songs()
  // }, [])

  return (
    <Box
      bg='teal'
      sx={{opacity: opacity[1]}}
      width='40%'
      height='10%'
      className='step'
      textAlign='center'
      >
      Opacity: {opacity[1]*100}%
    </Box>
  )
}
