import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import GuestLayout from "../layouts/home/GuestLayout";
import Team from "../pages/Team";
import ServicesPage from "../pages/ServicesPage";
import AboutPage from "../pages/AboutPage";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import Dashboard from "../components/dashboard/Dashboard";
import AuthContext from "../context/AuthContext";
import Patients from "../components/dashboard/Patients/Patients";
import AddPatient from "../components/dashboard/Patients/AddPatient";
import ShowPatient from "../components/dashboard/Patients/ShowPatient";
import UpdatePatient from "../components/dashboard/Patients/UpdatePatient";
import Doctors from "../components/dashboard/Doctors/Doctors";
import ShowDoctor from "../components/dashboard/Doctors/ShowDoctor";
import AddDoctor from "../components/dashboard/Doctors/AddDoctor";
import UpdateDoctor from "../components/dashboard/Doctors/UpdateDoctor";
import Specializations from "../components/dashboard/Specializations/Specializations";
import Appointments from "../components/dashboard/Appointments/Appointments";
import AddAppointment from "../components/dashboard/Appointments/AddAppointment";
import ShowAppointment from "../components/dashboard/Appointments/ShowAppointment";
import AllServices from "../components/dashboard/Services/AllServices";
import AddService from "../components/dashboard/Services/AddService";
import UpdateService from "../components/dashboard/Services/UpdateService";
import Medicines from "../components/dashboard/Medicines/Medicines";
import AddMedicine from "../components/dashboard/Medicines/AddMedicine";
import UpdateMedicine from "../components/dashboard/Medicines/UpdateMedicine";
import BookApp from "../pages/BookApp";

export const router = createBrowserRouter([
  {
    element: (
      <AuthContext>
        <GuestLayout />
      </AuthContext>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/medical-doctors', element: <Team /> },
      { path: '/medical-services', element: <ServicesPage /> },
      { path: '/medical-about-us', element: <AboutPage /> },
      { path: '/medical-contact', element: <Contact /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/medical-appointment', element: <BookApp /> }
    ]
  },
  {
    element: <AuthContext>
        <DashboardLayout />
        </AuthContext>,
    children: [
      { path: '/admin/dashboard', element: <Dashboard /> },
      { path: '/admin/patients', element: <Patients /> },
      { path: '/admin/patients/add', element: <AddPatient /> },
      { path: '/admin/patients/:id', element: <ShowPatient /> },
      { path: '/admin/patients/:id/edit', element: <UpdatePatient /> },
      { path: '/admin/doctors', element: <Doctors /> },
      { path: '/admin/doctors/add', element: <AddDoctor/> },
      { path: '/admin/doctors/:id', element: <ShowDoctor/> },
      { path: '/admin/doctors/:id/edit', element: <UpdateDoctor /> },
      { path: '/admin/specializations', element: <Specializations/> },
      { path: '/admin/appointments', element: <Appointments/> },
      { path: '/admin/appointments/create', element: <AddAppointment /> },
      {path: '/admin/appointments/:id',element:<ShowAppointment/>},
      {path:'/admin/services',element:<AllServices/>},
      {path:'/admin/services/add',element:<AddService/>},
      {path:'/admin/services/:id/edit',element:<UpdateService/>},
      {path:'/admin/medicines',element:<Medicines/>},
      {path:'/admin/medicines/add',element:<AddMedicine/>},
      {path:'/admin/medicines/:id/edit',element:<UpdateMedicine/>},
    ]
  }
]);
