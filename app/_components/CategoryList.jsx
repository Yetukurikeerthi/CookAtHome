import React from 'react';
import Image from 'next/image';

function CategoryList({ categoryList }) {
  return (
    <div className="mt-5">
      <h2 className="text-green-600 font-bold text-2xl mb-4 text-center">Shop by Category</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2">
        {categoryList.map((category) => {
          const iconUrl = category?.attributes?.icon?.[0]?.url 
            ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category.attributes.icon[0].url}`
            : null;

          return (
            <div 
              key={category.id} 
              className="flex flex-col items-center bg-green-50 p-2 rounded-lg transition-all duration-300 hover:bg-green-100 active:bg-green-200"
            >
              {iconUrl ? (
                <Image
                  src={iconUrl}
                  width={50}
                  height={50}
                  alt={category.attributes.name}
                  className="rounded-full transition-transform duration-300 hover:scale-110 active:scale-125"
                />
              ) : (
                <div className="w-[50px] h-[50px] bg-gray-200 rounded-full flex items-center justify-center">
                  No Image
                </div>
              )}
              {/* Category name below the icon */}
              <p className="text-lg font-semibold mt-2">{category.attributes.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryList;
