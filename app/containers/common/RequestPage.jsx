import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import CodeIcon from 'material-ui/svg-icons/action/code'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

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

class Request extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const styles = {
      root: {
        marginBottom: 32,
      },
      header: {
        borderBottom : '1px solid #eee'
      }
    };

    return (
      <div>
        <h2 id="card" style={styles.header}>Card</h2>
        <p>
          fdafdas
        </p>
        <Paper style={styles.root}>

          <CodeBlockTitle
            title="test"
            tooltip="tooltip"
          ></CodeBlockTitle>
        </Paper>
      </div>

    )
  }
}

Request.propTypes = {}
Request.defaultProps = {}

export default Request
