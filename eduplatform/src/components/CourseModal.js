import React from 'react';
import '../index.css';

const CourseModal = ({ course, onClose }) => {
  if (!course) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{course.name}</h2>
        <img src={course.image} alt={course.name} />
        <p className="description">{course.shortDesc}</p>
        <p className="price">{(course.price / 1000).toFixed(0)}K VND</p>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default CourseModal;