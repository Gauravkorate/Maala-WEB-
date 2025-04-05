import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MagnifyingGlassIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic
  };

  const handleVoiceSearch = () => {
    // Handle voice search logic
  };

  // Mock featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 13 Pro",
      price: 999.99,
      originalPrice: 1099.99,
      image: "https://via.placeholder.com/200",
      rating: 4.8,
      reviews: 1250,
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: 799.99,
      originalPrice: 899.99,
      image: "https://via.placeholder.com/200",
      rating: 4.6,
      reviews: 980,
    },
    {
      id: 3,
      name: "MacBook Pro M2",
      price: 1299.99,
      originalPrice: 1499.99,
      image: "https://via.placeholder.com/200",
      rating: 4.9,
      reviews: 850,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          Welcome to Maani
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          {t("home.tagline")}
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSearch}
          className="mt-1 relative rounded-md shadow-sm"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder={t("search.placeholder")}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              type="button"
              onClick={handleVoiceSearch}
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <MicrophoneIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>

      {/* Featured Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t("home.featuredProducts")}
        </h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="w-full min-h-80 bg-gray-200 dark:bg-gray-700 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 dark:text-gray-200">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {product.rating} ★ ({product.reviews} {t("product.reviews")}
                    )
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    ${product.price}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    ${product.originalPrice}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {t("product.negotiate")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
