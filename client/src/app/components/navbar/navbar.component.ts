import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentCategory: Category = new Category();
  @Output() categoryEmmiter = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  reciveCategory($event: Category) {
    this.currentCategory = $event;
    this.categoryEmmiter.emit(this.currentCategory);
  }

}
