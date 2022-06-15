import React from 'react'
import { Typography, Link} from '@mui/material'

export default function Copyrigth () {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://www.plg.inf.uc3m.es//">
          Planning and Learning Group UC3M
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  )
}
