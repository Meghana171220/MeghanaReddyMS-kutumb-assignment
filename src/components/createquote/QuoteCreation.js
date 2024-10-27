import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImageAndGetURL, postQuote } from "../../services/api";
import "./QuoteCreation.css";

const QuoteCreationPage = ({ setToken }) => {
  const [file, setFile] = useState(null);
  const [quoteText, setQuoteText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const imageData = await uploadImageAndGetURL(file);
      const mediaUrl = imageData[0]?.url;

      if (!mediaUrl) {
        setErrorMessage(
          "Failed to get media URL. Please enter the correct image."
        );
        return;
      }

      await postQuote(quoteText, mediaUrl);
      (() => {
        sessionStorage.setItem("generic_success_toast", "true");
        navigate("/dashboard");
      })();
    } catch (error) {
      console.error("Failed to create quote", error);
      setErrorMessage("An error occurred while creating the quote.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="quote-creation-page">
      <h2>Create Quote</h2>
      <p>Please fill in the details below:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setErrorMessage("");
          }}
          required
          className="file-upload"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          type="text"
          placeholder="Quote text"
          value={quoteText}
          onChange={(e) => setQuoteText(e.target.value)}
          required
          className="quote-input"
        />
        <div className="button-group">
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? <div className="create-spinner"></div> : "Submit"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuoteCreationPage;
