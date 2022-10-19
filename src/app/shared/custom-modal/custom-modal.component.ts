import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent implements OnInit {
  @Input() message:string;
  @Output() close = new EventEmitter()
  @Input() confirm = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  confirmMessage() {
    this.confirm.emit()
  }

  closeMessage() {
    this.close.emit()
  }
}
