import paginationPage from "../utils/paginating.js";
const elementFetch = (result) => {
  return `
                  <tr>
                    <th scope="row">${result.id}</th>
                    <td>${result.fullname}</td>
                    <td>${result.email}</td>
                    <td>${result.phoneNumber}</td>
                    <td>${result.Group.name}</td>
                  </tr>`;
};
paginationPage(
  "#paging",
  3,
  "paginationjs-theme-blue paginationjs-big",
  "/user?page=",
  "#table-user-body",
  elementFetch
);
