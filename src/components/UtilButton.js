import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import { useCustomStyles } from '../constants/styles'

const useStyles = makeStyles((theme) => ({
  btn: {
    height: 25,
    minWidth: '40%',
    color: '#fff',
    margin: '0 1%',
    fontSize: '4pt',
    borderRadius: 10,
    textAlign: 'center',
    border: '1px solid #fff',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(
      1
    )}px`,
    [theme.breakpoints.up('md')]: {
      minWidth: '40%',
      height: 40,
      margin: '0 auto',
      marginTop: '2%',
      maxWidth: 250,
    },
  },
}))

export default function UtilButton(props) {
  const classes = useCustomStyles()
  const classex = useStyles()
  return (
    <Button
      size='small'
      color={`${props.color ? props.color : 'secondary'}`}
      variant='contained'
      className={clsx(classex.btn, classes.slideDownToUp)}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  )
}
