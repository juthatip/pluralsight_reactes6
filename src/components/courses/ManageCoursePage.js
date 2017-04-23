import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCourses } from '../../actions/courseActions'

class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        ManageCoursepage
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

export default connect(mapStateToProps, { loadCourses })(ManageCoursePage)
