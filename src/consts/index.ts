

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
export const INSTRUCTOR = {
  COURSE: '/courses',
};
export const PUBLIC = {
  HOME: '/',
  LOGOUT: '/logout',
  ANOTHER_PAGE: '/another-page',
  LOGIN: '/login',
  REGISTER: '/register',
  CATEGORY: '/categories',
  SETTING_PAGE: '/setting-page',
  VERIFY_EMAIL: '/verify-email/:token',
  FORGOT_PASSWORD: '/forgot-password'
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
    { text: "Dashboard", icon: "HomeOutlined", url: "/instructor/dashboard" },
    { text: "Courses", icon: "BookOutlined", url: "/instructor/courses" },
    { text: "My Lesson", icon: "BookOutlined", url: "/instructor/myLesson" },
    { text: "Analysis", icon: "LineChartOutlined", url: "/instructor/analysis" },
    { text: "Messages", icon: "MessageOutlined", url: "/instructor/messages" },
    { text: "Notifications", icon: "BellOutlined", url: "/instructor/notifications" },
    { text: "My Certificates", icon: "SafetyCertificateOutlined", url: "/instructor/myCertificates" },
    { text: "Reviews", icon: "StarOutlined", url: "/instructor/reviews" },
    { text: "Earning", icon: "DollarOutlined", url: "/instructor/earning" },
    { text: "Payout", icon: "WalletOutlined", url: "/instructor/payout" },
    { text: "Statements", icon: "FileTextOutlined", url: "/instructor/statements" },
    { text: "Verification", icon: "CheckOutlined", url: "/instructor/verification" },
    { text: "Setting", icon: "SettingOutlined", url: "/settings" },
    { text: "Send Feedback", icon: "SendOutlined", url: "/feedback" }
  ]
};

export const SidebarStudentData = {
  studentSidebarItem: [
    { "text": "Dashboard", "icon": "FaHome", "url": "/student/dashboard" },
    { "text": "Purchased Courses", "icon": "FaBook", "url": "/student/purchasedCourses" },
    { "text": "Messages", "icon": "FaComments", "url": "/student/messages" },
    { "text": "Notifications", "icon": "FaBell", "url": "/student/notifications" },
    { "text": "My Certificates", "icon": "FaCertificate", "url": "/student/myCertificates" },
    { "text": "Reviews", "icon": "FaStar", "url": "/student/reviews" },
    { "text": "Credits", "icon": "FaCreditCard", "url": "/student/credits" },
    { "text": "Statements", "icon": "FaFile", "url": "/student/statements" },
    { "text": "Setting", "icon": "FaCogs", "url": "/settings" },
    { "text": "Send Feedback", "icon": "FaPaperPlane", "url": "/feedback" }
  ]
};

export const SidebarAdminData = {
  menuItems: [
    {
      "key": "/admin/dashboard",
      "icon": "DashboardOutlined",
      "label": "Dashboard"
    },
    {
      "key": "/admin/requestManagement",
      "icon": "DashboardOutlined",
      "label": "Request Management"
    },
    {
      "key": "instructor",
      "icon": "TeamOutlined",
      "label": "User",
      "children": [
        { "key": "/admin/allUser", "label": "All User" },
        { "key": "/admin/addUser", "label": "Add User" }
      ]
    },
    {
      "key": "Categories",
      "icon": "DashboardOutlined", // Changed to an available icon
      "label": "Categories",
      "children": [
        { "key": "/admin/category-management", "label": "Category Management" }
      ]
    },
    {
      "key": "courses",
      "icon": "BookOutlined",
      "label": "Courses",
      "children": [
        { "key": "/admin/courses", "label": "All Courses" },
        { "key": "/admin/pending_courses", "label": "Pending Courses" },
        { "key": "/admin/reviews", "label": "Reviews" }
      ]
    }
  ]
};
