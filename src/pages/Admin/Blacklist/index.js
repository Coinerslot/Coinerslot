import React from 'react'
import { Paper } from '@material-ui/core'
import { Avatar, List, ListItem } from '@material-ui/core'
import { ListItemAvatar, ListSubheader, Typography } from '@material-ui/core'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db, updateUser } from '../../../config'
import { useStyles } from './styles'

export default function Index() {
  const classes = useStyles()
  const [refreshData, setRefreshData] = React.useState(false)
  const [data, setdata] = React.useState([])

  React.useEffect(() => {
    let ignore = false
    const fetchdata = async () => {
      let alldataArr = []
      const queryBlackList = await getDocs(
        query(collection(db, 'users'), where('IsBlackList', '==', true))
      )
      if (queryBlackList) {
        queryBlackList.docs.forEach((doc) => alldataArr.push(doc.data()))
        !ignore && setdata(alldataArr)
      }
    }
    fetchdata()

    if (refreshData) {
      fetchdata()
      setTimeout(() => {
        setRefreshData(false)
      }, 500)
    }
    return () => (ignore = true)
  }, [setdata, refreshData])


  return (
    <React.Fragment>
      {data.length <= 0 && (
        <div>
          <Typography
            color='secondary'
            variant='h4'
            style={{ textAlign: 'center', marginTop: '10%' }}
          >
            No Account on BlackList
          </Typography>
        </div>
      )}

      <List className={classes.list}>
        {data.length > 0 && (
          <ListSubheader className={classes.subheader} id='#'>
            Blacklist
          </ListSubheader>
        )}
        {data
          .sort((a, b) => new Date(a.DepositDate) - new Date(b.DepositDate))
          .map((list, index) => (
            <Paper key={list.Fullname + index}>
              <ListItem className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '90%',
                  }}
                >
                  <h2 className={classes.listTitle}>{list.Fullname}</h2>
                  <button
                    style={{
                      backgroundColor: 'tomato',
                      cursor: 'pointer',
                      margin: '2% 0%',
                      borderRadius: '7px',
                    }}
                    onClick={() => {
                      updateUser(list.Email, {
                        IsBlackList: false,
                      })
                      setRefreshData(true)
                    }}
                  >
                    Unblock User
                  </button>
                </div>
              </ListItem>
            </Paper>
          ))
          .reverse()}
      </List>
    </React.Fragment>
  )
}
