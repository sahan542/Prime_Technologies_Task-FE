"use client";
import { FaShoppingBag, FaTruck, FaPhoneAlt, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaShoppingBag className="text-blue-600 text-2xl" />,
    title: "Easy Shopping",
    description: "Browse thousands of products with easy filtering and search",
    bg: "bg-blue-100",
  },
  {
    icon: <FaTruck className="text-green-600 text-2xl" />,
    title: "Fast Delivery",
    description: "Quick and reliable delivery to your doorstep",
    bg: "bg-green-100",
  },
  {
    icon: <FaPhoneAlt className="text-purple-600 text-2xl" />,
    title: "24/7 Support",
    description: "Get help whenever you need it from our support team",
    bg: "bg-purple-100",
  },
  {
    icon: <FaShieldAlt className="text-orange-600 text-2xl" />,
    title: "Secure Payments",
    description: "Safe and encrypted transactions with multiple payment options",
    bg: "bg-orange-100",
  },
];

const FeatureHighlights = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 ">
        <h2 className='font-bold text-2xl pb-4 text-[#7b1f4b] text-center'>What we Offer</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 text-center transition hover:shadow-md shadow-lg shadow-[#7b1f4b]/30"
          >
            <div
              className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-4 ${feature.bg}`}
            >
              {feature.icon}
            </div>
            <h3 className="font-semibold text-lg text-black mb-1">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlights;
