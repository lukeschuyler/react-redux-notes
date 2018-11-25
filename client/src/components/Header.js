import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/signout">Sign Out ({this.props.userId})</Link>
          <Link to="/notes">Notes</Link>
          <Link to="/add-note">Add Note</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="Header">
        <Link to="/">Redux Auth</Link>
        <div className="right-links">
          {this.renderLinks()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, userId: state.auth.userId }
}

export default connect(mapStateToProps)(Header);
