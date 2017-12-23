import React from 'react';
import './styles.scss';


export default class Win8Spinner extends React.Component {

  render() {
    return (
      <div className="fetching">
        <div>
          <div className="windows8">
            <div className="wBall" id="wBall_1">
              <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_2">
              <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_3">
              <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_4">
              <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_5">
              <div className="wInnerBall"></div>
            </div>
          </div>
          {this.props.title &&
            <h3 className="message">{this.props.title}</h3>
          }
        </div>

      </div>
    )
  }
}