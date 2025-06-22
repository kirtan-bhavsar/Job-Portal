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

  const addPageButton = ({pageNumber,activeClass}) => {
    // console.log('Add Page Button');

    //  {pages.map((pageNumber) => {
          return (
            <button
              className={`btn page-btn ${activeClass && 'active'
              }`}
              key={pageNumber}
              onClick={() => {
                handlePageChange(pageNumber);
              }}
            >
              {pageNumber}
            </button>
          );
        // }
      }
  // }

  const renderPageButton = () => {
    let arrayPageButton = [];
    // First page button (will be equal to 1 always)
    arrayPageButton.push(addPageButton({pageNumber:1,activeClass : Number(currentPage) === 1}));

    // The set of 3 dots of left side will only come when the current page - 3 > 0
    if(Number(currentPage)-3 > 0){
      arrayPageButton.push(
        <span className="page-btn dots">...</span>
      )
    }

    // number before the active button if it is not equal to 1 or 2, because if the active if it is 2,
    //  then 1 should be not called explicity as it is already available earlier
    if(Number(currentPage) !== 1 && Number(currentPage) !== 2){
      arrayPageButton.push(addPageButton({pageNumber:Number(currentPage-1),activeClass:false}));
    }

    // Active button (if it is not 1 or numberOfPages)
    if(Number(currentPage) !== 1 && Number(currentPage) !== Number(numberOfPages)){
      arrayPageButton.push(addPageButton({pageNumber:currentPage,activeClass : true}));
    } 

    // number after the active button if it is not equal to numberOfPages or numberOfPages-1,
    //  because if the active if it is numberOfPages-1,
    //  then numberOfPages should be not called explicity as it is already available earlier
    if(Number(currentPage) !== numberOfPages && Number(currentPage) !== Number(numberOfPages-1)){
      arrayPageButton.push(addPageButton({pageNumber:Number(Number(currentPage)+1),activeClass:false}));
    }

    // The set of 3 dots of left side will only come when the current page - 3 > 0
    if(Number(currentPage)+2 < Number(numberOfPages)){
      arrayPageButton.push(
        <span className="page-btn dots">...</span>
      )
    }

    // Last page button (will be equal to numberOfPages always)
    if(numberOfPages > 1){
    arrayPageButton.push(addPageButton({pageNumber:numberOfPages,activeClass : Number(currentPage) === Number(numberOfPages)}));
    }
    return arrayPageButton;
  };

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
        {renderPageButton()}
      </div>
      {/* <div className="btn-container">
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
      </div> */}
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
