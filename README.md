# GoogleScript

## 1. Filtering
- Summary:
  - Filter data and put into 2 different sheets: No upload need and Update require
  - After fixed issue in Update require, the updated data will be pasted to Upload sheet and No upload sheet, then return the old version to follow up errors made by the agents
- Functions and techniques used:
  - onOpen: add UI menu
  - run: divide raw file into "No upload needed" and "Update needed" sheets; made update needed data available for other functions
  - done: input data corrected in Update needed sheet to No upload needed or Upload sheet; return previous incorrect data to follow up with agents
  - onEdit: highlight errors 
