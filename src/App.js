import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminHome from './Admin/Home';
import UserHome from './User/Home';
import LoginRegister from './Page/LoginRegister';
import Home from './Page/Home';
import Profile from './Page/Profile';
import Communities from './Page/Communities';
import Setting from './Page/Setting';
import Notification from './Page/Notification';
import ForgetPassword from './Page/ForgetPassword';
import EditProfile from './Page/EditProfile';
import DepartmentCommunity from './Page/DepartmentCommunity';
import PostDetail from './Page/PostDetail';
import ViewProfile from './Page/ViewProfile';

function App() {
    return (
        <Router>
            <Routes>
                {/* Routes for Admin and User */}
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/user" element={<UserHome />} />
                <Route path="/" element={<Home />} />
                <Route path="/loginregister" element={<LoginRegister />} />
                <Route path="/communities" element={<Communities />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/department-community" element={<DepartmentCommunity />} />
                <Route path="/post-detail" element={<PostDetail />} />
                <Route path="/view-profile" element={<ViewProfile />} />
            </Routes>
        </Router>
    );
}

export default App;
