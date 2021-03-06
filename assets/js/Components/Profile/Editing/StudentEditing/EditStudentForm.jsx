import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import StudentAccountInfoDisplayContainer from '../../../../Containers/Profile/Display/StudentDisplay/StudentAccountInfoDisplayContainer';

/**
 * TEMPORARY ABSTRACTION-LESS WORKAROUND, TODO: ABSTRACT FROM USERINFORMATIONFORM
 * @param {*} props
 */
class EditStudentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }

        this.toggleEdit = this.toggleEdit.bind(this);
    }

    toggleEdit() {
        this.setState({ edit: !this.state.edit })
    }

    render() {
        let info = this.props.user.user_info;

        if (this.state.edit) {
            return (
                <div>
                    <Formik
                        initialValues={{ name: info.name, email: info.email }}
                        onSubmit={(values) => {
                            this.toggleEdit();
                            this.props.onSubmit(values)
                        }}
                        validate={values => {
                            let errors = {};
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Email addresses must include a . before a domain name.';
                            }
                            return errors;
                        }}>

                        {({ values, handleChange, handleSubmit, errors, touched, setValues }) => (
                            <form onSubmit={handleSubmit}>

                                {/* Account stuff */}
                                <div className="card shadow p-3 mb-5 bg-white rounded padding border-0">
                                    <div className="card-body">
                                        <h3 className="card-title text-primary mb-3">Account Information</h3>
                                        <label htmlFor="accountname">Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="accountname"
                                            className="form-control bg-light mb-3 border-0"
                                            onChange={handleChange}
                                            value={values.name} required />

                                        <label htmlFor="accountemail">Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="accountemail"
                                            className="form-control bg-light mb-3 border-0"
                                            onChange={handleChange}
                                            value={values.email}
                                            required
                                        />
                                        {errors.email && touched.email && <p className="text-danger"> {errors.email} </p>}

                                        <div className="row">
                                            <div className="p-1">
                                                <button type="submit" className="btn btn-sm btn-primary"> Save changes </button>
                                            </div>
                                            <div className="p-1">
                                                <button onClick={this.toggleEdit} className="btn btn-sm btn-danger">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        )}
                    </ Formik>
                </div>
            )
        } else {

            return (
                <div>
                    <StudentAccountInfoDisplayContainer onEditButton={this.toggleEdit} />
                </div>
            )
        }

    }
}

export default EditStudentForm;
