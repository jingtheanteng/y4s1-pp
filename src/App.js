import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Page/ThemeContext';
import AdminHome from './Admin/Home';
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
import LoggedIn from './Page/LoggedIn';
import UserList from './Admin/User/UserList';
import CategoryList from './Admin/Category/CategoryList';
import DepartmentList from './Admin/Department/DepartmentList';
import FacultyList from './Admin/Faculty/FacultyList';
import PostList from './Admin/Post/PostList';
import CommentList from './Admin/Comment/CommentList';
import ReportList from './Admin/Report/ReportList';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    {/* Routes for Admin and User */}
                    <Route path="/admin" element={<AdminHome />} />
                    <Route path="/admin/users" element={<UserList />} />
                    <Route path="/admin/category" element={<CategoryList />} />
                    <Route path="/admin/department" element={<DepartmentList />} />
                    <Route path="/admin/faculty" element={<FacultyList />} />
                    <Route path="/admin/posts" element={<PostList />} />
                    <Route path="/admin/comments" element={<CommentList />} />
                    <Route path="/admin/reports" element={<ReportList />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/loginregister" element={<LoginRegister />} />
                    <Route path="/communities" element={<Communities />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/setting" element={<Setting />} />
                    <Route path="/notification" element={<Notification />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/department-community/:departmentId" element={<DepartmentCommunity />} />
                    <Route path="/post-detail/:id" element={<PostDetail />} />
                    <Route path="/viewprofile/:userId" element={<ViewProfile />} />
                    <Route path="/home-loggedin" element={<LoggedIn />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
