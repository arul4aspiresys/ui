import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../state/auth/auth.actions';
import { selectAuthUser } from '../../state/auth/auth.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  declare loginForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private store: Store,
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.store.dispatch(AuthActions.login({...this.loginForm.value}));
  }

  check() {
    this.store.select(selectAuthUser).subscribe(user => {
      if (user) {
        console.log('User = ', user);
      } else {
        console.log('User is undefined or null');
      }
    });
  }
  
}
