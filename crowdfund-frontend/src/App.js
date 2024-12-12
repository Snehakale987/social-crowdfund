import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Home from './components/Home';
import CauseDetailsPage from './components/CauseDetailsPage';
import UserCampaigns from './components/UserCampaigns';
import {AuthProvider, useAuth} from './context/AuthContext';
import Footer from "./components/Footer";
import setupAxiosInterceptors from "./utils/axiosInterceptors";
import CreateCausePage from "./components/CreateCausePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import CategoryPage from "./components/CategoryPage";
import AboutPage from "./components/About";
import ContactPage from "./components/ContactPage";
import Causes from "./components/Causes";

function App() {
    const {setUser } = useAuth();

    useEffect(() => {
        setupAxiosInterceptors(setUser); // Initialize Axios interceptors
    }, [setUser]);

    return (
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/cause-details/:id" element={<CauseDetailsPage />} />
                    <Route path="/user/:id" element={<UserCampaigns />} />
                    <Route path="/create-cause" element={<ProtectedRoute><CreateCausePage /></ProtectedRoute>} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/category/:id" element={<CategoryPage/>}/>
                    <Route path="/about" element={<AboutPage/>} />
                    <Route path="/contact" element={<ContactPage/>} />
                    <Route path="/causes" element={<Causes/>} />
                </Routes>
                <Footer/>
            </Router>
    );
}

export default App;
