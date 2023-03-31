import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";
import { Box, Stack } from "@mui/system";

const ProtectedRoute = () => {
  const {auth, loadingUser} = useAuth();

  console.log(auth)

  if(loadingUser) return 'Loading'
  else if (auth.hasOwnProperty('meUser')){
    return (<Box>
    <Header/>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar/>
        <Outlet/>
      </Stack>
  </Box>)
  }
  else if (auth.hasOwnProperty('loginUser')){
    return (<Box>
      <Header/>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar/>
          <Outlet/>
        </Stack>
    </Box>)
  }

  return (
    <Navigate to="/"/>
    // <>
    //   {auth.hasOwnProperty('meUser') ? 
    //   (
    //     <Box>
    //       <Header/>
    //         <Stack direction="row" spacing={2} justifyContent="space-between">
    //           <Sidebar/>
    //           <Outlet/>
    //         </Stack>
    //     </Box>
    //   )
    //   : <Navigate to="/"/>}
    // </>
  )
}

export default ProtectedRoute