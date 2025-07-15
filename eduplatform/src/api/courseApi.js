export const fetchCourses = async () => {
  try {
    const response = await fetch('https://6876987f814c0dfa653ca435.mockapi.io/courses');
    if (!response.ok) throw new Error('Lỗi');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Lỗi khi gọi API:', err);
    return [];
  }
};
