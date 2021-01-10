import Records from "../pages/records/records";
import Users from "../pages/users/users";
import Statistics from "../pages/statistics/statistics";
import AddPatients from "../pages/addPatients/addPatients";
import MyRecords from "../pages/my-records/my-records";
import Toolbar from "../components/toolbar-news/Toolbar";
import News from "../pages/news/News";
import AppointmentApp from "../components/Appointment";
import Test from "../components/test";

export const routes = [
    {
        path: '/',
        component: Records
    },
    {
        path: '/test',
        component: Test
    },
    {
      path: '/add/patients',
      component: Test
    },
    {
        path: "/appointments",
        component: AppointmentApp
    },
    {
        path: '/users',
        component: Users
    },
    {
        path: '/statistics',
        component: Statistics
    },
    {
        path: '/add/patients',
        component: AddPatients
    },
    {
        path: '/my/records',
        component: MyRecords
    },
    {
        path: '/add/news',
        component: Toolbar
    },
    {
        path: '/news',
        component: News
    }
];
