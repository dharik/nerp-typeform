import { ChakraProvider, } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateSurvey from './pages/CreateSurvey';
import Home from './pages/Home';
import Survey from './pages/Survey';

import {
  QueryClient,
  QueryClientProvider
} from 'react-query'

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

const queryClient = new QueryClient()

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
