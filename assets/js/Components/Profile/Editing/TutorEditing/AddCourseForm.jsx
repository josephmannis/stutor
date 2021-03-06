import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';


class AddCourseForm extends React.Component {
    constructor(props) {
        super(props);
        // Should receieve a list of available courses
        // And a university

        this.state = {
            isOpen: false,
        }

        this.toggleOpen = this.toggleOpen.bind(this);
    }

    toggleOpen() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    componentWillMount() {
        this.props.fetchCourses();
    }

    formatCourseOptions(university_id) {
        let courseOptions = [];

        _.each(this.props.courses,
            (course) => {
                if (course.university_id == university_id) {
                    courseOptions.push({ id: course.id, name: course.course_name, number: course.course_no });
                }
            });

        return courseOptions;
    }

    render() {
        if (this.state.isOpen) {
            return (
                <Formik
                    initialValues={{ tutor_id: this.props.user.user_id, course_id: 1 }}
                    onSubmit={(values) => {
                        this.props.addCourse(values)
                        this.setState({isOpen: false})
                }}>
                    {({ values, handleSubmit, setValues }) => (
                        <form onSubmit={handleSubmit}>
                            <Typeahead
                                id="courses"
                                name="courses"
                                placeholder="Search for courses at your university..."
                                selectHintOnEnter={true}
                                labelKey="name"
                                onChange={(selected) => {
                                    if (selected[0]) { setValues(_.assign(values, { course_id: selected[0].id })); }
                                }}
                                options={this.formatCourseOptions(this.props.user.user_info.university.id)}
                            />

                            <div className="row">
                                <div className="p-1">
                                    <button type="submit" className="btn btn-primary btn-sm"> Add Course </button>
                                </div>
                                <div className="p-1">
                                    <button onClick={this.toggleOpen} className="btn-danger btn-sm"> Cancel </button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            )
        } else {
            return (<button onClick={this.toggleOpen} className="btn btn-primary">Add Course</button>)
        }
    }
}

export default AddCourseForm;
