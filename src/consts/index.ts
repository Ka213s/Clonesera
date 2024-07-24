

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
  PURCHASE: '/purchase',
  BLOG: '/blog',
  PAYOUT_MANAGEMENT: '/payout-management',
  DASHBOARD_ADMIN: '/dashboard-admin'
}
export const INSTRUCTOR = {
  COURSE: '/courses',
  LIST_SUBSCRIPTION: '/list-subscription',
  VIEW_ALL_COURSE: '/view-all-course',
  VIEW_MY_PROFILE: '/view-my-profile',
  VIEW_PROFILE: '/view-profile/:id',
  COURSE_SOLD: '/courses-sold',
  REVIEW: '/review',
  PAYOUT: '/payout',
  TRANSACTION_DETAIL: '/transaction/:id',
  DASHBOARD_INSTRUCTOR: '/dashboard-instructor'
};
export const PUBLIC = {
  HOME: '/homepage',
  VIEW_ALL_COURSE_HP: '/homepage/view-all-course',
  COURSE_DETAIL: '/course-detail/:id',
  LOGOUT: '/logout',
  ANOTHER_PAGE: '/another-page',
  LOGIN: '/login',
  REGISTER: '/register',
  SETTING_PAGE: '/setting-page',
  VERIFY_EMAIL: '/verify-email/:token',
  FORGOT_PASSWORD: '/forgot-password',
  LIST_SUBSCRIBED: '/list-subscribed',
  SUBCRIPTION: '/subcription',
  VIEW_CART: '/view-cart',
  PAYMENT: '/payment',
  VIEW_ORDER: '/view-order',
  LEARN_COURSE: '/learn-course-detail/:id',
  BLOG_DETAIL: '/blog-detail/:id',
  DASHBOARD_STUDENT: '/dashboard-student'
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
    { text: "Dashboard", icon: "AppstoreOutlined", url: "/dashboard-instructor" },
    { text: "My Profile", icon: "UserOutlined", url: "/view-my-profile" },
    { text: "Manage Course", icon: "BookOutlined", url: "/courses" },
    { text: "Subscription", icon: "BellOutlined", url: "/list-subscription" },
    { text: "Log Course", icon: "BookOutlined", url: "/log-course" },
    { text: "Courses Sold", icon: "ShoppingCartOutlined", url: "/courses-sold" }, // Courses others have bought from me
    { text: "Payout", icon: "TransactionOutlined", url: "/payout" },
    { text: "Order", icon: "FileTextOutlined", url: "/view-order" },
    { text: "Review", icon: "StarOutlined", url: "/review" },
    { text: "Setting", icon: "SettingOutlined", url: "/setting-page" }

  ]
};

export const SidebarStudentData = {
  studentSidebarItem: [
    { text: "Dashboard", icon: "FaDashboard", url: "/dashboard-student" },
    { text: "Subscription", icon: "FaBell", url: "/list-subscribed" },
    { "text": "Setting", icon: "FaCogs", url: "/setting-page" },
    { "text": "Order", icon: "FaBill", url: "/view-order" },
    // { "text": "Notifications", "icon": "FaBell", "url": "/student/notifications" },
    // { "text": "My Certificates", "icon": "FaCertificate", "url": "/student/myCertificates" },
    // { "text": "Reviews", "icon": "FaStar", "url": "/student/reviews" },
    // { "text": "Credits", "icon": "FaCreditCard", "url": "/student/credits" },
    // { "text": "Statements", "icon": "FaFile", "url": "/student/statements" },
    // { "text": "Send Feedback", "icon": "FaPaperPlane", "url": "/feedback" }
  ]
};

export const SidebarAdminData = {
  menuItems: [
    { "key": "/dashboard-admin", "label": "Dashboard", "icon": "AppstoreOutlined" },
    { "key": "/display-account", "label": "Manager User", "icon": "TeamOutlined" },
    { "key": "/request-management", "label": "Request Management", "icon": "TeamOutlined" },
    { "key": "/categories", "label": "Category Management", "icon": "DashboardOutlined" },
    { "key": "/view-all-course", "label": "All Courses", "icon": "BookOutlined" },
    { "key": "/pending-courses", "label": "Pending Courses", "icon": "BookOutlined" },
    { "key": "/log-course", "label": "Course Log", "icon": "BookOutlined" },
    { "key": "/purchase", "label": "Purchase", "icon": "ShoppingCartOutlined" },
    { "key": "/payout-management", "label": "Payout Management", "icon": "FileTextOutlined" },
    { "key": "/blog", "label": "Blog", "icon": "MessageOutlined" }

  ]
};
