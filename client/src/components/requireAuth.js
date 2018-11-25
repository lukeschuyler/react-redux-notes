import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
 *  HIGH ORDER FUNCTION
 */
export default ChildComponent => {

  // BEGIN CLASS INSIDE 
  class ComposedComponent extends Component {

    componentDidMount() {
      this.shouldNavigateAway();
    }  
    
    componentDidUpdate() {
      this.shouldNavigateAway();
    }
  
    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push('/');
      }
    }
    
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth.authenticated, userId: state.auth.userId }
  }

  return connect(mapStateToProps)(ComposedComponent);
};
