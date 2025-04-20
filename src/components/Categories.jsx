import React from 'react';

const CategoryCard = ({ title, imageUrl, ideaCount }) => {
  return (
    <div className="relative overflow-hidden rounded-lg group cursor-pointer">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
          <p className="text-white text-lg">{ideaCount}+ Ideas</p>
        </div>
      </div>
    </div>
  );
};

const Categories = () => {
  const categories = [
    {
      title: 'Living Room',
      imageUrl: '/images/living-room.jpg',
      ideaCount: 150,
    },
    {
      title: 'Kitchen',
      imageUrl: '/images/kitchen.jpg',
      ideaCount: 220,
    },
    {
      title: 'Bedrooms',
      imageUrl: '/images/bedroom.jpg',
      ideaCount: 120,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore Room Ideas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories; 