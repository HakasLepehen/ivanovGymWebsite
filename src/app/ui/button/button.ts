import { Component, computed, input, InputSignal, OnChanges, signal, SimpleChanges, WritableSignal } from '@angular/core';

export type ButtonType = 'primary' | 'secondary';

@Component({
  selector: 'ui-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  type: InputSignal<ButtonType> = input<ButtonType>('primary');
  className = computed(() => {
    return this.type() === 'primary' ? 'primary' : 'secondary';
  });

  ngOnInit() {
    console.log('Button type:', this.type());
  };

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('ngOnChanges - type:', this.type());
  // }

}
