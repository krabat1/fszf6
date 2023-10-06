import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetComponent } from '../widget/widget.component';
import { By } from '@angular/platform-browser';
import { ThirdComponent } from './third.component';

describe('ThirdComponent', () => {
  let component: ThirdComponent;
  let fixture: ComponentFixture<ThirdComponent>;
  let parentComponent: ThirdComponent;
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
      declarations: [ThirdComponent, WidgetComponent],
    });
  
    fixture = TestBed.createComponent(ThirdComponent);
    parentComponent = fixture.componentInstance;
    widgetComponent = fixture.debugElement.query(By.directive(WidgetComponent)).componentInstance;
  });

  it('should display the name in the widget component', () => {
    widgetComponent.book = 'gyu_i'; // Állítsd be az adatot, amit megjelenítesz
    fixture.detectChanges(); // Kérjük a frissítést
    const widgetElement: HTMLElement = fixture.nativeElement;
    //const widgetName = widgetElement.querySelector('h3').textContent;
    const widgetNameElement = widgetElement.querySelector('h3');
    const widgetName = widgetNameElement ? widgetNameElement.textContent : '';
    expect(widgetName).toBe('A Gyűrű Szövetsége');
  });
  
  it('should create', () => {
    expect(parentComponent).toBeTruthy();
  });
});
