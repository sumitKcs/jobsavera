import React, { memo } from "react";
import image from "../assests/topbar-image.jpg";
const TopBar = () => {
  return (
    <>
      <div className="top-trending">
        <div className="top-trending-image-conatiner">
          <img
            style={{ width: "100%", height: "100%" }}
            src={image}
            className="topbar-poster-image"
            alt="..."
          />
          <div className="topbar-trending-title">something</div>
          <div className="topbar-trending-rank">Trending #1</div>
        </div>
      </div>
    </>
  );
};

export default memo(TopBar);
