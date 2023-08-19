import Pagination from "react-bootstrap/Pagination";
interface IPagination {
  total: number;
  currentPage: number;
  rowsPerPage: number;
  onChangePage: (page: number) => void;
}
const CustomPagination = ({ total, currentPage, rowsPerPage, onChangePage }: IPagination) => {
  const numPages = Math.ceil(total / rowsPerPage);
  const pageRange = [];
  for (let page = 1; page <= numPages; page++) {
    pageRange.push(page);
  }
  return (
    <Pagination>
      <Pagination.Prev
        key="prev"
        onClick={() => currentPage !== 1 && onChangePage(currentPage - 1)}
      />
      {pageRange.map((page) => {
        if (
          page === 1 ||
          page >= numPages - 1 ||
          (page >= currentPage - 1 && page <= currentPage + 3)
        ) {
          return (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => onChangePage(page)}
            >
              {page}
            </Pagination.Item>
          );
        } else if (
          currentPage === 4 ||
          (page === currentPage - 2 && currentPage > 4) ||
          (page === currentPage + 4 && currentPage < numPages - 2)
        ) {
          return <Pagination.Ellipsis key={`ellipsis-${page}`} />;
        }
        return null;
      })}
      <Pagination.Next
        key="next"
        onClick={() => currentPage !== numPages && onChangePage(currentPage + 1)}
      />
    </Pagination>
  );
};

export default CustomPagination;
