import React, { Component } from 'react';
import requireAuth from './requireAuth';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Notes extends Component {
  componentDidMount() {
    if (this.props.myNotes) {
      this.props.getUserNotes(this.props.userId);
    } else {
      this.props.getAllNotes();
    }
  }

  displayNotes() {
    return this.props.notes.map(n => {
      const shouldDelete = this.props.userId == n._user_id ? 
            <button onClick={() => this.props.deleteNote(n._id)} className="delete-btn">Delete</button> 
            : 
            <span className="space-holder"></span>;
      return (
        <div key={n._id} className="user-list-item">
          <li className="email-item">{n.email}</li>
          <li className="email-item">{n.content}</li>
          <li className="email-item">{n.timestamp}</li>
          {shouldDelete}
        </div>
      );
    }); 
  }
  
  render() {
    const mySelected = this.props.myNotes ? "highlighted-button" : ""
    const allSelected = this.props.myNotes ? "" : "highlighted-button"
    return <div id="welcome">
              <h3>View/Add notes!</h3>
              <div id="note-nav">
                <button className={mySelected} onClick={() => this.props.getUserNotes(this.props.userId)} id="my-notes-button">My Notes</button>
                <button className={allSelected} onClick={this.props.getAllNotes} id="all-notes-button">All Notes</button>
              </div>
              <div id="user-list-container">{this.displayNotes()}</div>
          </div>
  }
}

// WHOLE APP STATE
function mapStateToProps({ note, auth }) {
  return { notes: note.notes, userId: auth.userId, myNotes: note.myNotes }
}

export default connect(mapStateToProps, actions)(requireAuth(Notes));
