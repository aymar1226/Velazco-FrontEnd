import { Component } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent {
  n: number = 0;
  time_to_hidden_menu: number = 1200;

  dropdown_open(): void {
    if (this.n % 2 === 0) {
      const menu = document.querySelector(".cont_back_menu") as HTMLElement;
      if (menu) {
        menu.className = "cont_back_menu active";
      }
      const svgIcon = document.getElementById("svg_icon") as HTMLElement;
      if (svgIcon) {
        svgIcon.style.top = "0px";
      }
    } else {
      const menu = document.querySelector(".cont_back_menu") as HTMLElement;
      if (menu) {
        menu.className = "cont_back_menu inactive";
        setTimeout(() => {
          const menu = document.querySelector(".cont_back_menu") as HTMLElement;
          if (menu) {
            menu.className = "cont_back_menu div_hidde";
          }
          const svgIcon = document.getElementById("svg_icon") as HTMLElement;
          if (svgIcon) {
            svgIcon.style.top = "-13px";
          }
        }, this.time_to_hidden_menu);
      }
    }
    this.n++;
  }
}