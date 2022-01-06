import { green } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
    paper: {
        padding: 50, height: '70vh', width: 500, margin: "30px auto",
        borderRadius: '5% !important',

    },
    avatar: { backgroundColor: '#1bbd7e !important' },
    btn: {
        margin: '8px 0',
        borderRadius: '25px !important',
        backgroundColor: '#1bbd7e !important'

    },
    register: {
        textDecoration: "none !important",
        marginLeft: "10px !important",
        cursor: "pointer"
    }
});
export default useStyles;