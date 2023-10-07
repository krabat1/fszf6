export class Book {
    private title: string; 
    private isbn: string;   
    public errors:  { [key: string]: string } = {title:'',isbn:''};

    constructor(title: string, isbn: string) {
        this.title = '';
        this.isbn = '';
        try {
            this.setTitle(title);
            this.setIsbn(isbn);
        } catch (error) {
            //console.error("Hiba a property beállításakor:", error);
            //let alert = document.getElementsByClassName('alert');
            //alert[0].innerHTML = "Hiba a property beállításakor: " + this.errors[title] +' '+this.errors[isbn];
        }
    }

    public getTitle(): string {
        return this.title;
    }

    public getIsbn(): string {
        return this.isbn;
    }

    setTitle(value: string): void {
        if (typeof value !== 'string'){
            //this.title = value;
            //throw new Error('Title must be string -> ' + value);
            this.setError('title','Title must be string -> ' + value);
        }else if(value.trim().length == 0){
            this.setError('title','Title must be a least one letter! Length: ' + this.getTitle().trim().length + ' Current: ' + this.getTitle());
            this.title = ''; // akkor tényleg legyen 0
        }else{
            this.setError('title','');
            this.title = value.trim();
        }
        //console.log({title:this.getTitle(),isbn:this.getIsbn(),errors:{title:this.getErrors('title'),isbn:this.getErrors('isbn')}})
    }

    public getStringDigits(str: string){
        str = str.replace(/([^(0-9]+)/g, '');
        return str;
    }

    setIsbn(value: string): void {
        if(this.getIsbn() != value || this.getIsbn() == ''){
            let testisbn = this.getStringDigits(value);
            if(testisbn.length !== 10 && testisbn.length !== 13){
                this.isbn = value.trim();
                //throw new Error('isbn must contain 10 or 13 digit -> ' + testisbn);
                this.setError('isbn','ISBN must contain 10 or 13 digit! Digits: ' + testisbn.length +' Current: '+this.getIsbn());
            }else{
                this.setError('isbn','');
                this.isbn = value.trim();
            }
            //console.log(this.getStringDigits(this.getIsbn()).length);
        }
    }

    setError(key: string, value: string): void {
        this.errors[key] = value;
    }

    setErrorEmpty(key: string): void {
        this.errors[key] = '';
    }

    getErrors(key: string) {
        return this.errors[key];
    }
}