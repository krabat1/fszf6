import { Component, OnInit} from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css'],
})

export class AddnewComponent implements OnInit {
  books: Array<Book> = new Array<Book>();
  actualBook: Book = new Book('','');

  constructor() {} 

  ngOnInit(): void {
    this.import();
  }

  onTitleChange(newTitle: string) {
    //console.log('event fired - onTitleChange');
    if (newTitle.length === 1 && newTitle === '\b') {
      this.actualBook.setTitle('');
      console.log('empty title B - never seen this');
    }else {
      this.actualBook.setTitle(newTitle);
      //console.log('it works always, on the last character too');
      //console.log(this.actualBook.getTitle().length +' '+this.actualBook.getTitle());
    }
  }

  onInput(event: Event) {
    //console.log('event fired - onInput');
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    if (inputValue.length === 1 && inputValue === '\b') {
      this.actualBook.setTitle('');
      console.log('empty title A - never seen this');
    }
    console.log('Title changed')
    console.log(this.actualBook)
  }



  isbnTrigger(e:Event){ /* ngmodelchange issue */
    /*this.actualBook.setTitle(this.actualBook.getTitle()+' ');
    this.actualBook.setTitle(this.actualBook.getTitle().trim());*/
    this.actualBook.setIsbn(this.actualBook.getIsbn()+' ');
    this.actualBook.setIsbn(this.actualBook.getIsbn().trim());
    console.log('ISBN changed')
    console.log(this.actualBook)
  }

  save(){
    console.log(this.actualBook);
    
      console.log('copy')
      let copy: Book = this.actualBook;
  
      if(this.books == null){ 
        this.books = [];
      }
      this.books.push(copy); 
      console.log('actualbook reset ')
      this.actualBook = new Book('','');
      this.export();
  }

  import(){
    // Betöltés a localStorage-ból
    this.books = JSON.parse(localStorage.getItem('books') as string) || [];
    // Ellenőrizd, hogy a tömb tartalmaz-e `Book` példányokat
    this.books = this.books.map((item: any) => {
        if (item instanceof Book) {
            return item;
        } else {
            const book = new Book('','');
            book.setTitle(item.title);
            book.setIsbn(item.isbn);
            return book;
        }
    });

    if( this.books == null || this.books.length == 0 ){
      console.log('No books in LocalStorage.');
    }else{
      console.log('Books from LocalStorage:');
      console.log(this.books);
    }
  }

  export(){
    console.log('Book stored in localStorage.')
    localStorage.setItem('books', JSON.stringify(this.books));
    this.import();
  }

  reset(){
    // reset books
    this.books = new Array<Book>();
    console.log('Empty array stored in localStorage.')
    localStorage.setItem('books', JSON.stringify(this.books));
    this.import();
  }

}
