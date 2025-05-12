import React from "react";
import { categories } from "../data/categories";

const CategoryList = ({ setSelectedCategoryId }) => {
  return (
    <div className="p-4 font-sans bg-[#1f1f1f] min-h-screen">
      <h2 className="text-xl font-bold text-center mb-4 text-white">Категории</h2>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
            className="rounded-xl overflow-hidden relative h-28 bg-gray-800 cursor-pointer shadow-md"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white text-sm p-2">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
