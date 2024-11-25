import { RouteObject, Navigate, createBrowserRouter } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import NotFound from "../../features/errors/NotFound";
import TestErrors from "../../features/errors/TestError";
import ProfilePage from "../../features/profiles/ProfilePage";
import App from "../layout/App";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import RequireAuth from "./RequiredAuth";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "activities", element: <ActivityDashboard /> },
          { path: "activities/:id", element: <ActivityDetails /> },
          { path: "createActivity", element: <ActivityForm key='create' /> },
          { path: "manage/:id", element: <ActivityForm key='manage' /> },
          { path: "profiles/:username", element: <ProfilePage /> },
          { path: "errors", element: <TestErrors /> },
        ],
      },
      { path: "server-error", element: <TestErrors /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to='/not-found' /> },
    ],
  },
];

{
  /* <PrivateRoute
  key={location.key}
  path={["/createActivity", "/manage/:id"]}
  component={ActivityForm}
/> */
}
{
  /* <Route path='/errors' component={TestError} />
        <Route path='/server-error' component={ServerError} /> */
}
{
  /* <Route
  path='/account/registerSuccess'
  component={RegisterSuccess}
/> */
}
{
  /* <Route path='/account/verifyEmail' component={ConfirmEmail} />
<Route path='/login' component={LoginForm} /> */
}
// {/* <PrivateRoute path='/home' component={HomePage} /> */}
// <Route path='/code' component={CodeOfConduct} />
{
  /* <Route path='/contact' component={Contact} /> */
}
{
  /* <Route path='/newsletter' component={Newsletter} /> */
}

export const router = createBrowserRouter(routes);
