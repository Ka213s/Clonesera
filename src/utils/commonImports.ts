// src/utils/commonImports.ts
export { default as React, useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react';
export { useNavigate, Navigate, useLocation, Link } from 'react-router-dom';
export { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
export { getItemsByInstructor,getCourseDetail,getPublicCourses,logoutUser,getCourseLogs,createUser, deleteUser, changeUserStatus, changeUserRole, getUsers, deleteLesson, updateLesson, getLessonById, updateSession, deleteSession, getSessionById, changeCourseStatus, deleteCourse, updateCourse, getCourseById, verifyEmail, resendVerifyEmail, registerAccountStudent, registerAccountInstructor, getLessons, createLesson, getSessions, createSession, createCourse, loginAccount, loginUserByGoogle, registerUserByGoogle, getCourses, getCurrentLogin, getUserData, changePassword, updateAccount, getCategories, createCategory, editCategory, deleteCategory, getSubscribeds, getSubscribers, updateSubscribed, createCart } from '../services/Api';
export { setGlobalLoadingHandler } from '../services/axiosInstance';
export { default as config } from '../config/config';
export { default as logo } from '../assets/Logo-2.png';
// export { default as Artwork } from '../assets/Artwork.jpg';
export { EyeOutlined, EyeInvisibleOutlined, EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
export { Form, Input, Button, Table, Pagination, Modal, Spin, Select, notification, Tooltip } from 'antd';
export { ROLES } from '../consts/index';