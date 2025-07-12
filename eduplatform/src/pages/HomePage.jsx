// src/pages/HomePage.jsx
import React, {useState} from 'react';
import CourseCard from '../components/CourseCard';
import { products } from '../data/products';
import '../index.css'; 



const HomePage = () => {
  const [courses] = useState(products);
  const [favorites, setFavorites] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const toggleFavorite = (courseId) =>{
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(courseId)) {
        return prevFavorites.filter(id => id !== courseId);
      } else {
        return [...prevFavorites, courseId];
      }
    });
  };

  const viewDetails = (course) => {
    setSelectedCourse(course);
  };
  return (
    <div className='container'>
      <h1>Chào mừng đến với EduPlatform</h1>
      <h2>Danh sách sản phẩm</h2>
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />
      <div className='course-list'>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onViewDetails={viewDetails}
            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(course.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
