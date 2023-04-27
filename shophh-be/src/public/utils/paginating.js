let currentPage = 1;
function paginationPage(
  pagingId,
  pageSize,
  className,
  url,
  fetchingId,
  element
) {
  // fetch initial data
  $.ajax({
    url: url + "1" + "&page_size=" + pageSize,
    type: "GET",
  })
    .then((result) => {
      for (let i = 0; i < result.data.length; i++) {
       const dataFetch = result.data[i];
        $(fetchingId).append($(element(dataFetch)));
      }
    })
    .catch((err) => {
      console.log(err);
    });

  //paging
  $(pagingId).pagination({
    dataSource: url + 1+"&page_size=" + pageSize,
    locator: "data",
    totalNumberLocator: function (response) {
      return response.total;
    },
    pageSize: pageSize,
    className: className,
    afterPageOnClick: function (event, pageNumber) {
      loadPage(pageNumber, fetchingId, url, element, pageSize);
    },
    afterPreviousOnClick: function () {
      previousPage(fetchingId, url, element,pageSize);
    },
    afterNextOnClick: function () {
      nextPage(fetchingId, url, element,pageSize);
    },
  });
}

function loadPage(page, fetchingId, url, element, pageSize) {
  currentPage = page;
  $(fetchingId).empty();
  $.ajax({
    url: url + page + "&page_size=" + pageSize,
    type: "GET",
  })
    .then((result) => {
      console.log(result)
      for (let i = 0; i < result.data.length; i++) {
        const dataFetch = result.data[i];
        $(fetchingId).append($(element(dataFetch)));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function previousPage(fetchingId, url, element, pageSize) {
  currentPage--;
  $(fetchingId).empty();
  $.ajax({
    url: url + currentPage + "&page_size=" + pageSize,
    type: "GET",
  })
    .then((result) => {
      for (let i = 0; i < result.data.length; i++) {
        const dataFetch = result.data[i];
        $(fetchingId).append($(element(dataFetch)));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function nextPage(fetchingId, url, element, pageSize) {
  currentPage++;
  $(fetchingId).empty();
  $.ajax({
    url: url + currentPage + "&page_size=" + pageSize,
    type: "GET",
  })
    .then((result) => {
      for (let i = 0; i < result.data.length; i++) {
        const dataFetch = result.data[i];
        $(fetchingId).append($(element(dataFetch)));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
export default paginationPage;
