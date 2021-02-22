import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent {
  title = 'blog';
  data = ['a','b','c'];
  data1 = [
    {
      name:"sandip",
      age:12
    },
    {
      name:"Mandip",
      age:21
    },
    {
      name:"Rajdeep",
      age:23
    }
  ]

}
