import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Link from 'next/link'
import React from 'react'
import MenuAppDrawer from '../components/MenuAppDrawer'
// import Link from './Link'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingBottom: '10px',
    },
    title: {
      flexGrow: 1,
    },
  }),
)

function MenuAppBar() {
  const classes = useStyles()
  const [auth] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='inherit'>
        <Toolbar>
          <MenuAppDrawer />
          <Link href='/'>
            <Typography variant='h6' className={classes.title}>
              Next.js with TypeScript and MaterialUI
            </Typography>
          </Link>
          {auth && (
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
          {!auth && (
            <div>
              {/* <Link href='/sign' color='primary'> */}
              <Link href='/sign'>
                <Button color='inherit'>Sign In</Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default MenuAppBar
