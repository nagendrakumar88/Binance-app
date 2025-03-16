import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header-footer/header/header.component";
import { FooterComponent } from "./header-footer/footer/footer.component";
import { IndexComponent } from "./allComponents/index/index.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, IndexComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Binance-app';
}
