
import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import CourseModal from '../components/CourseModal';
import BotpressChat from '../components/BotpressChat';
import { fetchCourses } from '../api/courseApi';
import '../index.css'; 

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [viewedCourses, setViewedCourses] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchCourses();
      setCourses(data);
      setFilteredCourses(data);
      setLoading(false);
    };
    loadData();
  }, []);


  useEffect(() => {
    let filtered = [...courses];
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (priceFilter) {
      filtered = filtered.filter(course => {
        if (priceFilter === '<500K') return course.price < 500000;
        if (priceFilter === '500K-1M') return course.price >= 500000 && course.price < 1000000;
        if (priceFilter === '>1M') return course.price > 1000000;
        return true;
      });
    }
    setFilteredCourses(filtered);
  }, [searchTerm, priceFilter, courses]);

  const toggleFavorite = (courseId) => {
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
    <>
      {/* Banner trái */}
      <div className="side-banner left-banner">
        <img
          src="https://cdn.divineshop.vn/image/catalog/Banner/banner%20d%E1%BB%8Dc%201%20t7-25-90116.png?hash=1751858704"
          alt="Left Banner"
        />
      </div>

      {/* Banner phải */}
      <div className="side-banner right-banner">
        <img
          src="https://cdn.divineshop.vn/image/catalog/Banner/banner%20d%E1%BB%8Dc%201%20t7-25-90116.png?hash=1751858704"
          alt="Right Banner"
        />
      </div>

      {/* Nội dung chính */}
      <header className="main-header">
        <div className="logo">EduPlatform</div>
        <nav className="nav-links">
          <button onClick={() => { setShowFavorites(false); setShowHistory(false); }}>Danh sách khóa học</button>
          <button onClick={() => { setShowFavorites(true); setShowHistory(false); }}>Yêu thích</button>
          <button onClick={() => { setShowFavorites(false); setShowHistory(true); }}>Lịch sử xem</button>
        </nav>
      </header>

      <div className='container'>
        
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
        {loading ? (
          <div className="skeleton-container">
            {[...Array(4)].map((_, i) => <div className="skeleton-card" key={i}></div>)}
          </div>
        ) : (
          <div className="course-list">
            {(showFavorites
              ? courses.filter(course => favorites.includes(course.id))
              : showHistory
                ? courses.filter(course => viewedCourses.includes(course.id))
                : filteredCourses
            ).map(course => (
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
        <BotpressChat />
      </div>
      <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} EduPlatform. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Về chúng tôi</a>
          <a href="#">Liên hệ</a>
          <a href="#">Chính sách bảo mật</a>
        </div>
      </div>
    </footer>
    </>
  );
};

export default HomePage;
