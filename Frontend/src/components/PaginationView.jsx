const PaginationView = ({
  paginationOptions,
  currentPage,
  handlePageChange,
  getTotalPages,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <p className="text-sm font-semibold text-white">Pag</p>
      <div className="">
        <select
          className="appearance-none border rounded-lg pl-3 pr-3 cursor-pointer transition duration-250 ease"
          value={currentPage}
          onChange={handlePageChange}
        >
          {paginationOptions?.map((option) => option)}
        </select>
      </div>
      <p className="text-sm font-semibold text-white">de {getTotalPages()}</p>
    </div>
  );
};

export default PaginationView;
