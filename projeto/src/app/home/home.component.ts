import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { People } from '../people';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  people$: Observable<People[]>;
  constructor(
    private registerService: RegisterService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.people$ = this.registerService.getPeople();
  }

  deleteClient(p: People) {
    this.registerService.delete(p)
      .then( () =>{
        this.snackBar.open('Client removed with successfuly', 'OK', {duration: 3000});
      })
      .catch( (err) => {
        this.snackBar.open('Error in removed client', 'OK', {duration: 3000});
        console.error(err);
      })
  }


}
