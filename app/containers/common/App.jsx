import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { spacing } from 'material-ui/styles'
import {grey900, darkWhite, lightWhite} from 'material-ui/styles/colors'
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth'

import Header from '../../components/Layout/Header'
import AppNavDrawer from '../../components/Layout/Drawer'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';



import debug from 'debug'
const log = debug('application:App.jsx')
import DevTools from '../../components/DevTools'


class App extends React.Component {
  state = {
    navDrawerOpen: true,
  };

  getStyles() {
    const styles = {
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400,
        paddingLeft : 256
      },
      content: {
        margin: spacing.desktopGutter,
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
      },
      footer: {
        backgroundColor: grey900,
        textAlign: 'center',
        paddingLeft : 256
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: lightWhite,
        maxWidth: 356,
      },
      iconButton: {
        color: darkWhite,
      },
      floatingButton: {
        marginRight: 20,
        position: 'fixed',
        right :20,
        bottom : 20
      }
    }

    if (this.props.width === MEDIUM || this.props.width === LARGE) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);
    }

    return styles
  }

  handleTouchTapLeftIconButton = () => {
    this.setState({ navDrawerOpen: !this.state.navDrawerOpen })
  }

  handleChangeRequestNavDrawer = (open) => {
    this.setState({ navDrawerOpen: open })
  }

  render() {
    const muiTheme = getMuiTheme()
    const {
      prepareStyles,
    } = muiTheme

    const styles = this.getStyles()
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <section>
          <Header onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton} />
          <AppNavDrawer
            onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
            open={this.state.navDrawerOpen}
          />
          <div style={prepareStyles(styles.root)}>
            <div style={prepareStyles(styles.content)}>
              {this.props.children}
            </div>
          </div>
          <FloatingActionButton style={styles.floatingButton}>
            <ContentAdd />
          </FloatingActionButton>
        </section>
      </MuiThemeProvider>
    )
  }

  get renderDevTools() {
    if (process.env.NODE_ENV === 'production') {
      return null
    } else {
      return <DevTools />
    }
  }
}

export default withWidth()(App)
