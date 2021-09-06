import React, { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export const CheckBounds = () => {
  const [checkBounds, setCheckBounds] = useState(false);

  const checkBoundsButton = [
    {
      title: "Check Bounds",
      icon: <AiOutlineCheckCircle className="checkBounds-icon" />,
      className: "checkBounds-text",
      path: "/check",
    },
  ];

  return (
    <>
      <div
        className="checkBoundsButton"
        onClick={() => setCheckBounds(!checkBounds)}
      >
        {checkBoundsButton.map((item, index) => {
          return (
            <li key={index} className={item.className}>
              <Link data-cy="checkBounds" to={item.path}>
                {item.icon}
                <span className="span2">{item.title}</span>
              </Link>
            </li>
          );
        })}
      </div>
    </>
  );
};

export default CheckBounds;
