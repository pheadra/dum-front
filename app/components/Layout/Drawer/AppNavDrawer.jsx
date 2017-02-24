import React, { PropTypes } from 'react'

import Drawer from 'material-ui/Drawer'
import { List, ListItem, makeSelectable } from 'material-ui/List'
const SelectableList = makeSelectable(List)
import Divider from 'material-ui/Divider'

import { spacing, typography, zIndex } from 'material-ui/styles'
import { cyan500 } from 'material-ui/styles/colors'

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan500,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8,
  }
}




class AppNavDrawer extends React.Component {
  render() {
    const {
      onRequestChangeNavDrawer,
      open
    } = this.props

    const style = {
      navDrawer : {
        zIndex: zIndex.appBar - 1,
      }
    }

    return (
      <Drawer
        open={open}
        docked={true}
        style={style}
        onRequestChange={onRequestChangeNavDrawer}
        containerStyle={{ zIndex: zIndex.drawer - 100 }}
      >
        <div style={styles.logo} onTouchTap={onRequestChangeNavDrawer}>
          HaRu - Dummy
        </div>
        <SelectableList
          value={location.pathname}
        >
          <ListItem
            primaryText="Request List"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="Required Knowledge" value="/get-started/required-knowledge"/>,
              <ListItem primaryText="Installation" value="/get-started/installation"/>,
              <ListItem primaryText="Usage" value="/get-started/usage"/>,
              <ListItem primaryText="Server Rendering" value="/get-started/server-rendering"/>,
              <ListItem primaryText="Examples" value="/get-started/examples"/>,
            ]}
          />
          <ListItem
            primaryText="Setting"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="Themes" value="/customization/themes"/>,
              <ListItem primaryText="Styles" value="/customization/styles"/>,
              <ListItem primaryText="Colors" value="/customization/colors"/>,
            ]}
          />
          <ListItem
            primaryText="Discover More"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="Community" value="/discover-more/community"/>,
              <ListItem primaryText="Contributing" value="/discover-more/contributing"/>,
              <ListItem primaryText="Showcase" value="/discover-more/showcase"/>,
              <ListItem primaryText="Related projects" value="/discover-more/related-projects"/>,
            ]}
          />
        </SelectableList>
        <Divider />
      </Drawer>
    )
  }
}

AppNavDrawer.propTypes = {}
AppNavDrawer.defaultProps = {}

export default AppNavDrawer
