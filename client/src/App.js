import { Button, ChakraProvider, } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateSurvey from './pages/CreateSurvey';
import Home from './pages/Home';
import Survey from './pages/Survey';

const router = createBrowserRouter([{
  path: "/",
  children: [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/survey/new",
      element: <CreateSurvey />
    },
    {
      path: "/survey/:token",
      element: <Survey />
    }
  ]
}])


function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
