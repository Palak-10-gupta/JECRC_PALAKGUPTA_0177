import React from "react";

const reviewsData = [
  { name: "Emma W.", avatar: "EW", rating: 5, date: "Dec 12, 2024", text: "Absolutely love this product. Exceeded all my expectations. The build quality is outstanding and it works perfectly." },
  { name: "James M.", avatar: "JM", rating: 4, date: "Nov 28, 2024", text: "Great product overall. Setup was easy and performance is excellent. Would highly recommend to anyone looking for quality." },
  { name: "Sofia G.", avatar: "SG", rating: 5, date: "Nov 15, 2024", text: "Best purchase I've made this year. The attention to detail is remarkable. Fast shipping and well packaged too." },
  { name: "Noah B.", avatar: "NB", rating: 4, date: "Oct 30, 2024", text: "Solid product, works as advertised. Minor quibble with the packaging but the product itself is top notch." },
];

const Reviews = () => (
  <div className="reviews-section">
    <div className="reviews-summary">
      <div className="reviews-avg">
        <span className="avg-num">4.7</span>
        <span className="avg-stars">★★★★★</span>
        <span className="avg-count">Based on {reviewsData.length * 311} reviews</span>
      </div>
      <div className="rating-bars">
        {[5, 4, 3, 2, 1].map((r) => (
          <div key={r} className="rating-bar-row">
            <span>{r} ★</span>
            <div className="rbar-wrap"><div className="rbar" style={{ width: `${r === 5 ? 72 : r === 4 ? 20 : r === 3 ? 5 : 2}%` }} /></div>
            <span>{r === 5 ? "72%" : r === 4 ? "20%" : r === 3 ? "5%" : "2%"}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="reviews-list">
      {reviewsData.map((r) => (
        <div key={r.name} className="review-card">
          <div className="review-header">
            <div className="review-avatar">{r.avatar}</div>
            <div>
              <p className="review-name">{r.name}</p>
              <p className="review-date">{r.date}</p>
            </div>
            <div className="review-stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
          </div>
          <p className="review-text">{r.text}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Reviews;