import {Routes , Route, Navigate} from "react-router-dom";
import Login from "./Routes/Login";
import Home from "./Routes/Home";
import New from "./Routes/New";
import Records from "./Routes/Records";
import Profile from "./Routes/Profile";
import {nullUser} from "./Routes/Login"




function App() {

 
  

  const PrivateRoute = ({children}) =>{
    return nullUser ? <Navigate to = "/"/> : children ;
  };

  return (
    <>
      
          <Routes>

            <Route exact path = "/" element={<Login/>}/> 

            <Route exact path ="/home" element={<PrivateRoute><Home/></PrivateRoute> }/>
            <Route exact path ="/new" element={<PrivateRoute><New/></PrivateRoute> }/>
            <Route exact path ="/records" element={<PrivateRoute><Records/></PrivateRoute> }/>
            <Route exact path ="/profile" element={<PrivateRoute><Profile/></PrivateRoute> }/>
        
           
          </Routes>
     
    </>
  );
}

export default App;
