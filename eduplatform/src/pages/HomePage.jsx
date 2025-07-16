import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import CourseModal from '../components/CourseModal';
import BotpressChat from '../components/BotpressChat';
import { fetchCourses } from '../api/courseApi';
import '../index.css';

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [viewedCourses, setViewedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const coursesPerPage = 8;

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
    setCurrentPage(1);
  }, [searchTerm, priceFilter, courses]);

  useEffect(() => {
    setCurrentPage(1);
  }, [showFavorites, showHistory]);

  const toggleFavorite = (courseId) => {
    setFavorites((prev) =>
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  };

  const viewDetails = (course) => {
    setSelectedCourse(course);
    setViewedCourses((prev) =>
      prev.includes(course.id) ? prev : [course.id, ...prev]
    );
  };

  const fetchSuggestions = async () => {
    try {
      const viewedAndFavorited = [...new Set([...viewedCourses, ...favorites])];
      let suggestions = courses.filter(course => !viewedAndFavorited.includes(course.id));
      
      if (suggestions.length === 0) {
        suggestions = courses.slice(0, 3);
      } else {
        suggestions = suggestions.sort(() => 0.5 - Math.random()).slice(0, 3);
      }
      
      setSuggestedCourses(suggestions);
      setShowSuggestions(true);
    } catch (err) {
      console.error(err);
      setSuggestedCourses([]);
    }
  };

  const listToShow = showFavorites
    ? courses.filter(course => favorites.includes(course.id))
    : showHistory
      ? courses.filter(course => viewedCourses.includes(course.id))
      : filteredCourses;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = listToShow.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(listToShow.length / coursesPerPage);

  return (
    <div className="page-wrapper">
      <div className="side-banner left-banner">
        <img
          src="https://cdn.divineshop.vn/image/catalog/Banner/banner%20d%E1%BB%8Dc%201%20t7-25-90116.png?hash=1751858704"
          alt="Left Banner"
        />
      </div>

      <div className="side-banner right-banner">
        <img
          src="https://cdn.divineshop.vn/image/catalog/Banner/banner%20d%E1%BB%8Dc%201%20t7-25-90116.png?hash=1751858704"
          alt="Right Banner"
        />
      </div>

      <header className="main-header">
        <div className="logo">EduPlatform</div>
        <nav className="nav-links">
          <button onClick={() => { setShowFavorites(false); setShowHistory(false); setShowSuggestions(false); }}>
            Danh sách
          </button>
          <button onClick={() => { setShowFavorites(true); setShowHistory(false); setShowSuggestions(false); }}>
            Yêu thích
          </button>
          <button onClick={() => { setShowFavorites(false); setShowHistory(true); setShowSuggestions(false); }}>
            Lịch sử xem
          </button>
        </nav>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
              <option value="">Tất cả giá</option>
              <option value="<500K"> 500K</option>
              <option value="500K-1M">500K - 1M</option>
              <option value=">1M"> 1M</option>
            </select>
            <button onClick={fetchSuggestions} className="suggest-button">
              Gợi ý sản phẩm phù hợp
            </button>
          </div>

          {showSuggestions ? (
            <div className="suggestions-section">
              <h2>Gợi ý khóa học</h2>
              {suggestedCourses.length > 0 ? (
                <div className="course-list">
                  {suggestedCourses.map(course => (
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
                <p>Không có gợi ý phù hợp.</p>
              )}
            </div>
          ) : loading ? (
            <div className="skeleton-container">
              {[...Array(4)].map((_, i) => <div className="skeleton-card" key={i}></div>)}
            </div>
          ) : (
            <div className="course-list">
              {currentCourses.map(course => (
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

          {!loading && !showSuggestions && totalPages > 1 && (
            <div className="pagination">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? 'active' : ''}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
          <BotpressChat />
        </div>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <p>© {new Date().getFullYear()} EduPlatform. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Về chúng tôi</a>
 egregate: <a href="#">Liên hệ</a>
            <a href="#">Chính sách bảo mật</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;