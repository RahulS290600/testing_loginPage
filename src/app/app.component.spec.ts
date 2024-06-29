import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component'; // Import the LoginComponent
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, LoginComponent], // Add LoginComponent to imports
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'login_test' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('login_test');
  });

  it('should contain the LoginComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const loginComponent = fixture.debugElement.query(By.directive(LoginComponent));
    expect(loginComponent).not.toBeNull();
  });
});
