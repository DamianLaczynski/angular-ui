import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastContainerComponent } from 'angular-ui';
import { DesignSystemService } from '@shared/theme/design-system.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, ToastContainerComponent, TranslateModule],
})
export class AppComponent {
  private readonly designSystemService = inject(DesignSystemService);
}
