import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from 'angular-ui';

@Component({
  selector: 'app-home-showcase',
  imports: [IconComponent, RouterLink],
  template: `
    <div class="showcase showcase--responsive">
      <div class="showcase-content">
        <h1 class="showcase__title">Angular UI</h1>
        <p class="showcase__description">
          Biblioteka komponentów Angular oparta na Fluent 2 Design System. Zawiera zestaw
          komponentów UI w spójnym stylu, z obsługą motywu jasnego i ciemnego oraz pełną
          dostępnością.
        </p>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Szybki start</h2>
          <p class="showcase__section__description">
            Przeglądaj komponenty w menu bocznym lub skorzystaj z wyszukiwarki. Każdy showcase
            zawiera interaktywne demo oraz przykłady użycia.
          </p>
          <div class="showcase__grid showcase__grid--large">
            <a routerLink="/ds/button" class="showcase__home-card">
              <ui-icon class="showcase__home-card__icon" icon="button" size="large"></ui-icon>
              <span class="showcase__home-card__label">Button</span>
            </a>
            <a routerLink="/ds/colors" class="showcase__home-card">
              <ui-icon class="showcase__home-card__icon" icon="color" size="large"></ui-icon>
              <span class="showcase__home-card__label">Colors</span>
            </a>
            <a routerLink="/ds/avatar" class="showcase__home-card">
              <ui-icon class="showcase__home-card__icon" icon="person" size="large"></ui-icon>
              <span class="showcase__home-card__label">Avatar</span>
            </a>
            <a routerLink="/ds/card" class="showcase__home-card">
              <ui-icon class="showcase__home-card__icon" icon="contact_card" size="large"></ui-icon>
              <span class="showcase__home-card__label">Card</span>
            </a>
          </div>
        </section>

        <section class="showcase__section">
          <h2 class="showcase__section__title">Design System</h2>
          <p class="showcase__section__description">
            Komponenty wykorzystują zmienne CSS i tokeny Fluent 2. Motyw (jasny/ciemny) można
            przełączyć w nagłówku strony.
          </p>
        </section>
      </div>
    </div>
  `,
  styles: [
    `
      .showcase__home-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-4, 8px);
        padding: var(--spacing-6, 16px);
        background-color: var(--color-neutral-background-rest);
        border: 1px solid var(--color-neutral-stroke-rest);
        border-radius: var(--border-radius-400, 4px);
        text-decoration: none;
        color: var(--color-neutral-foreground-rest);
        transition:
          background-color 0.15s ease,
          border-color 0.15s ease,
          box-shadow 0.15s ease;
      }

      .showcase__home-card:hover {
        background-color: var(--color-neutral-background-hover);
        border-color: var(--color-neutral-stroke-hover);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }

      .showcase__home-card__icon {
        color: var(--color-brand-primary);
      }

      .showcase__home-card__label {
        font-size: var(--font-size-300, 0.875rem);
        font-weight: var(--font-weight-medium, 500);
      }
    `,
  ],
})
export class HomeShowcaseComponent {}
