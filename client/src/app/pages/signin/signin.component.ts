import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { login } from 'src/app/actions/user.actions';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  constructor(private userService: UserService, private router: Router, private store: Store) {
  }
  ngOnInit(): void {
  }

  async signIn(form: any): Promise<any> {
    try {
      const user = await this.userService.getUserByUserNameAndPassword(form.value.username, form.value.password).toPromise()
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        this.store.dispatch(login({ user: user }));
        this.router.navigate([''])
      }
    }
    catch (err) {
      alert("Invalid username or password")
    }
  }
}
