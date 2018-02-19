import {animate, state, style, transition, trigger} from "@angular/animations";

export const ListItemAnimate = trigger('ListItemState', [
  state('selected', style({'background-color': '#3f51b5', 'color': '#ffffff'})),
  state('hover', style({ 'color': '#3f51b5'})),
  state('normal', style({ 'color': '#000000'})),
  transition('* => *', [
    animate(200)
  ]),
]);
