import React, { useState, useEffect, useRef } from "react";
import { getQuotes } from "../../services/api";
import "./QuoteList.css";
import { useNavigate } from "react-router-dom";

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialFetch, setIsInitialFetch] = useState(true);
  const [popoverQuoteIndex, setPopoverQuoteIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const moreButtonRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const { data } = await getQuotes(10, offset);
        setQuotes((prev) => (offset === 0 ? data : [...prev, ...data]));
        if (data.length < 10) setHasMore(false);
        setIsInitialFetch(false);
      } catch (error) {
        console.error("Failed to fetch quotes", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (hasMore && (isInitialFetch || offset > 0)) {
      fetchQuotes();
    }
  }, [offset, hasMore, isInitialFetch]);

  const loadMore = () => {
    if (hasMore) setOffset((prev) => prev + 10);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });
  };

  const handleMoreClick = (index) => {
    setPopoverQuoteIndex(popoverQuoteIndex === index ? null : index);
  };

  return (
    <div className="quote-list-container">
      {isLoading ? (
        <>
          <div className="spinner"></div>
          <div>Loading...</div>
        </>
      ) : (
        <>
          <ul className="quote-list">
            {quotes.length > 0 &&
              quotes.map((quote, index) => (
                <li key={index} className="quote-item">
                  <div className="quote-content">
                    <div className="image-container">
                      {quote.mediaUrl ? (
                        <img
                          src={quote.mediaUrl}
                          alt="Quote"
                          className="quote-image"
                        />
                      ) : (
                        <div className="no-image">No Image Available</div>
                      )}
                      <div className="overlay-text">
                        <small>
                          By {quote.username} <br />
                          on {formatDate(quote.createdAt)}
                        </small>
                      </div>
                    </div>

                    <div className="quote-text">
                      <p className="quote-description">
                        {quote?.text?.length > 100 ? (
                          <>
                            {quote.text.substring(0, 100)}...
                            <span
                              className="more-button"
                              onClick={() => handleMoreClick(index)}
                              ref={(el) => (moreButtonRefs.current[index] = el)}
                            >
                              More
                            </span>
                            {popoverQuoteIndex === index && (
                              <div className="popover">
                                <div className="popover-arrow" />
                                <p className="popover-text">{quote.text}</p>
                                <button
                                  className="close-popover"
                                  onClick={() => handleMoreClick(index)}
                                >
                                  Close
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          quote?.text
                        )}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          {hasMore && !isLoading && (
            <button onClick={loadMore} className="load-more-button">
              Load More
            </button>
          )}
        </>
      )}

      <button className="fab" onClick={() => navigate("/create-quote")}>
        +
      </button>
    </div>
  );
};

export default QuoteList;
