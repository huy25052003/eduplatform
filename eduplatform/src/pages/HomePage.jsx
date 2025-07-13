// src/pages/HomePage.jsx
import React, { useState, useEffect} from 'react';
import CourseCard from '../components/CourseCard';
import { products } from '../data/products';
import CourseModal from '../components/CourseModal';
import '../index.css'; 



const HomePage = () => {
  const [courses] = useState(products);
  const [favorites, setFavorites] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [viewedCourses, setViewedCourses] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  useEffect(() => {
    let filtered = courses;
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (priceFilter){
      filtered = filtered.filter(course => {
        if(priceFilter === '<500K') return course.price < 500000;
        if(priceFilter === '500K-1M') return course.price >= 500000 && course.price < 1000000;
        if(priceFilter === '>1M') return course.price > 1000000;
        return true;
      });
    }
    setFilteredCourses(filtered);
  }, [searchTerm, priceFilter, courses]);

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
    setViewedCourses(prev => [course.id, ...prev]);
  };
  return (
    <div className='container'>
      <h1>Chào mừng đến với EduPlatform</h1>
      <div className="button-group">
        <button onClick={() => {setShowFavorites(false); setShowHistory(false)}}>Danh sách khóa học</button>
        <button onClick={() => {setShowFavorites(true); setShowHistory(false)}}>Yêu thích</button>
        <button onClick={() => {setShowFavorites(false); setShowHistory(true)}}>Lịch sử xem</button>
      </div>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Tìm kiếm khóa học..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">Tất cả giá</option>
          <option value="<500K"> 500K</option>
          <option value="500K-1M">500K - 1M</option>
          <option value=">1M"> 1M</option>
        </select>
      </div>
      {showFavorites ? (
        <div className="course-list">
          {courses
            .filter(course => favorites.includes(course.id))
            .map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onViewDetails={viewDetails}
                onToggleFavorite={toggleFavorite}
                isFavorite={favorites.includes(course.id)}
              />
            ))}
        </div>
      ) : showHistory ? (
        <div className="course-list">
          {courses
            .filter(course => viewedCourses.includes(course.id))
            .map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onViewDetails={viewDetails}
                onToggleFavorite={toggleFavorite}
                isFavorite={favorites.includes(course.id)}
              />
            ))}
        </div>
      ) : (
        <div className="course-list">
          {filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onViewDetails={viewDetails}
              onToggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(course.id)}
            />
          ))}
        </div>
      )}
      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
    
  );
};

export default HomePage;
