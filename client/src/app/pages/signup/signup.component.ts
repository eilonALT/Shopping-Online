import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  cities = ['Jerusalem', 'Tel Aviv', 'Haifa', 'Beer Sheva', 'Ashdod', 'Rishon LeZion', 'Rehovot', 'Netanya', 'Bat Yam', 'Ramat Gan', 'Ashqelon', 'Ashkelon', 'Bnei Brak', 'Eilat', 'Givatayim', 'Hadera', 'Herzliya', 'Holon', 'Kfar Saba', 'Mevo Betar', 'Netivot',];
  showNextStep: boolean = true
  showLastStep: boolean = false

  myUser: User = new User()
  constructor(private userService: UserService, private router: Router) {
    this.myUser.role = 'user'
  }


  toggleSteps() {
    this.showNextStep = !this.showNextStep
    this.showLastStep = !this.showLastStep
  }

  async validateUserName(username: string): Promise<any> {
    try {
      const user = await this.userService.getUserByUserName(username).toPromise()
      if (user) {
        return false
      }
    }
    catch (err) {
      return true
    }
  }

  async validateIdNumber(idNumber: string): Promise<any> {
    try {
      const temp = await this.userService.getUserByIdNumber(idNumber).toPromise()
      if (temp) {
        return false
      }
    }
    catch (err) {
      return true
    }
  }


  async validateFormOne(form: any) {
    if (form.valid) {
      const user = await this.validateUserName(form.value.username)
      const id = await this.validateIdNumber(form.value.idNumber)
      if (!user || !id) {
        alert("user name already exists or id number already exists")
        return
      }
      if (form.value.password === form.value.confirmPassword) {
        this.myUser.password = form.value.password
        this.myUser.username = form.value.username
        this.myUser.idNumber = form.value.idNumber
        this.toggleSteps()
      }
      else {
        alert('Passwords do not match')
      }
    }
  }

  async validateFormTwo(form: any) {
    if (form.valid) {
      this.myUser.firstName = form.value.firstName
      this.myUser.lastName = form.value.lastName
      this.myUser.city = form.value.city
      this.myUser.street = form.value.street
      this.userService.addUser(this.myUser).subscribe(msg => {
        alert('User added successfully')
        this.router.navigate(['/signin'])
      })
    }
  }
}
