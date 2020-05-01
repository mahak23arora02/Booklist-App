//REPRESENT BOOK
class book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
//UI CLASS= HANDLES UI tasks
class UI{
    static displayBooks(){
        const StoredBooks=[
            {
                title:'Book one',
                author:'Mahak',
                isbn:'155'

            },
            {
                title:'Book Two',
                author:'Gargi',
                isbn:'125'
            }
        ]
        const books=StoredBooks;
        books.forEach((book)=>UI.addBookToList(book));
    }
    static addBookToList(book){
        let list=document.querySelector('#book-list');
        let row=document.createElement('tr');
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `
        list.appendChild(row);
    }
    static deleteBook(e1){
        if(e1.classList.contains('delete')){
            e1.parentElement.parentElement.remove();
        }
    }
        static showAlert(message,className){
            const div=document.createElement('div');
            div.className=`alert alert-${className}`;
            div.appendChild(document.createTextNode(message));
            const container=document.querySelector('.container');
            const form=document.querySelector('#book-form');
            container.insertBefore(div,form);
        }
        static clearFields(){
            document.getElementById('title').value="";
            document.getElementById('author').value="";
            document.getElementById('isbn').value="";
        }
    
}
//STORE CLASS

//EVENT :DISPLAY BOOK
document.addEventListener('DOMContentLoaded',UI.displayBooks);


//EVENT :ADD BOOK
document.querySelector('#book-form').addEventListener('submit',(e)=>{
e.preventDefault();
const title=document.querySelector('#title').value;
const author=document.querySelector('#author').value;
const isbn=document.querySelector('#isbn').value;
if(title===""|| author===""|| isbn===""){
    alert("Please fill the form");
}
else{
    const book=new Book(title,author,isbn);
    UI.addBookToList(book);
    UI.clearFields();
}
});


//EVENT REMOVE BOOK
document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.deleteBook(e.target);
});