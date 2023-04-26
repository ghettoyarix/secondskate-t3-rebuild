import React from "react";

const PingCircle = () => {
  return (
    <span className="relative flex h-3 w-3">
      <span className="absolute  inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
      <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
    </span>
  );
};

export default PingCircle;
