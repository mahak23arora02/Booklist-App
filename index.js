//book class:Represents a book
class Book{
    constructor(title,author,isbn){
        this.title=title; 
        this.author=author;
        this.isbn=isbn;
    }
}
//UI class: handle UI tasks
class UI{
    static displayBooks(){
      const books=Store.getBooks();
      books.forEach((book)=> UI.addBookToList(book));
    }
    static addBookToList(book){
        let list=document.getElementById("book-list");
        let row=document.createElement('tr');
        row.innerHTML=`
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="btn btn-danger btn-sm delete">X</a> </td>
        `;
        list.appendChild(row);
    }
    static deleteBook(el){
if(el.classList.contains('delete')){
    el.parentElement.parentElement.remove(); 
}
    }
    static showAlert(message,className){
        const div=document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(div,form);

        //vansih in 3 sec
        setTimeout(()=> document.querySelector('.alert').remove(), 3000);
    }
    static clearFields(){
        document.getElementById("title").value="";
        document.getElementById("author").value="";
        document.getElementById("isbn").value="";
    }
}


//Store Class:haandles storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        const books=Store.getBooks();
       books.forEach((book,index)=>{
           if(book.isbn===isbn){
               books.splice(index,1);
           }
       });
       localStorage.setItem('books',JSON.stringify(books));
}
}
//Event:Display books
document.addEventListener('DOMContentLoaded',UI.displayBooks);


//Event:Add a book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    //prevent actual values
    e.preventDefault();
    //Get form values
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;
    //validate
    if(title===""||author===""||isbn===""){
        UI.showAlert('Please fil in all fields','danger');
    }
    else{
        //Instantiate book
    const book=new Book(title,author,isbn);
    //console.log(book);
    //Add Book to UI
    UI.addBookToList(book);
    //add book to store
    Store.addBook(book);
    //show success msg
    UI.showAlert('Book Added','success');
    //clear fields
    UI.clearFields();
    }
});


//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click',(e)=>{
//remove book from UI
    UI.deleteBook(e.target);
//remove book from Store
Store.removeBook(e.target.parentElement.parentElementSibling.textContent);
//Show success msg
UI.showAlert('Book Removed','success');
});







