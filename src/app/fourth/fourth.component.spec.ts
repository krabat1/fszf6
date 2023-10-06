import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetComponent } from '../widget/widget.component';
import { By } from '@angular/platform-browser';
import { FourthComponent } from './fourth.component'; 

describe('FourthComponent', () => {
  let component: FourthComponent;
  let fixture: ComponentFixture<FourthComponent>;
  let parentComponent: FourthComponent;
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
      declarations: [FourthComponent, WidgetComponent],
    });
  
    fixture = TestBed.createComponent(FourthComponent);
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
