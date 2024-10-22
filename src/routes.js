import React from "react";
import Home from "./pages/home";

import Users from "./components/users/users";
import Notifications from "./components/notifications/notifications";
import MailBox from "./components/mailBox/mailBox";

import Videos from "./components/videos/videos";
import AddVideo from "./components/videos/addVideo";

import Dashboard from "./components/dashboard/dashboard";
import Loadable from "react-loadable"


const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
// const Dashboard = Loadable({
//   loader: () => import("./components/dashboard/dashboard"),
//   loading
// });

const Professors = Loadable({
  loader: () => import("./components/users/professors"),
  loading
});

const UsersAnauthorized = Loadable({//users to be affected by orgAdmin
  loader: () => import("./components/users/users_of_org_nonAffected"),
  loading
});
const UsersForSuperAdminNonAffected = Loadable({//users to be affected by superAdmin
  loader: () => import("./components/users/users_nonAffected"),
  loading
});

const Professors_Dep = Loadable({
  loader: () => import("./components/users/dp_professors"),
  loading
});

const Students_Dep = Loadable({
  loader: () => import("./components/users/dp_students"),
  loading
});

const Organizations = Loadable({
  loader: () => import("./components/organizations/organizations"),
  loading
});

const OrganizationAccountModify = Loadable({
  loader: () => import("./components/organizations/modifyOrgAccount"),
  loading
});


const Departments = Loadable({
  loader: () => import("./components/departments/departments"),
  loading
});
const Departments_depA = Loadable({
  loader: () => import("./components/departments/departments_adDep"),
  loading
});

const SubDepartments_index = Loadable({
  loader: () => import("./components/sub-department/routeIndexSubDepartment"),
  loading
});


const SubDepartments = Loadable({
  loader: () => import("./components/sub-department/subDepartments"),
  loading
});

const Themes = Loadable({
  loader: () => import("./components/themes/allThemes"),
  loading
});

const OneVideoDetails = Loadable({
  loader: () => import("./components/videos/homeVideo"),
  loading
});
const MyAccount = Loadable({
  loader: () => import("./components/users/MyAccount"),
  loading
});
const Videos_Professor = Loadable({
  loader: () => import("./components/videos/videos_professor"),
  loading
});

const routes = [
  //  { path: "/home", exact: true, name: "Home", component: Home },
 
  { path: "/administrateurs", name: "Administrateurs", component: Users },
  { path: "/org-non-affected-users", name: "Utilisateur non affectés", component: UsersAnauthorized },
  { path: "/non-affected-users", name: "Utilisateur non affectés", component: UsersForSuperAdminNonAffected },
  { path: "/professors", name: "Professeurs", component: Professors },
  { path: "/professor_videos", name: "Mes videos", component: Videos_Professor },
  { path: "/students", name: "Etudiants", component: Users },
  
  { path: "/:nameTheme/videos", name: "Liste des videos ", component: Videos },
  { path: "/:nameTheme/videos/:videoId", name: "Liste des videos ", component: OneVideoDetails },
  { path: "/etablissements", name: "Liste des établissement", component: Organizations },
  { path: "/org-setting", name: "Liste des établissement", component: OrganizationAccountModify },
  { path: "/departments", name: "Liste des departements", component: Departments_depA },
  
    { path: "/departements/:idOrg", name: "Liste des departements", component: Departments },
  { path: "/sous-departement/:idDep", name: "Liste des sous-departements", component: SubDepartments },
  { path: "/sous-departement/index", name: "Liste des departements", component: SubDepartments_index },
  { path: "/themes/:idSubDep", name: "Liste des thèmes", component: Themes },
  { path: "/dep-professors", name: "Liste des Professeurs departement", component: Professors_Dep },
  { path: "/dep-students", name: "Liste des étudiants departement", component: Students_Dep },
 // { path: "/about", name: "Infos générales", component: AboutComponent },
  { path: "/account", name: "Account", component: MyAccount },
  { path: "/home", name: "Dashboard", component: Dashboard },
  { path: "/notifications", name: "Notifications", component: Notifications },
  { path: "/mailBox", name: "Mail Box", component: MailBox }
];

export default routes;
