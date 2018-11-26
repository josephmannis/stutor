import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';

/**
 * TEMPORARY ABSTRACTION-LESS WORKAROUND, TODO: ABSTRACT FROM USERINFORMATIONFORM
 * @param {*} props 
 */
class EditTutorForm extends React.Component {
    constructor(props) {
        super(props);
        this.renderUniversityOptions = this.renderUniversityOptions.bind(this);

    }

    componentWillMount() {
        this.props.fetchUniversities();
    }

    renderUniversityOptions() {
        return (_.map(this.props.universities, (university) => { return (<option key={university.id} value={university.id}> {university.name} </option>) }));
    }

    render() {
        // console.log('user info')
        // console.log(this.props.user.user_info)
        // console.log(this.props)
        let info = this.props.user.user_info;

        return (
            <Formik
                initialValues={{ name: info.name, email: info.email, university_id: info.university.id, gpa: info.gpa }}
                onSubmit={(values) => { this.props.onSubmit(values) }}>

                {({ values, handleChange, handleSubmit, setValues }) => (
                    <form onSubmit={handleSubmit}>
                        {console.log("values")}
                        {console.log(values)}

                        {/* Account stuff */}
                        <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                            <div className="card-body">
                                <h3 className="card-title text-primary">Account Information</h3>
                                <label htmlFor="accountname">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="accountname"
                                    className="form-control bg-light border-0"
                                    onChange={handleChange}
                                    value={values.name} />

                                <label htmlFor="accountemail">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="accountemail"
                                    className="form-control bg-light border-0"
                                    onChange={handleChange}
                                    value={values.email}
                                />
                                <label className="mt-2" htmlFor="university">University:</label>
                                <select
                                    id="univeristy"
                                    name="university_id"
                                    onChange={handleChange}
                                    value={values.university_id}
                                    className="form-control border-0 bg-light">
                                    {this.renderUniversityOptions()}
                                </select>

                                <div className="mb-1 mt-3">
                                    <label htmlFor="gpa">GPA:</label>
                                    <input
                                        type="number"
                                        name="gpa"
                                        id="gpa"
                                        min="0"
                                        max="5"
                                        step='.1'
                                        className="form-control bg-light border-0"
                                        onChange={handleChange}
                                        value={values.gpa} />
                                </div>
                                {/* <label htmlFor="accountpassword">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="accountpassword"
                                    className="form-control bg-light border-0"
                                    onChange={handleChange}
                                    value={values.password}
                                /> */}
                            </div>
                        </div>

                        {/* Payment */}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                )}
            </ Formik>
        )
    }
}

export default EditTutorForm;