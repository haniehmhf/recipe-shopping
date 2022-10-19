import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IRecpie } from '../../IRecpie';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recpie: IRecpie = { name: '', description: '', imagePath: '' , ingredients:[]};
  @Input() index:number;
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }


}
