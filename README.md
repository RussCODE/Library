Usage Instructions:

URL: http://galib.herokuapp.com

Functionality:

View Book Status
	Books will have one of the following status labels:
		Available (0)
		On Hold (1)
		Checked Out (2)
		Temporarily Suspended (3)
		Permenantly Suspended (4)

	You can view a book's status on the Library Administration Page.
	You can search for a book and it's status by typing a title or status into the search box on the top-right of the books table.

Add Book 

	There are two ways a book can be added.
	
	1) Add new book to Library:
		
		a) Click the "Add book" button near the top-left of the table
		
		b) Enter the title of the book in the "Title" text field
		
		c) Set the status to Available or Suspended on the "Status" dropdown (Default: Available)
		
		d) Click the "Add book" button on the modal window.
	
	2) Unsuspend temporarily suspended book
		
		a) Click the "Update book" button on the row of the book you wish to unsuspend
		
		b) Click the "Status" dropdown and select the new status for the book (E.g., "Available")
		
		c) (Optional) If checking out a previously unavailable book:
		
		ci) Add the name of the customer checking out the book to the "Book Holder" text field
		
		cii) Add the date checkout to the "Checkout Date" date field 
		
		d) (Optional) If putting a previously unavailable book on hold:
		
		di) Add the name of the customer checking out the book to the "Book Holder" text field
		
		e) Click the "Update book" button on the modal window.
	

Remove Book 

There are two ways a book can be removed.
	
	1) Removed from circulation with record preserved:
	
		a) Click the "Update book" button on the row of the book you wish to remove
		
		b) Click the "Status" dropdown and select "Suspended (Permenantly)" on the dropdown
		
		c) Click the "Update book" button on the modal window.
		
		WARNING: Once a book is permenantly suspended, it can only be viewed or deleted from the library record.
	
	2) Deleted from library record
		
		a) Click the "Delete book" button on the row of the book you wish to permenantly delete
		
		WARNING: This action cannot be undone! The book will be gone forever.
	

Temporarily Suspend Book

	Instructions:
	
		a) Click the "Update book" button on the row of the book you wish to suspend
		
		b) Click the "Status" dropdown and select "Suspended (Temporarily)" on the dropdown
		
		c) Click the "Update book" button on the modal window.


Check-Out (library customer borrows book)

	Instructions:
	
		a) Click the "Update book" button on the row of the book you wish to check out
		
		b) Click the "Status" dropdown and select "Checked Out" on the dropdown
		
		c) Add the name of the customer checking out the book to the "Book Holder" text field
		
		d) Add the date checkout to the "Checkout Date" date field 
		
		e) Click the "Update book" button on the modal window.


Check-In (library customer returns book)

	Instructions:
	
		a) Click the "Update book" button on the row of the book you wish to check out
		
		b) Click the "Status" dropdown and select the new book status (E.g., Available) on the dropdown
		
		c) Click the "Update book" button on the modal window.
		

Add Hold (library customer places hold on book currently checked-out)

	Instructions:
	
		a) Click the "Update book" button on the row of the book you wish to check out
		
		b) Click the "Status" dropdown and select "On Hold" on the dropdown
		
		c) Add the name of the customer holding the book to the "Book Holder" text field
		
		c) Ensure that the name of the customer who checked out the book is in the "Checked out By" text field
		
		d) Ensure that the date of checkout is correct.
		
		d) Click the "Update book" button on the modal window.


Remove Hold (library customer cancels hold or checks-out held book)

	Instructions:
	
		a) Click the "Update book" button on the row of the book you wish to check out
		
		b) Click the "Status" dropdown and select the new status (E.g., Checked Out)
		
		c) Click the "Update book" button on the modal window.
