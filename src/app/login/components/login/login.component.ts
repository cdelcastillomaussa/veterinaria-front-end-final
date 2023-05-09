import { Component, OnInit, ViewChild, AfterViewInit, ViewRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('InputUser')
  inputUser!: MatInput;

  @ViewChild('InputPass')
  inputPass!: MatInput;

  @ViewChild('btnIngresar')
  btnIngresar!: MatButton;

  username?: string;
  password?: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.inputUser.focus();

  }

  habilitarBtnIngresar() {
    if (this.username && this.password) {
      this.btnIngresar.disabled = false;
    } else {
      this.btnIngresar.disabled = true;
    }
  }

  login() {
    if (this.username === 'admin' && this.password === '1234') {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales incorrectas. Por favor intente de nuevo.');
      this.username = '';
      this.password = '';
      this.btnIngresar.disabled = true;
    }
  }







}
