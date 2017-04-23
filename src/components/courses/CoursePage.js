import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux';
import { loadCourses } from '../../actions/courseActions'
import CourseList from './CourseList'

class CoursePage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>
  }

  render() {
    const { courses} = this.props
    return (
      <div>
        <h1>Courses</h1>
        {/*{this.props.courses.map(this.courseRow)}*/}
        <CourseList courses={courses} />
      </div>
    )
  }
}

CoursePage.propsTypes = {
  dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  }
}


export default connect(mapStateToProps, { loadCourses })(CoursePage)
