const getPagination = (page, limit) => {
    const currentPage = page ? parseInt(page) : 1;
    const pageSize = limit ? parseInt(limit) : 10;
    const offset = (currentPage - 1) * pageSize;
  
    return { currentPage, pageSize, offset };
  };
  
  const getPaginationData = (data, currentPage, pageSize) => {
    const { count: totalItems, rows: records } = data;
    const totalPages = Math.ceil(totalItems / pageSize);
  
    return {
      data: records,
      pagination: {
        currentPage,
        totalPages,
        totalItems,
      },
    };
  };
  
  module.exports = {
    getPagination,
    getPaginationData,
  };
  