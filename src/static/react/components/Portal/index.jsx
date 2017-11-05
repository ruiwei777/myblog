import React from 'react';
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { unmountPortal } from 'root/services/portal/actions';

import './styles.scss';

/**
 * A portal element, using unstable API in React v15.
 * reference: https://zhuanlan.zhihu.com/p/29880992
 */
class Portal extends React.Component{

  componentDidMount() {
    const doc = window.document;
    this.node = doc.createElement('div');
    doc.body.appendChild(this.node);

    this.renderPortal(this.props);
  }

  componentDidUpdate() {
    this.renderPortal(this.props);
  }

  componentWillUnmount() {
    unmountComponentAtNode(this.node);
    window.document.body.removeChild(this.node);
  }

  onCloseClick(e){
    e.preventDefault();
    this.props.dispatch(unmountPortal());
  }

  renderPortal(props) {
    unstable_renderSubtreeIntoContainer(
      this, // caller component
      <div className="portal">
        <div className="content-wrapper">
          <div className="content-header">
            <span className="title">{ this.props.title }</span>
            <button className="close" onClick={::this.onCloseClick}>x</button>
          </div>
          {props.children}
          
        </div>
      </div>, // JSX to be transferred into the portal
      this.node // portal side's DOM
    );
  }

  render(){
    return null;
  }
}

Portal.propTypes = {
  title: PropTypes.string,
  dispatch: PropTypes.func
}

function mapStateToProps() {
  return {  }   // return an empty object, since it only needs the `dispatch` function
}
export default connect(mapStateToProps)(Portal);
