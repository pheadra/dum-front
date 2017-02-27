import React, { PropTypes } from 'react'

import Drawer from 'material-ui/Drawer'
import { List, ListItem, makeSelectable } from 'material-ui/List'
const SelectableList = makeSelectable(List)
import Divider from 'material-ui/Divider'

import { spacing, typography, zIndex } from 'material-ui/styles'
import { cyan500 } from 'material-ui/styles/colors'
import Subheader from 'material-ui/Subheader';
import { blue500, yellow600 } from 'material-ui/styles/colors';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import Toggle from 'material-ui/Toggle';

import Avatar from 'material-ui/Avatar';
import {indigo500} from 'material-ui/styles/colors'


const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: indigo500,
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
          <Subheader>REQUEST LIST</Subheader>
          <ListItem
            primaryText="Request List"
            secondaryText="Jan 10, 2014"
            leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
            rightIcon={<ActionInfo />}
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem primaryText="Required Knowledge" value="/get-started/required-knowledge"/>,
              <ListItem primaryText="Installation" value="/get-started/installation"/>,
              <ListItem primaryText="Usage" value="/get-started/usage"/>,
              <ListItem primaryText="Server Rendering" value="/get-started/server-rendering"/>,
              <ListItem primaryText="Examples" value="/get-started/examples"/>,
            ]}
          />

          <Divider />
          <Subheader>Server Setting</Subheader>
          <ListItem primaryText="Enable Proxy" rightToggle={<Toggle />} />
          <ListItem primaryText="Server Setting" />
        </SelectableList>
      </Drawer>
    )
  }
}

AppNavDrawer.propTypes = {}
AppNavDrawer.defaultProps = {}

export default AppNavDrawer
