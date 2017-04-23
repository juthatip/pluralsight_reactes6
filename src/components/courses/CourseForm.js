import React from 'react'

const CourseForm = ({course, allAuthors, onSave, onChange, loading, errors }) => {
  return (
    <form>
      <h1>Manage Course</h1>
      <TextInput
        name="title"
        label="Title"
        value={course.title}
        onChange={onChange}
        error={errors.title} />

      <SelectInput
        name="authorId"
        label="Author"
        value={course.authorId}
        defaultOption="Select Author"
        options={allAuthors}
        onChange={onChange} error={error.authorId} />

      <TextInput
        name="category"
        label="Category"
        value={course.category}
        onChange={onChange}
        error={error.category} />

      <TextInput
        name="length"
        label="Length"
        value={course.length}
        onChange={onChange}
        error={error.length} />

      <input
        type="submit"
        disabled={loading}
        value={loading ? 'Saving ..' : 'Save'}
        className="btn btn-primary"
        onClick={onSave} />

    </form>
  )
}

export default CourseForm
