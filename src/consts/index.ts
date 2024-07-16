

export const ROLES = {
  ADMIN: "admin",
  STUDENT: "student",
  INSTRUCTOR: "instructor",
};

export const ERROR = {
  ERROR500: '/500',
  ERROR403: '/403',
  ERROR404: '/404',
};
export const ADMIN = {
  REQUEST_MANAGEMENT: '/request-management',
  DISPLAY_ACCOUNT: '/display-account',
  CREATE_ACCOUNT: '/create-account',
  CATEGORY: '/categories',
  PENDING_COURSE: '/pending-courses',
  LOG_COURSE: '/log-course',
}
export const INSTRUCTOR = {
  COURSE: '/courses',
  LIST_SUBSCRIPTION: '/list-subscription',
  VIEW_ALL_COURSE: '/view-all-course',
  VIEW_PROFILE: '/view-profile'
};
export const PUBLIC = {
  HOME: '/',
  COURSE_DETAIL: '/course-detail/:id',
  LOGOUT: '/logout',
  ANOTHER_PAGE: '/another-page',
  LOGIN: '/login',
  REGISTER: '/register',
  SETTING_PAGE: '/setting-page',
  VERIFY_EMAIL: '/verify-email/:token',
  FORGOT_PASSWORD: '/forgot-password',
  LIST_SUBSCRIBED: '/list-subscribed',
  VIEW_CART: '/view-cart',
  PAYMENT: '/payment'
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

export const SidebarIntructorData = {
  insSidebarItem: [
    { text: "My Profile", icon: "UserOutlined", url: "/view-profile" },
    { text: "Manage Course", icon: "BookOutlined", url: "/courses" },
    { text: "View All Course ", icon: "BookOutlined", url: "/view-all-course" },
    { text: "Subscription", icon: "BellOutlined", url: "/list-subscription" },
    { text: "Log Course", icon: "BookOutlined", url: "/log-course" },
    // { text: "Messages", icon: "MessageOutlined", url: "/instructor/messages" },
    // { text: "Notifications", icon: "BellOutlined", url: "/instructor/notifications" },
    // { text: "My Certificates", icon: "SafetyCertificateOutlined", url: "/instructor/myCertificates" },
    // { text: "Reviews", icon: "StarOutlined", url: "/instructor/reviews" },
    // { text: "Earning", icon: "DollarOutlined", url: "/instructor/earning" },
    // { text: "Payout", icon: "WalletOutlined", url: "/instructor/payout" },
    // { text: "Statements", icon: "FileTextOutlined", url: "/instructor/statements" },
    // { text: "Verification", icon: "CheckOutlined", url: "/instructor/verification" },
    { text: "Setting", icon: "SettingOutlined", url: "/setting-page" },
    // { text: "Send Feedback", icon: "SendOutlined", url: "/feedback" }
  ]
};

export const SidebarStudentData = {
  studentSidebarItem: [
    { text: "Subscription", icon: "FaBell", url: "/list-subscribed" },
    // { "text": "Purchased Courses", "icon": "FaBook", "url": "/student/purchasedCourses" },
    // { "text": "Messages", "icon": "FaComments", "url": "/student/messages" },
    // { "text": "Notifications", "icon": "FaBell", "url": "/student/notifications" },
    // { "text": "My Certificates", "icon": "FaCertificate", "url": "/student/myCertificates" },
    // { "text": "Reviews", "icon": "FaStar", "url": "/student/reviews" },
    // { "text": "Credits", "icon": "FaCreditCard", "url": "/student/credits" },
    // { "text": "Statements", "icon": "FaFile", "url": "/student/statements" },
    { "text": "Setting", "icon": "FaCogs", "url": "/setting-page" },
    // { "text": "Send Feedback", "icon": "FaPaperPlane", "url": "/feedback" }
  ]
};

export const SidebarAdminData = {
  menuItems: [
    { "key": "/display-account", "label": "Manager User", "icon": "TeamOutlined" },
    { "key": "/request-management", "label": "Request Management", "icon": "TeamOutlined" },
    { "key": "/categories", "label": "Category Management", "icon": "DashboardOutlined" },
    { "key": "/view-all-course", "label": "All Courses", "icon": "BookOutlined" },
    { "key": "/pending-courses", "label": "Pending Courses", "icon": "BookOutlined" },
    { "key": "/log-course", "label": "Course Log", "icon": "BookOutlined" }

  ]
};
