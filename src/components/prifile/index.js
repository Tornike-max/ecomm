import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import useAxios from "../../app/hooks/useAxios"

const Profile = () => {
    const location = useLocation()
    const { data } = useAxios(`/users/${location.state?._id}`)
    return(
        <div>
            <Typography variant="h3">{data?.user?.firstName}</Typography>
            <Typography variant="h5">{data?.user?.lastName}</Typography>
        </div>
    )
}
export default Profile;