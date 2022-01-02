import React from 'react'
import { Link } from 'react-scroll'
import { useQuery } from 'react-query'
import { ListSubheader } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import { collection, getDocs } from 'firebase/firestore'
import { Box, CircularProgress } from '@material-ui/core'
import { Paper, TextField, Typography } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import AddCommentOutlined from '@material-ui/icons/AddCommentOutlined'
import { Avatar, Button, Fab, List, ListItem } from '@material-ui/core'
import { deleteBlog, updateBlog } from '../../../config'
import { createBlog, db } from '../../../config'
import { useStyles } from './styles'

export default function Index() {
  const classes = useStyles()
  const [hero, setHero] = React.useState('')
  const [text, setText] = React.useState('')
  const [isOpen, setIsOpen] = React.useState(false)
  const [isEdited, setIsEdited] = React.useState(false)
  const { isLoading, error, data, refetch } = useQuery(
    'blogsPost',
    async () => {
      let myArr = []
      const queryDB = await getDocs(collection(db, 'blogs'))
      queryDB.docs.forEach((doc) => myArr.unshift(doc.data()))
      return myArr
    }
  )

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

  const handlePostComment = () => {
    if (isEdited) {
      updateBlog(hero, {
        name: hero,
        text: text,
      })
      setText('')
      setHero('')
      setIsEdited(false)
      setIsOpen(false)
      setTimeout(() => refetch(), 200)
      return
    }
    const dateTime = new Date().toLocaleString()
    let newComment = {
      name: hero,
      date: dateTime,
      text,
    }
    createBlog(hero, newComment)
    setTimeout(() => {
      setText('')
      setHero('')
      setIsOpen(false)
    }, 100)
    setTimeout(() => refetch(), 200)
  }

  const validate = text.trim() === '' || hero.trim() === ''
  return (
    <React.Fragment>
      <List className={classes.list}>
        {data.map(({ name, text, date }, index) => (
          <Paper key={name + index} className={classes.paper}>
            <ListSubheader className={classes.subheader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <Avatar />
                <h1>{name}</h1>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <p style={{ margin: 0, marginLeft: 20 }}>{date}</p>
                <div
                  style={{
                    width: '20%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <CreateIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setIsEdited(true)
                      setIsOpen(!isOpen)
                      setHero(name)
                      setText(text)
                    }}
                  />
                  <DeleteForeverIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      deleteBlog('blogs', name)
                      setTimeout(() => refetch(), 200)
                    }}
                  />
                </div>
              </div>
            </ListSubheader>
            {index === 7 && (
              <ListSubheader className={classes.subheader}>
                Older Blogs
              </ListSubheader>
            )}
            <ListItem button>
              <div>
                <p>{text}</p>
              </div>
            </ListItem>
          </Paper>
        ))}
      </List>
      {isOpen && (
        <Paper className={classes.commentWrap}>
          <div
            style={{
              width: '90%',
              minWidth: 300,
              margin: '0 auto',
            }}
          >
            <Typography
              color='secondary'
              className={classes.text}
              variant='h5'
              style={{ textAlign: 'center' }}
              gutterBottom
            >
              Add Blog
            </Typography>
            <p style={{ textAlign: 'center' }}>
              <span style={{ color: 'tomato' }}>Note: </span>Name must be unique
              except on edit
            </p>
            <TextField
              id='outlined-name'
              label='Enter Name'
              variant='outlined'
              value={hero}
              className={classes.comment}
              onChange={(event) => setHero(event.target.value)}
            />
            <TextField
              id='outlined-text'
              label="What's on you mind?"
              variant='outlined'
              value={text}
              multiline
              rows={12}
              className={classes.comment}
              onChange={(event) => setText(event.target.value)}
            />
            <Link
              activeClass='active'
              to='navBar'
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
            >
              <Button
                size='medium'
                color='Secondary'
                variant='contained'
                disabled={validate}
                className={classes.comment}
                onClick={handlePostComment}
              >
                Post Updates
              </Button>
            </Link>
          </div>
        </Paper>
      )}
      <Fab
        color='primary'
        aria-label='add'
        className={classes.fab}
        onClick={() => setIsOpen(!isOpen)}
      >
        <AddCommentOutlined />
      </Fab>
    </React.Fragment>
  )
}
