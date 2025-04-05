import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navigation = [
    { name: t("sidebar.home"), href: "/", icon: HomeIcon },
    { name: t("sidebar.search"), href: "/search", icon: MagnifyingGlassIcon },
    { name: t("sidebar.history"), href: "/history", icon: ClockIcon },
    { name: t("sidebar.analytics"), href: "/analytics", icon: ChartBarIcon },
    { name: t("sidebar.chat"), href: "/chat", icon: ChatBubbleLeftRightIcon },
  ];

  // Mock search history data
  const searchHistory = [
    { id: 1, query: "iPhone 13 Pro", date: "2024-03-18" },
    { id: 2, query: "Samsung Galaxy S24", date: "2024-03-17" },
    { id: 3, query: "MacBook Pro M2", date: "2024-03-16" },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg h-screen">
      <div className="p-4">
        {/* Navigation */}
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 ${
                    isActive
                      ? "text-primary-700 dark:text-primary-200"
                      : "text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Search History */}
        <div className="mt-8">
          <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
            {t("sidebar.recentSearches")}
          </h3>
          <div className="mt-2 space-y-1">
            {searchHistory.map((item) => (
              <button
                key={item.id}
                className="w-full text-left px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white rounded-md"
                onClick={() => {
                  // Handle search history click
                }}
              >
                <div className="flex items-center">
                  <MagnifyingGlassIcon className="mr-3 h-4 w-4 text-gray-400" />
                  <span className="truncate">{item.query}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(item.date).toLocaleDateString()}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
