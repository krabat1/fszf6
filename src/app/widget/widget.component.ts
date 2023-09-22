import { Component, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})

export class WidgetComponent {
  book: string;
  constructor(private elementRef: ElementRef) {
    this.book = this.elementRef.nativeElement.getAttribute('book');
  }
  data = {
    gyu_i: { name: 'A Gyűrű Szövetsége', ar: '2500Ft', akcio: false },
    gyu_ii: { name: 'A Két Torony', ar: '2000Ft', akcio: false },
    gyu_iii: { name: 'A Király Visszatér', ar: '900Ft', akcio: true },
  };
}
