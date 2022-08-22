import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

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
