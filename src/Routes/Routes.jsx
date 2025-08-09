import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../Root/Dashboard/Dashboard";
import DashboardHome from "../Root/Dashboard/Dashoardhome";

const Root = lazy(() => import("../Root/Root"));
const HomePage = lazy(() => import("../Pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const UpdateProfilePage = lazy(() => import("../Pages/UpdateProfilePage"));
const MyProfilePage = lazy(() => import("../pages/MyProfilePage"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage"));
const ErrorComponent = lazy(() => import("../Components/ErrorComponent"));
const FullManualAccess = lazy(() => import("../Components/FullManualAccess"));
const PreservationGuide = lazy(() => import("../Pages/PreservationGuide"));
const MyLikedPage = lazy(() => import("../Pages/MyLikedPage"));
const AddArtifactPage = lazy(() => import("../Pages/AddArtifactPage"));
const AllArtifactsPage = lazy(() => import("../Pages/AllArtifacts"));
const ArtifactDetail = lazy(() => import("../Pages/ArtifactDetail"));
const MyCollection = lazy(() => import("../Pages/MyCollection"));
const UpdateArtifact = lazy(() => import("../Pages/UpdateArtifact"));
const ArtifactAIAssistant = lazy(() => import("../Pages/ArtifactAIAssistant"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorComponent isFullPage={true} />,
    hydrateFallback: <LoadingSpinner />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
        hydrateFallback: <LoadingSpinner />,
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LoginPage />
          </Suspense>
        ),
        hydrateFallback: <LoadingSpinner />,
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <RegisterPage />
          </Suspense>
        ),
        hydrateFallback: <LoadingSpinner />,
      },
      {
        path: "/forgot-password",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ForgotPasswordPage />
          </Suspense>
        ),
      },

      {
        path: "/myProfile",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoutes>
              <MyProfilePage />
            </PrivateRoutes>
          </Suspense>
        ),
      },
      {
        path: "/update-profile",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoutes>
              <UpdateProfilePage />
            </PrivateRoutes>
          </Suspense>
        ),
      },
      {
        path: "/addArtifacts",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoutes>
              <AddArtifactPage />
            </PrivateRoutes>
          </Suspense>
        ),
      },
      {
        path: "/allArtifacts",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AllArtifactsPage />
          </Suspense>
        ),
        loader: () => fetch(`${import.meta.env.VITE_URL}artifacts`),
      },
      {
        path: "/artifact-details/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoutes>
              <ArtifactDetail />
            </PrivateRoutes>
          </Suspense>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_URL}artifacts/${params.id}`),
      },
      {
        path: "/myCollection/:email",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoutes>
              <MyCollection />
            </PrivateRoutes>
          </Suspense>
        ),
      },
      {
        path: "/update-artifact/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoutes>
              <UpdateArtifact />
            </PrivateRoutes>
          </Suspense>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_URL}artifacts/${params.id}`),
      },
      {
        path: "/likedItems/:email",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PrivateRoutes>
              <MyLikedPage />
            </PrivateRoutes>
          </Suspense>
        ),
      },
      {
        path: "/accessManual",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <FullManualAccess />
          </Suspense>
        ),
      },
      {
        path: "/preservation-guide",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PreservationGuide />
          </Suspense>
        ),
      },
      {
        path: "/assistant",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ArtifactAIAssistant/>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard/>,
    children: [
      {
        index: true , element: <DashboardHome/>
      }
    ]
  }
]);
