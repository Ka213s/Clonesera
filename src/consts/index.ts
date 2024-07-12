

export const ROLES = {
  ADMIN: "admin",
  STUDENT: "student",
  INSTRUCTOR: "instructor",
};

export const ERROR = {
  ER500: '/500',
  ER403: '/403',
  ER404: '/404',
};

export const PATHS = {
  HOME: '/',
  LOGOUT: '/logout',
  ERROR500: '/500',
  ERROR403: '/403',
  ERROR404: '/404',
  ANOTHER_PAGE: '/another-page',
  LOGIN: '/login',
  REGISTER: '/register',
  CATEGORY: '/categories',
  COURSE: '/courses',
  SETTING_PAGE: '/setting-page',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_EMAIL: '/verify-email/:token'
};

export const sidebarMenuItemsData = {
  menuItems: [
    { text: 'Home', icon: 'HomeOutlined', url: '/home' },
    { text: 'LiveStream', icon: 'VideoCameraOutlined', url: '/livestream' },
    { text: 'Explore', icon: 'CompassOutlined', url: '/explore' },
    {
      text: 'Categories',
      icon: 'UnorderedListOutlined',
      url: '#',
      subItems: [
        { text: 'Development', url: '/categories/development' },
        { text: 'Business', url: '/categories/business' },
        { text: 'Finance & Accounting', url: '/categories/finance-accounting' },
        { text: 'IT & Software', url: '/categories/it-software' },
        { text: 'Office Productivity', url: '/categories/office-productivity' },
        { text: 'Personal Development', url: '/categories/personal-development' },
        { text: 'Design', url: '/categories/design' },
        { text: 'Marketing', url: '/categories/marketing' },
        { text: 'Lifestyle', url: '/categories/lifestyle' },
        { text: 'Photography', url: '/categories/photography' },
        { text: 'Health & Fitness', url: '/categories/health-fitness' },
        { text: 'Music', url: '/categories/music' },
        { text: 'Teaching & Academics', url: '/categories/teaching-academics' }
      ]
    },
    {
      text: 'Tests',
      icon: 'BookOutlined',
      url: '#',
      subItems: [
        { text: 'Certification Center', url: '/tests/certification-center' },
        { text: 'Certification Fill Form', url: '/tests/certification-fill-form' },
        { text: 'Test View', url: '/tests/test-view' },
        { text: 'Test Result', url: '/tests/test-result' },
        { text: 'My Certification', url: '/tests/my-certification' }
      ]
    },
    { text: 'Saved Course', icon: 'SaveOutlined', url: '/saved' },
    { text: 'Page Subscription', icon: 'BellOutlined', url: '/subscription' },
    { text: 'Setting', icon: 'SettingOutlined', url: '/settings' },
    { text: 'Help', icon: 'QuestionCircleOutlined', url: '/help' },
    { text: 'Report History', icon: 'HistoryOutlined', url: '/report-history' },
    { text: 'Send Feedback', icon: 'SendOutlined', url: '/feedback' }
  ]
};

