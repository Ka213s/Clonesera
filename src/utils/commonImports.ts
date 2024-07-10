// src/utils/commonImports.ts
export { default as React, useState, useEffect, createContext, useContext } from 'react';
export { useNavigate,Navigate , useLocation, Link } from 'react-router-dom';
export { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
export { loginAccount, getCourses, getCurrentLogin } from '../services/Api';
export { setGlobalLoadingHandler } from '../services/axiosInstance';
export { default as config } from '../config/config';
export { default as logo } from '../assets/Logo-2.png';
export { default as Artwork } from '../assets/Artwork.webp';
export { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
export { Form, Input, Button, Radio } from 'antd';
export { ROLES, PATHS } from '../consts/index';
