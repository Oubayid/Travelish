import './css/App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import AdminDashboard from './Components/AdminDashboard';
import AddingBusiness from './Components/AddingBusiness'
import AdminDetailView from './Components/AdminDetailView';
import SearchResults from './Components/SearchResults';
import NewComment from './Components/NewComment'
import SignIn from './Components/SignIn'
import CreateAccount from './Components/CreateAccount'
import UserDetailView from './Components/UserDetailView'
import SplashScreen from './Components/SplashScreen';


function App() {

  const [businessData, setBusinessData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [sorted,setSorted] =useState([]);
  const [selected, setSelected] = useState({});
  const [trigger, setTrigger] = useState(false);
  const [user,setUser] = useState('');
  const [stars, setStars] = useState(0);


  // ! BUSINESS DATA
  useEffect(() => { axios.get("http://localhost:4004/bussiness/getAllBussinesss")
    .then((resp) => {
    setBusinessData(resp.data);
    })
    .catch((err) => console.log(err));
  }, [trigger]);
  // ! REVIEW DATA
  useEffect(() => { axios.get("http://localhost:4004/review/getAllReviews")
    .then((resp) => {
    setReviewData(resp.data);
    })
    .catch((err) => console.log(err));
  }, [trigger]);
  
  
  return (
    <div className="App">
      <Router>
        <NavBar data={businessData} sorted={setSorted} connected={user}/>
        <Routes>
          <Route path='/' element={<SplashScreen />}></Route>
          <Route path="/Home" element={<Home data={businessData} trigger={trigger} setTrigger={setTrigger}/>}  />
          <Route path="/SearchResults" element={<SearchResults data={sorted} review={reviewData} select={setSelected} rate={setStars}/>} />
          <Route path="/AdminDetailView" element={<AdminDetailView data={selected} stars={stars} review={reviewData}/>} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/AddingBusiness" element={<AddingBusiness />} />
          <Route path="/NewComment" element={<NewComment data={selected}/>} />
          <Route path="/SignIn" element={<SignIn connected={setUser}/>} />
          <Route path="/CreateAccount" element={<CreateAccount/>} />
          <Route path="/UserDetailView" element={<UserDetailView data={selected} stars={stars} review={reviewData}/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;