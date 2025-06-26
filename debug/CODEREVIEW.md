Original Code added to router.js & postsController.js files

Code Review
--------------------

- 1 -> Identify at least two problems (bugs or performance issues)
- No error handling in case db call fails for any reason (connection, db instance issue etc)
- No pagination added to find() call. This could cause extreme load on UI once data is retrieved. Sorting or any other operation on UI would be expensive causing bad user experience.
- Sorting should be done on db end with optimal query.

- 2 ->  Propose corrections (code snippets or descriptions).
- Proposed corrections added to postsController.js file

- 3 ->  Explain in plain English why each fix matter
- Using Try Catch gives better control of the code execution for unexpected circumstances
- Sorting on db end makes fetching response faster, specially with indexing added
- Pagination is added to ensure data controll