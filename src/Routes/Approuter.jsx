import Login from "../Components/Login";
import Create from "../Components/Create";
import Forgot1 from "../Components/Forgot1";
import Forgot2 from "../Components/Forgot2";
import Start from "../Components/Start";
import Setpass from "../Components/Setpass";
import Setpass2 from "../Components/Setpass2";
import Adminlogin from "../Components/Adminlogin";
import Dashboard from "../Components/Dashboard";
import Subject from "../Components/Subject";
import View from "../Components/View";
import Showsubject from "../Components/Showsubject";
import Addquestion from "../Components/Addquestion";
import Answerfilling from "../Components/Answerfilling";
import Analytics from "../Components/Analytics";
import Viewres from "../Components/Viewres";
import Guidelines from "../Components/Guidelines";

const route=[
    {
        path:'/',
        element:<><Start/></>
    },
    {
        path:'/Dashboard',
        element:<><Dashboard/></>
    },
    {
        path:'/Guidelines',
        element:<><Guidelines/></>
    },
    {
        path:'/Dashboard/Analytics',
        element:<><Analytics/></>
    },
    {
        path:'/Dashboard/Show/:name',
        element:<><Showsubject/></>
    },
    {
        path:'/Dashboard/que/:name',
        element:<><Addquestion/></>
    },
    {
        path:'/Dashboard/show/answer/:name',
        element:<><Answerfilling/></>
    },
    {
        path:'/Dashboard/show/answer/viewres/:name/:per',
        element:<><Viewres/></>
    },
    {
        path:'/Dashboard/Subject',
        element:<><Subject/></>
    },
    {
        path:'/Dashboard/View',
        element:<><View/></>
    },
    {
        path:'/Login',
        element:<><Login/></>
    },
    {
        path:'/Admin',
        element:<><Adminlogin/></>
    },
    {
        path:'/Admin/Forgot2',
        element:<><Forgot2/></>
    },
    {
        path:'/Login/Create',
        element:<><Create/></>
    },
    {
        path:'/Login/Forgot1',
        element:<><Forgot1/></>
    },
    {
        path:'/Login/Forgot1/password1/:str',
        element:<><Setpass/></>
    },
    {
        path:'/Admin/Forgot2/password2/:str',
                element:<><Setpass2/></>
    }
]
export default route