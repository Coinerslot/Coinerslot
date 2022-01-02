import React, { Fragment } from 'react'
import { useQuery } from 'react-query'
import { Paper } from '@material-ui/core'
import { ListSubheader } from '@material-ui/core'
import { collection, getDocs } from 'firebase/firestore'
import { Box, CircularProgress } from '@material-ui/core'
import { Avatar, List, ListItem } from '@material-ui/core'

import { db } from '../../../config'
import { useStyles } from './styles'

export default function News() {
  const classes = useStyles()
  const { isLoading, error, data } = useQuery('blogs', async () => {
    let myArr = []
    const queryDB = await getDocs(collection(db, 'blogs'))
    queryDB.docs.forEach((doc) => myArr.unshift(doc.data()))
    return myArr
  })

  if (isLoading) {
    return (
      <div>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h3 style={{ textAlign: 'center', marginTop: '10%' }}>
          An error has occurred: {error.message}
        </h3>
      </div>
    )
  }
  return (
    <section className={classes.root}>
      <Fragment>
        <List className={classes.list}>
          {[...new Set(data)].map(({ name, text, date }, index) => (
            <Paper key={name + index} className={classes.paper}>
              <ListSubheader className={classes.subheader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <Avatar />
                  <h1>{name}</h1>
                </div>
                <p style={{ margin: 0, marginLeft: 20 }}>{date}</p>
              </ListSubheader>
              <ListItem button>
                <div>
                  <p style={{ textAlign: 'justify' }}>{text}</p>
                </div>
              </ListItem>
            </Paper>
          ))}
        </List>
      </Fragment>
    </section>
  )
}
