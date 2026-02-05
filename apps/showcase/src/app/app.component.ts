import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastContainerComponent } from 'angular-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, ToastContainerComponent, TranslateModule],
})
export class AppComponent {
}
