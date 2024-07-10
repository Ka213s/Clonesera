// src/utils/commonImports.ts
export { default as React, useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react';
export { useNavigate,Navigate , useLocation, Link } from 'react-router-dom';
export { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
export { createSession,createCourse,loginAccount, loginUserByGoogle, registerUserByGoogle ,getCourses, getCurrentLogin, getCategories, createCategory, editCategory, deleteCategory } from '../services/Api';
export { setGlobalLoadingHandler } from '../services/axiosInstance';
export { default as config } from '../config/config';
export { default as logo } from '../assets/Logo-2.png';
// export { default as Artwork } from '../assets/Artwork.jpg';
export { EyeOutlined, EyeInvisibleOutlined, EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
export { Form, Input, Button, Table, Pagination, Modal, Select } from 'antd';
export { ROLES,PATHS } from '../consts/index';