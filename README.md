# Employee Information Entry System
### This is a simple and mini project which is developed using Angular, Node.js & MongoDB.
The functionalities of this project are:
1. Show All Employee Information
1. Insert Employee Information
	* ID is generated automatically
1. Update Employee Information by Employee ID
	* While updating Employee Information, ID can't be updated
1. Delete Employee Information by Employee ID
	* While deleting one Employee's Information from the middle, the next Employee ID won't be changed
		* Example: There are five rows, row number 3 needs to delete. At the time of new insertion, Employee ID will start from 6
    * While deleting one Employee's Information from the bottom, the next Employee ID will start from the
	* Example: There are five rows, row number 5 needs to delete. At the time of new insertion, Employee ID will start from 5
