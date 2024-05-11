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
      { path: '/register', element: <Register /> }
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
    ]
  }
]);
