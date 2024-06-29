import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form group with username and password controls', () => {
    expect(component.loginForm.contains('username')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  it('should make the username control required', () => {
    const usernameControl = component.loginForm.get('username');
    usernameControl?.setValue('');
    expect(usernameControl?.valid).toBeFalse();
  });

  it('should require the username to be at least 5 characters long', () => {
    const usernameControl = component.loginForm.get('username');
    usernameControl?.setValue('abc');
    expect(usernameControl?.valid).toBeFalse();
    expect(usernameControl?.errors?.['minlength']).toBeTruthy();
  });

  it('should make the password control required', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalse();
  });

  it('should display error messages when fields are invalid and touched', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[formControlName="username"]')).nativeElement;
    usernameInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    usernameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]')).nativeElement;
    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const usernameError = fixture.debugElement.query(By.css('.text-danger')).nativeElement;
    expect(usernameError.textContent).toContain('Username is required.');

    const passwordError = fixture.debugElement.query(By.css('.text-danger')).nativeElement;
    expect(passwordError.textContent).toContain('Username is required.');
  });

  it('should log form values on submit if form is valid', () => {
    spyOn(console, 'log');
    component.loginForm.get('username')?.setValue('validUsername');
    component.loginForm.get('password')?.setValue('validPassword');
    
    component.onSubmit();

    expect(console.log).toHaveBeenCalledWith({
      username: 'validUsername',
      password: 'validPassword'
    });
  });

  it('should not log form values on submit if form is invalid', () => {
    spyOn(console, 'log');
    component.loginForm.get('username')?.setValue('');
    component.loginForm.get('password')?.setValue('');

    component.onSubmit();

    expect(console.log).not.toHaveBeenCalled();
  });
});
