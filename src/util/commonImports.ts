// src/utils/commonImports.ts
export { default as React, useState, useEffect } from 'react';
export { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
export { loginAccount ,getCourses } from '../services/Api';
export { setGlobalLoadingHandler } from '../services/axiosInstance';
export { default as config } from '../config/config';
export { default as logo } from '../assets/Logo-2.png';
export { default as Artwork } from '../assets/Artwork.jpg';
export {EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
export {Form, Input, Button} from 'antd';