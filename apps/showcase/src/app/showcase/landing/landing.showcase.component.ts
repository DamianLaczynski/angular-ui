import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from 'angular-ui';

@Component({
  selector: 'app-landing-showcase',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: './landing.showcase.component.html',
  styleUrl: './landing.showcase.component.scss',
})
export class LandingShowcaseComponent {
  readonly repoUrl = 'https://github.com/DamianLaczynski/angular-ui';
}
