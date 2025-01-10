import useRedux from '../../hooks/useRedux'
import useRouter from '../../hooks/useRouter'
import pathName from '../../routing/pathName.constant'
import { getItem, removeItem } from '../../utils/localstorage'

const header = () => {
    const { navigate } = useRouter()
    const { dispatch } = useRedux();
    const { selector } = useRedux()
    const profileDetails = selector(state => state.user?.profile_details)
    const handleLogout = async () => {
        // const refreshToken = getItem('refreshToken')
        // const response = await logoutApi({ payload: { refreshToken } })
        // if (response?.data?.data?.success) {
        //     navigate(pathName.LOGIN, { clearStore: true })
           removeItem('token')
          removeItem('refreshToken')
        //     removeItem('nonLoginAuthToken')
        //     removeItem('userExists')
          removeItem('userData');
          dispatch({ type: 'LOGOUT' }); // Ensure you have a LOGOUT action in your user reducer
          navigate('/');
        //     removeItem('adminId')
        //     sessionStorage.clear()
        // }
    }

    const handleProfile = () => {
        navigate(pathName.PROFILE)
    }

    return { handleLogout, handleProfile, profileDetails }
}

export default header
