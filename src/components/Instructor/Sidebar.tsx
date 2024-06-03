import React from "react";
import {
  HomeIcon,
  BookOpenIcon,
  ChartBarIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  DocumentReportIcon,
  BadgeCheckIcon,
  ClipboardListIcon,
  CogIcon,
} from "@heroicons/react/solid";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 p-6">
      <div className="text-2xl font-bold mb-6">Cursus</div>
      <nav>
        <ul>
          <li className="mb-4">
            <a href="#" className="flex items-center space-x-2">
              <HomeIcon className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center space-x-2">
              <BookOpenIcon className="h-5 w-5" />
              <span>Courses</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
