import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { AddnewComponent } from './addnew.component';
import { Book } from '../book';

describe('AddnewComponent', () => {
  let component: AddnewComponent;
  let fixture: ComponentFixture<AddnewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [AddnewComponent]
    });
    fixture = TestBed.createComponent(AddnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('*should import() data from localStorage and convert it to Book instances', () => {
    // Előkészítjük a localStorage hamisítást, ebben a példában egy spy-t használunk
    const localStorageSpy = spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify([{ title: 'Book 1', isbn: '1234567890' }, { title: 'Book 2', isbn: '1234567890123' }])
    );

    component.import(); // A tesztelendő metódust hívjuk meg

    // Ellenőrizzük, hogy a könyvek helyesen kerülnek a komponensbe
    expect(component.books.length).toBe(2);
    expect(component.books[0] instanceof Book).toBe(true);
    expect(component.books[1] instanceof Book).toBe(true);
  });
  it('*should import() data from localStorage and examine parameters', () => {
    // Előkészítjük a localStorage hamisítást, ebben a példában egy spy-t használunk
    // https://stackoverflow.com/q/41271613/4279940
    const localStorageSpy = spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify([
        { title: 'Book 0', isbn: '978-1-56619-909-4' },  //13
        { title: 'Book 1', isbn: '1-56619-909-3' },      //10
        { title: 'Book 2', isbn: '1257561035' },         //10
        { title: 'Book 3', isbn: '1248752418865' },      //13

        { title: 'Book 4', isbn: '978-1-56619-909-4 2' },//14
        { title: 'Book 5', isbn: 'isbn446877428ydh' },   //9
        { title: 'Book 6', isbn: '841671603X' },         //9
        { title: '', isbn: '55 65465 4513574' },         //14
      ])
    );

    component.import(); // A tesztelendő metódust hívjuk meg

    // Ellenőrizzük, hogy a könyvek helyesen kerülnek a komponensbe
    expect(component.books[0].getTitle()).toBe('Book 0');
    expect(component.books[0].getIsbn()).toBe('978-1-56619-909-4');

    expect(component.books[0].getStringDigits(component.books[0].getIsbn()).length).toBe(13);
    expect(component.books[1].getStringDigits(component.books[1].getIsbn()).length).toBe(10);
    expect(component.books[2].getStringDigits(component.books[2].getIsbn()).length).toBe(10);
    expect(component.books[3].getStringDigits(component.books[3].getIsbn()).length).toBe(13);

    expect(component.books[4].getStringDigits(component.books[4].getIsbn()).length).toBe(14);
    expect(component.books[5].getStringDigits(component.books[5].getIsbn()).length).toBe(9);
    expect(component.books[6].getStringDigits(component.books[6].getIsbn()).length).toBe(9);
    expect(component.books[7].getStringDigits(component.books[7].getIsbn()).length).toBe(14);
    
    expect(component.books[0].getErrors('title')).toBe('');
    expect(component.books[0].getErrors('isbn')).toBe('');
    expect(component.books[1].getErrors('title')).toBe('');
    expect(component.books[1].getErrors('isbn')).toBe('');
    expect(component.books[2].getErrors('title')).toBe('');
    expect(component.books[2].getErrors('isbn')).toBe('');
    expect(component.books[3].getErrors('title')).toBe('');
    expect(component.books[3].getErrors('isbn')).toBe('');

    expect(component.books[4].getErrors('isbn')).toBe('ISBN must contain 10 or 13 digit! Digits: 14 Current: 978-1-56619-909-4 2');
    expect(component.books[5].getErrors('title')).toBe('');
    expect(component.books[5].getErrors('isbn')).toBe('ISBN must contain 10 or 13 digit! Digits: 9 Current: isbn446877428ydh');
    expect(component.books[6].getErrors('title')).toBe('');
    expect(component.books[6].getErrors('isbn')).toBe('ISBN must contain 10 or 13 digit! Digits: 9 Current: 841671603X');
    expect(component.books[7].getErrors('title')).toBe('Title must be a least one letter! Length: 0 Current: ');
    expect(component.books[7].getErrors('isbn')).toBe('ISBN must contain 10 or 13 digit! Digits: 14 Current: 55 65465 4513574');
  });  

  it('should export data to localStorage with save() and export()', () => {
    component.import(); 
    let copy: Book = component.actualBook;
    copy.setTitle('Book X');
    copy.setIsbn('9876543210');
    component.books.push(copy);
    component.save();
    //component.export() the save run the export, andthe export run the import()
    expect(component.books[component.books.length - 1] instanceof Book).toBe(true);
    expect(component.books[component.books.length - 1].getTitle()).toBe('Book X');
    expect(component.books[component.books.length - 1].getIsbn()).toBe('9876543210');
    //test done, remove the last item
    component.books.splice(-1);
    component.save();
  });
  /*fit('should be the only test that runs', () => {
    // Tesztkód
  });*/
});
