import React from "react";
import { useAllJobsContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/PageBtnContainer.js";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";

const PageBtnContainer = () => {
  // const {data} = useAllJobsContext();
  // const {numberOfPages,currentPage} = data;
  // console.log(numberOfPages,currentPage);

  // this above can be written simplay as this :
  const {
    data: { numberOfPages, currentPage },
  } = useAllJobsContext();
  // console.log(numberOfPages, currentPage);

  const pages = Array.from({ length: numberOfPages }, (_, index) => index + 1);
  // console.log(pages);

  const {search,pathname} = useLocation();
  // console.log(search,pathname);
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    // console.log(pageNumber);
    const searchParams = new URLSearchParams(search);
    searchParams.set('page',pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
    // console.log(searchParams);
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = Number(currentPage) - 1;
          if (prevPage < 1) prevPage = numberOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft></HiChevronDoubleLeft> Prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              className={`btn page-btn ${
                Number(currentPage) === Number(pageNumber) && 'active'
              }`}
              key={pageNumber}
              onClick={() => {
                handlePageChange(pageNumber);
              }}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = Number(currentPage) + 1;
          if (nextPage > numberOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        Next<HiChevronDoubleRight></HiChevronDoubleRight>
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
