import React, { PropTypes } from 'react'

import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {indigo500} from 'material-ui/styles/colors'


import { zIndex } from 'material-ui/styles'

const styles = {
  appBar: {
    position: 'fixed',
    backgroundColor: indigo500,
    zIndex: zIndex.appBar + 1,
    top: 0
  }
}


class Login extends React.Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      logged : false
    }
  }

  render() {
    const {
      handleTouchTapLeftIconButton
    } = this.props

    return (
      <AppBar
        onLeftIconButtonTouchTap={handleTouchTapLeftIconButton}
        title={'Material-UI'}
        zDepth={0}
        style={styles.appBar}
        showMenuIconButton={true}
        iconElementRight={this.state.logged ? <Logged /> : <Login />}
      />
    )
  }
}

Header.propTypes = {}
Header.defaultProps = {}

export default Header
