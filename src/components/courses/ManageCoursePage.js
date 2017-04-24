import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCourses } from '../../actions/courseActions'
import CourseForm from './CourseForm'

class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {}
    }
  }

  render() {
    return (
      <CourseForm
        allAuthor={[]}
        course={this.state.course}
        errors={this.state.errors}
        />
    )
  }
}

function mapStateToProps(state) {
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}
  return {
    course: course
  }
}

export default connect(mapStateToProps, { loadCourses })(ManageCoursePage)
