import { connect } from 'react-redux';
import Header from '../Components/Header.jsx'
import { logoutUser } from '../Actions/users';

const mapStateToProps = (state) => {
    return {
        user: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => {
            logoutUser();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);