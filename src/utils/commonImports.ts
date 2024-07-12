// src/utils/commonImports.ts
export { default as React, useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react';
export { useNavigate, Navigate, useLocation, Link } from 'react-router-dom';
export { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
export { verifyEmail ,resendVerifyEmail,registerAccountStudent,registerAccountInstructor,getLessons, createLesson, getSessions, createSession, createCourse, loginAccount, loginUserByGoogle, registerUserByGoogle, getCourses, getCurrentLogin, getUserData, changePassword, updateAccount, getCategories, createCategory, editCategory, deleteCategory } from '../services/Api';
export { setGlobalLoadingHandler } from '../services/axiosInstance';
export { default as config } from '../config/config';
export { default as logo } from '../assets/Logo-2.png';
export { EyeOutlined, EyeInvisibleOutlined, EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, ReadOutlined } from '@ant-design/icons';
export { Form, Input, Button, Table, Pagination, Modal, Select, notification, message, Typography } from 'antd';
export { ROLES, PATHS, ERROR } from '../consts/index';