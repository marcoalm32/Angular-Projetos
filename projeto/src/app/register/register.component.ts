import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { People } from '../people';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

people$: Observable<People[]>;
@ViewChild('name') clientName: ElementRef;

  formRegister = this.fb.group({ 
    'name': ['', [Validators.required, Validators.minLength(3)]],
    'email': ['', [Validators.required, Validators.email]],
    'food': ['', [Validators.required]]         
  })

  foods: string[] = ['Burguer', 'Pizza', 'Açaí', 'Hot-Dog', 'Fries', 'Sushi'];

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.people$ = this.registerService.getPeople();
  }

  onSubmit() {
    const p: People = this.formRegister.value;
    if(!p.id) {
      this.addClient(p)
    }else {
      this.editClient(p)
    }
  };

  addClient(p: People) {
    this.registerService.register(p)
      .then( () => {
        this.snackBar.open('Client add with successfuly', 'OK', {duration: 3000});
        this.formRegister.reset();
        this.router.navigateByUrl('/home');
      })
      .catch( (err) => {
        this.snackBar.open('Erro in add client', 'OK', {duration: 3000});
        console.error(err);
      })
  }

  editClient(p: People) {
    
  }

  cancel() {
    this.formRegister.reset();
    this.clientName.nativeElement.focus();
  }



}
