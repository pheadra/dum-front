import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import assign from 'object-assign'
import debug from 'debug'
const log = debug('application:PopupContainer.jsx')
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './PopupContainer.css'

import * as PopupActions from '../../../modules/common/popup'

/// TODO : luke 애니메이션 부분 다시 확인
class PopupContainer extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyPress)
  }

  /***
   * 팝업에서 ESC 눌렀을때 팝업을 닫게 하는 이벤트
   * @param e {KeyboardEvent} - keydown event
   * @private
   */
  _handleKeyPress = (e) => {
    if (e.keyCode == 27) {
      this.closePopup()
    }
  }

  render() {
    // Children 중 PopupStore에 키가 들어온 팝업만 보여준다
    let childPopups = React.Children.map(this.props.children, (Element) => {
      let popupKey = Element.key
      let popupProps = this.props.popup.get(popupKey)
      if (popupProps) {
        let PopupElement = Element.type
        let props = assign({}, Element.props, popupProps)

        return <PopupElement key={popupKey}
                             close={this.closePopup.bind(null, popupKey)}
                             {...props}
        />
      }
    })

    return (
      <ReactCSSTransitionGroup transitionName="popup"
                               transitionLeaveTimeout={500}
                               transitionEnterTimeout={500}
                               component="div"
                               onClick={this.closePopup}>

        {childPopups}

      </ReactCSSTransitionGroup>
    )
  }

  /// TODO : luke 팝업 위에 팝업인 경우 문제가 될 수 있음. KEY를 받아야 할듯
  closePopup = () => {
    this.props.closeALLPopup()
  }
}

export default connect(
  ({ popup }) => ({ popup }),
  (dispatch) => ({ closeALLPopup: bindActionCreators(PopupActions.closeALLPopup, dispatch) })
)(PopupContainer)
