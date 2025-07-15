import React from "react";
import '../index.css'; 

const CourseCard = ({ course, onViewDetails, onToggleFavorite, isFavorite }) => {
    return (
        <div className="course-card">
            <img src={course.image} alt={course.name} />
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <p>Giá: {course.price.toLocaleString()}đ</p>
            <div>
                <button onClick={() => onViewDetails(course)}>Xem chi tiết</button>
                <button
          className={`favorite ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(course.id)}
        >
          {isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'}
        </button>
            </div>
        </div>
    );
};

export default CourseCard;