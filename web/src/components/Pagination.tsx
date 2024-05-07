import {useState} from "react";
import {Pagination} from "react-bootstrap";



export type PaginationProps = {
  usersPerPage:number
  totalUsers:number
  paginate: (pageNumber: number) => void;
}

const ComponentPagination = ({ usersPerPage, totalUsers, paginate}:PaginationProps) =>{
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleClick = (page: number) => {
    setCurrentPage(page);
    paginate(page);
  };

  const renderPaginationItems = () => {
    const pages = [];
    const startIndex = (Math.ceil(currentPage / itemsPerPage) - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalPages);

    for (let i = startIndex; i <= endIndex; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          onClick={() => handleClick(i)}
          active={i === currentPage}
        >
          {i}
        </Pagination.Item>
      );
    }

    return pages;
  };

  const goToNextPageRange = () => {
    const nextPage = Math.min(currentPage + 1, totalPages);
    setCurrentPage(nextPage);
    paginate(nextPage);
  };

  const goToPrevPageRange = () => {
    const prevPage = Math.max(currentPage - 1, 1);
    setCurrentPage(prevPage);
    paginate(prevPage);
  };

  const goToLast = () =>{
    setCurrentPage(totalPages);
    paginate(totalPages);
  }

  const goToFirst = () =>{
    setCurrentPage(1);
    paginate(1);
  }

  return (
    <>
      <Pagination>
        <Pagination.First onClick={goToFirst}/>
        <Pagination.Prev onClick={goToPrevPageRange} />

        {renderPaginationItems()}

        <Pagination.Next onClick={goToNextPageRange} />
        <Pagination.Last  onClick={goToLast}/>
      </Pagination>
    </>
  );
};

export default ComponentPagination;
