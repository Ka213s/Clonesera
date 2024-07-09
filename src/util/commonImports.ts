// src/utils/commonImports.ts
export { default as React, useState, useEffect, useCallback, useMemo} from 'react';
export { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
export { loginAccount ,getCourses, getCategories, createCategory, editCategory, deleteCategory} from '../services/Api';
export { setGlobalLoadingHandler } from '../services/axiosInstance';
export { default as config } from '../config/config';
export { default as logo } from '../assets/Logo-2.png';
export { default as Artwork } from '../assets/Artwork.jpg';
export {EyeOutlined, EyeInvisibleOutlined, EditOutlined, DeleteOutlined, PlusOutlined} from '@ant-design/icons';
export {Form, Input, Button, Table, Pagination, Modal, Select} from 'antd';
export { default as Category} from '../pages/Category';
export { default as CategoryForm} from '../pages/CategoryForm';