import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Budget from "./features/Budget";
import Home from "./features/Home";
import User from "./features/User";
import SignupForm from "./features/Authentication/SignupForm"; // Ensure this path is correct
import Applayout from "./ui/Applayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./ui/ProtectedRoute";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const router = createBrowserRouter([
    // Public routes
    {
      path: "/login",
      element: <User />,
    },
    {
      path: "/signup",
      element: <SignupForm />,
    },
    // Protected routes
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Applayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "budget",
          element: <Budget />,
        },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
