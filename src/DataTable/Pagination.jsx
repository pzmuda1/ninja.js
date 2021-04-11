import React from "react";

const Pagination = ({ currentPageNumber, totalNumberOfPages, onChange }) => {
  return (
    <ul className="pagination">
      {new Array(totalNumberOfPages).fill({}).map((_, index) => (
        <li className="page-item mr-1" key={index}>
          <button
            className={`page-link ${
              currentPageNumber === index ? "button-outline" : ""
            }`}
            onClick={() => onChange(index)}
          >
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
