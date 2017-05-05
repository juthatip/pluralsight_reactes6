import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadCourses , saveCourse } from '../../actions/courseActions'
import { loadAuthors } from '../../actions/authorActions'
import CourseForm from './CourseForm'
import toastr from 'toastr';

class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: Object.assign({}, props.course),
      errors: {}
    }

    this.updateCourseState = this.updateCourseState.bind(this)
    this.saveCourse = this.saveCourse.bind(this)
  }

  componentWillReceiveProps(nextProps) {

    // update local state when props change
    if (this.props.course.id != nextProps.course.id) {
      // Necessary to populate form when existing course is loaded directly
      this.setState({course: Object.assign({}, nextProps.course)})
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  saveCourse(event) {
    event.preventDefault();
    // console.log(this.props)
    this.props.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
      this.setState({saving: false});
      toastr.success('Course saved');
      this.context.router.push('/courses')
  }

  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        /* handle insert text */
        onChange={this.updateCourseState}
        /* handle actions */
        onSave={this.saveCourse}
        course={this.state.course}
        errors={this.state.errors}
        />
    )
  }
}

// Pull in the React Router contect so router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: PropTypes.object
}

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id)
  if (course) return course[0]; //since filter returns an array, have to grab the first
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id // from the path `/course/:id`
  
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId)
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
  
  return {
    course: course,
    authors: authorsFormattedForDropdown
  }
}

export default connect(mapStateToProps, { loadCourses, loadAuthors, saveCourse })(ManageCoursePage)
