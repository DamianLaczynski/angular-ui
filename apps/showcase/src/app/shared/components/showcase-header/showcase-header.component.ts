import { Component, input } from '@angular/core';

@Component({
  selector: 'app-showcase-header',
  standalone: true,
  template: `
    <header class="showcase__header">
      <div class="showcase__header__main">
        <h1 class="showcase__title showcase__header__title">{{ title() }}</h1>
      </div>
    </header>
  `,
})
export class ShowcaseHeaderComponent {
  title = input.required<string>();
}
