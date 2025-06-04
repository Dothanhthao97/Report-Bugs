import React from 'react';

interface DialogContainerProps {
  popupContent: string;
  showPopup: boolean;
  onClose: () => void;
}

const DialogContainer: React.FC<DialogContainerProps> = ({
  popupContent,
  showPopup,
  onClose,
}) => {
  if (!showPopup) return null;

  return (
    <div className="bgPopup" onClick={onClose}>
      <div
        className="locationPopup show"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="popupContent"
          dangerouslySetInnerHTML={{
            __html: `<h3>CodeFlows Location:</h3>${popupContent}`,
          }}
        />
        <div className="Buttons">
          <button className="btn-close" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogContainer;
