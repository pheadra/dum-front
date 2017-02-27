import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import CodeIcon from 'material-ui/svg-icons/action/code'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import TextField from 'material-ui/TextField';
import {grey900, darkWhite, lightWhite} from 'material-ui/styles/colors'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const CodeBlockTitle = (props) => (
  <Toolbar>
    <ToolbarGroup>
      <ToolbarTitle text={props.title || 'Example'} />
    </ToolbarGroup>
    <ToolbarGroup>
      <IconButton touch={true} tooltip={props.tooltip}>
        <CodeIcon />
      </IconButton>
    </ToolbarGroup>
  </Toolbar>
);

const styles = {
    headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
    slide: {
      padding: 10,
    },
    tabs: {
      backgroundColor: darkWhite
    },
    selectField: {
      width: 100
    }
  }


class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      value : 1
    }
  }

  handleChange = (value) => {
    this.setState({ slideIndex: value, })
  }

  handleSelectChange = (event, index, value) => this.setState({value});


  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
          style={styles.tabs}
        >
          <Tab label="Dummy" value={0} />
          <Tab label="Server" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <SelectField
              floatingLabelText="Method"
              value={this.state.value}
              style={styles.selectField}
              onChange={this.handleSelectChange}
            >
              <MenuItem value={1} primaryText="GET" />
              <MenuItem value={2} primaryText="POST" />
              <MenuItem value={3} primaryText="PUT" />
              <MenuItem value={4} primaryText="DELETE" />
              <MenuItem value={5} primaryText="OPTION" />
            </SelectField>
            &nbsp;
            <TextField
              hintText="Hint Text"
              floatingLabelText="Floating Label Text"
            />

            <br/>
            <TextField
              hintText="Hint Text"
              floatingLabelText="Floating Label Text"
            />
            <br />
            <TextField
              hintText="Hint Text"
              floatingLabelText="Floating Label Text"
            />
          </div>
          <div style={styles.slide}>
            slide n°2
          </div>
          <div style={styles.slide}>
            slide n°3
          </div>
        </SwipeableViews>
      </div>

    )
  }
}

Request.propTypes = {}
Request.defaultProps = {}

export default Request
