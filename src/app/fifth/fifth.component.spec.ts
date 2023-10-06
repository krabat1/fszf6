//FifthComponent
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetComponent } from '../widget/widget.component';
import { By } from '@angular/platform-browser';
import { FifthComponent } from './fifth.component';

describe('FifthComponent', () => {
  let component: FifthComponent;
  let fixture: ComponentFixture<FifthComponent>;
  let parentComponent: FifthComponent;
  let widgetComponent: WidgetComponent;

  /*beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThirdComponent]
    });
    fixture = TestBed.createComponent(ThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FifthComponent, WidgetComponent],
    });
  
    fixture = TestBed.createComponent(FifthComponent);
    parentComponent = fixture.componentInstance;
    widgetComponent = fixture.debugElement.query(By.directive(WidgetComponent)).componentInstance;
  });

  it('should display the name in the widget component', () => {
    widgetComponent.book = 'gyu_ii'; // Állítsd be az adatot, amit megjelenítesz
    fixture.detectChanges(); // Kérjük a frissítést
    const widgetElement: HTMLElement = fixture.nativeElement;
    //const widgetName = widgetElement.querySelector('h3').textContent;
    const widgetNameElement = widgetElement.querySelector('h3');
    const widgetName = widgetNameElement ? widgetNameElement.textContent : '';
    expect(widgetName).toBe('A Két Torony');
  });
  
  it('should create', () => {
    expect(parentComponent).toBeTruthy();
  });
});
