import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import requireAuth from './requireAuth';
import { connect } from 'react-redux';
import { compose  } from 'redux';
import * as actions from '../actions';

class AddNote extends Component {
  onSubmit = formProps => {
    formProps._user_id = this.props._user_id;
    this.props.addNote(formProps, () => {
      this.props.history.push('./notes');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label htmlFor="">Content</label>
          <Field autoComplete="none" name="content" type="text" component="textarea" />
        </fieldset>  
        <div>{this.props.errorMessage }</div>
        <button>Add Note</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.note.errorMessage, _user_id: state.auth.userId }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'addNote' })
)(requireAuth(AddNote));
