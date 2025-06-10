import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

interface DialogContainerProps {
  title: string;
  popupContent: string;
  showPopup: boolean;
  onClose: () => void;
  className?: string;
}

const DialogContainer: React.FC<DialogContainerProps> = ({
  title,
  popupContent,
  showPopup,
  onClose,
  className,
}) => {
  useEffect(() => {
    if (showPopup) {
      Prism.highlightAll(); // Tô màu cú pháp sau khi content được render
    }
  }, [popupContent, showPopup]);

  if (!showPopup) return null;

  return (
    <div className="bgPopup" onClick={onClose}>
      <div
        className={`locationPopup show ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popupContainer">
          <div className="popupContent">
            <h3>{title}</h3>
            <ReactMarkdown>{popupContent}</ReactMarkdown>
          </div>
          <div className="Buttons">
            <button className="btn-close" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogContainer;
