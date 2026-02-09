import { Component, signal, computed, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  CarouselComponent,
  CarouselItem,
  TableOfContentComponent,
  ButtonComponent,
  DateComponent,
  SliderComponent,
  TotpComponent,
  TabsComponent,
  Tab,
  AvatarComponent,
  MenuComponent,
  TagComponent,
  IconName,
  MenuItem,
} from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';

@Component({
  selector: 'app-carousel-showcase',
  imports: [
    CarouselComponent,
    TableOfContentComponent,
    InteractiveShowcaseComponent,
    ButtonComponent,
    DateComponent,
    SliderComponent,
    TotpComponent,
    TabsComponent,
    AvatarComponent,
    MenuComponent,
    TagComponent,
    FormsModule,
  ],
  styles: [
    `
      .carousel-showcase-slide {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 280px;
        padding: 2rem;
        gap: 1.5rem;
      }
      .carousel-showcase-slide__title {
        margin: 0;
        font-size: 1.25rem;
      }
      .carousel-showcase-slide__content {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        justify-content: center;
      }
      .carousel-showcase-slide__content--wide {
        width: 100%;
        min-width: 280px;
        max-width: 420px;
      }
      .carousel-showcase-slide__content--wide ui-slider {
        width: 100%;
      }
    `,
  ],
  template: `
    <div class="showcase showcase--responsive showcase__with-toc">
      <ui-table-of-content
        [sticky]="true"
        [offsetTop]="20"
        containerSelector=".showcase-content"
        [minLevel]="1"
        [maxLevel]="2"
      />
      <div class="showcase-content">
        <h1 class="showcase__title">Carousel Component</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Carousel component built with Fluent 2 Design System. The
          Carousel provides a slide-based content display with navigation controls and indicators.
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            #showcase
            [config]="showcaseConfig"
            [showEventLog]="false"
            (valuesChange)="onValuesChange($event)"
            (reset)="onReset()"
          >
            <div preview>
              <ui-carousel
                [items]="currentItems()"
                [showControls]="currentShowControls()"
                [showIndicators]="currentShowIndicators()"
                [autoPlay]="currentAutoPlay()"
                [autoPlayInterval]="currentAutoPlayInterval()"
                [loop]="currentLoop()"
                [size]="currentSize()"
                (itemChange)="onItemChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Carousel</h2>
          <p class="showcase__section__description">
            Simple carousel with image slides and navigation controls.
          </p>
          <div class="showcase__preview">
            <ui-carousel
              [items]="basicItems()"
              [showControls]="true"
              [showIndicators]="true"
              (itemChange)="onItemChange($event)"
            />
          </div>
        </div>

        <!-- With Titles and Descriptions -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Carousel with Overlay Text</h2>
          <p class="showcase__section__description">
            Carousel slides with titles and descriptions displayed as overlay.
          </p>
          <div class="showcase__preview">
            <ui-carousel
              [items]="overlayItems()"
              [showControls]="true"
              [showIndicators]="true"
              (itemChange)="onItemChange($event)"
            />
          </div>
        </div>

        <!-- Auto-play -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Auto-play Carousel</h2>
          <p class="showcase__section__description">
            Carousel with automatic slide transitions every 3 seconds. Auto-play pauses on hover.
          </p>
          <div class="showcase__preview">
            <ui-carousel
              [items]="basicItems()"
              [autoPlay]="true"
              [autoPlayInterval]="3000"
              [showControls]="true"
              [showIndicators]="true"
              (itemChange)="onItemChange($event)"
            />
          </div>
        </div>

        <!-- Different Sizes -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Carousel Sizes</h2>
          <p class="showcase__section__description">
            Carousel in different sizes: small, medium, and large.
          </p>
          <div class="showcase__preview">
            <div class="showcase__preview-item">
              <h3 class="showcase__subsection__title">Small</h3>
              <ui-carousel
                [items]="basicItems()"
                size="small"
                [showControls]="true"
                [showIndicators]="true"
              />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__subsection__title">Medium</h3>
              <ui-carousel
                [items]="basicItems()"
                size="medium"
                [showControls]="true"
                [showIndicators]="true"
              />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__subsection__title">Large</h3>
              <ui-carousel
                [items]="basicItems()"
                size="large"
                [showControls]="true"
                [showIndicators]="true"
              />
            </div>
          </div>
        </div>

        <!-- Without Controls -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Carousel without Controls</h2>
          <p class="showcase__section__description">
            Carousel with only indicators, no navigation buttons.
          </p>
          <div class="showcase__preview">
            <ui-carousel
              [items]="basicItems()"
              [showControls]="false"
              [showIndicators]="true"
              (itemChange)="onItemChange($event)"
            />
          </div>
        </div>

        <!-- Without Indicators -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Carousel without Indicators</h2>
          <p class="showcase__section__description">
            Carousel with only navigation buttons, no indicators.
          </p>
          <div class="showcase__preview">
            <ui-carousel
              [items]="basicItems()"
              [showControls]="true"
              [showIndicators]="false"
              (itemChange)="onItemChange($event)"
            />
          </div>
        </div>

        <!-- Loop Mode -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Carousel with Loop</h2>
          <p class="showcase__section__description">
            Carousel that loops continuously through slides.
          </p>
          <div class="showcase__preview">
            <ui-carousel
              [items]="basicItems()"
              [loop]="true"
              [showControls]="true"
              [showIndicators]="true"
              (itemChange)="onItemChange($event)"
            />
          </div>
        </div>

        <!-- Non-looping Carousel -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Non-looping Carousel</h2>
          <p class="showcase__section__description">Carousel that stops at first and last slide.</p>
          <div class="showcase__preview">
            <ui-carousel
              [items]="basicItems()"
              [loop]="false"
              [showControls]="true"
              [showIndicators]="true"
              (itemChange)="onItemChange($event)"
            />
          </div>
        </div>

        <!-- Custom Content -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Carousel with Custom Content</h2>
          <p class="showcase__section__description">
            Carousel with custom content instead of images using title and description.
          </p>
          <div class="showcase__preview">
            <ui-carousel
              [items]="customItems()"
              [showControls]="true"
              [showIndicators]="true"
              (itemChange)="onItemChange($event)"
            />
          </div>
        </div>

        <div class="showcase__section">
          <h2 class="showcase__section__title">Carousel with custom template</h2>
          <p class="showcase__section__description">
            Use the <code>slideTemplate</code> input to render custom content per slide. Each slide
            receives the item and index; you can render any component or markup.
          </p>
          <div class="showcase__preview">
            <ng-template #componentSlide let-item let-index="index">
              <div class="carousel-showcase-slide">
                <h3 class="carousel-showcase-slide__title">{{ item.title }}</h3>
                @switch (item.componentType) {
                  @case ('button') {
                    <div class="carousel-showcase-slide__content">
                      <ui-button variant="primary" appearance="filled" text="Primary" />
                      <ui-button variant="secondary" appearance="filled" text="Secondary" />
                      <ui-button variant="success" appearance="filled" text="Success" />
                      <ui-button variant="warning" appearance="filled" text="Warning" />
                      <ui-button variant="danger" appearance="filled" text="Danger" />
                      <ui-button variant="info" appearance="filled" text="Info" />
                    </div>
                  }
                  @case ('date') {
                    <div class="carousel-showcase-slide__content">
                      <ui-date label="Date" />
                    </div>
                  }
                  @case ('slider') {
                    <div
                      class="carousel-showcase-slide__content carousel-showcase-slide__content--wide"
                    >
                      <ui-slider label="Slider" [min]="0" [max]="100" />
                    </div>
                  }
                  @case ('totp') {
                    <div class="carousel-showcase-slide__content">
                      <ui-totp label="TOTP" />
                    </div>
                  }
                  @case ('tabs') {
                    <div
                      class="carousel-showcase-slide__content"
                      style="width: 100%; max-width: 360px;"
                    >
                      <ui-tabs
                        [tabs]="showcaseTabs"
                        [selectedTabId]="showcaseSelectedTabId()"
                        (tabChange)="onShowcaseTabChange($event)"
                      />
                    </div>
                  }
                  @case ('avatar') {
                    <div class="carousel-showcase-slide__content">
                      <ui-avatar name="John Doe" />
                      <ui-avatar initials="AB" />
                      <ui-avatar image="https://picsum.photos/64?random=1" />
                      <ui-avatar icon="person" />
                    </div>
                  }
                  @case ('menu') {
                    <div class="carousel-showcase-slide__content">
                      <ui-menu
                        triggerVariant="dropdown"
                        text="Dropdown"
                        [menuItems]="componentShowcaseMenuItems"
                        [size]="'medium'"
                      />
                      <ui-menu
                        triggerVariant="split"
                        text="Split"
                        [menuItems]="componentShowcaseMenuItems"
                        [size]="'medium'"
                      />
                      <ui-menu
                        triggerVariant="button"
                        text="Button"
                        [menuItems]="componentShowcaseMenuItems"
                        [size]="'medium'"
                      />
                    </div>
                  }
                  @case ('tag') {
                    <div class="carousel-showcase-slide__content">
                      <ui-tag text="Tag 1" />
                      <ui-tag text="Tag 2" variant="primary" />
                      <ui-tag text="Remove" [dismissible]="true" (dismiss)="onTagDismiss()" />
                    </div>
                  }
                }
              </div>
            </ng-template>
            <ui-carousel
              [items]="componentShowcaseItems()"
              [slideTemplate]="componentSlide"
              [showControls]="true"
              [showIndicators]="true"
              [loop]="true"
              [autoPlay]="true"
              size="large"
              (itemChange)="onItemChange($event)"
            />
          </div>
        </div>

        <!-- Usage Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Usage Example</h2>
          <p class="showcase__section__description">
            Example of how to use the Carousel in your application:
          </p>
          <div class="showcase__code">
            <pre><code>{{ usageExample }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CarouselShowcaseComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-carousel',
    controlGroups: [
      { id: 'content', label: 'Content', icon: 'image' as IconName, expanded: true },
      { id: 'appearance', label: 'Appearance', icon: 'color' as IconName, expanded: true },
      { id: 'behavior', label: 'Behavior', icon: 'settings' as IconName },
    ],
    controls: [
      {
        key: 'showControls',
        label: 'Show Controls',
        type: 'switch',
        description: 'Show navigation buttons',
        defaultValue: true,
        group: 'behavior',
      },
      {
        key: 'showIndicators',
        label: 'Show Indicators',
        type: 'switch',
        description: 'Show slide indicators',
        defaultValue: true,
        group: 'behavior',
      },
      {
        key: 'autoPlay',
        label: 'Auto Play',
        type: 'switch',
        description: 'Automatically advance slides',
        defaultValue: false,
        group: 'behavior',
      },
      {
        key: 'autoPlayInterval',
        label: 'Auto Play Interval (ms)',
        type: 'number',
        description: 'Time between auto-play transitions',
        defaultValue: 3000,
        min: 500,
        max: 10000,
        step: 500,
        group: 'behavior',
      },
      {
        key: 'loop',
        label: 'Loop',
        type: 'switch',
        description: 'Loop through slides continuously',
        defaultValue: true,
        group: 'behavior',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        description: 'Carousel size',
        options: this.sizes.map(s => ({ value: s, label: s })),
        defaultValue: 'medium',
        group: 'appearance',
      },
    ],
  };

  private values = signal<Record<string, any>>({
    showControls: true,
    showIndicators: true,
    autoPlay: false,
    autoPlayInterval: 3000,
    loop: true,
    size: 'medium',
  });

  currentShowControls = computed(() => this.values()['showControls'] as boolean);
  currentShowIndicators = computed(() => this.values()['showIndicators'] as boolean);
  currentAutoPlay = computed(() => this.values()['autoPlay'] as boolean);
  currentAutoPlayInterval = computed(() => this.values()['autoPlayInterval'] as number);
  currentLoop = computed(() => this.values()['loop'] as boolean);
  currentSize = computed(() => this.values()['size'] as 'small' | 'medium' | 'large');
  currentItems = computed(() => this.basicItems());

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {}

  componentShowcaseItems = signal<CarouselItem[]>([
    { id: 'btn', title: 'Button', componentType: 'button' },
    { id: 'date', title: 'Date', componentType: 'date' },
    { id: 'slider', title: 'Slider', componentType: 'slider' },
    { id: 'totp', title: 'TOTP', componentType: 'totp' },
    { id: 'tabs', title: 'Tabs', componentType: 'tabs' },
    { id: 'avatar', title: 'Avatar', componentType: 'avatar' },
    { id: 'menu', title: 'Menu', componentType: 'menu' },
    { id: 'tag', title: 'Tag', componentType: 'tag' },
  ]);

  showcaseTabs: Tab[] = [
    { id: '1', label: 'Tab 1' },
    { id: '2', label: 'Tab 2' },
    { id: '3', label: 'Tab 3' },
  ];
  showcaseSelectedTabId = signal<string | number>('1');
  onShowcaseTabChange(tab: Tab): void {
    this.showcaseSelectedTabId.set(tab.id);
  }

  componentShowcaseMenuItems: MenuItem[] = [
    { id: '1', type: 'button', label: 'Option 1' },
    { id: '2', type: 'button', label: 'Option 2' },
    { id: '3', type: 'button', label: 'Option 3' },
  ];

  onTagDismiss(): void {}

  basicItems = signal<CarouselItem[]>([
    {
      id: 'slide1',
      image: 'https://picsum.photos/800/400?random=1',
      title: 'First Slide',
      description: 'This is the first slide in the carousel',
    },
    {
      id: 'slide2',
      image: 'https://picsum.photos/800/400?random=2',
      title: 'Second Slide',
      description: 'This is the second slide in the carousel',
    },
    {
      id: 'slide3',
      image: 'https://picsum.photos/800/400?random=3',
      title: 'Third Slide',
      description: 'This is the third slide in the carousel',
    },
    {
      id: 'slide4',
      image: 'https://picsum.photos/800/400?random=4',
      title: 'Fourth Slide',
      description: 'This is the fourth slide in the carousel',
    },
  ]);

  overlayItems = signal<CarouselItem[]>([
    {
      id: 'overlay1',
      image: 'https://picsum.photos/800/400?random=5',
      title: 'Beautiful Landscape',
      description: 'Experience the beauty of nature with our curated collection',
    },
    {
      id: 'overlay2',
      image: 'https://picsum.photos/800/400?random=6',
      title: 'Urban Architecture',
      description: 'Discover modern cityscapes and architectural marvels',
    },
    {
      id: 'overlay3',
      image: 'https://picsum.photos/800/400?random=7',
      title: 'Abstract Art',
      description: 'Explore creative expressions and artistic visions',
    },
  ]);

  customItems = signal<CarouselItem[]>([
    {
      id: 'card1',
      title: 'Welcome Card',
      description: 'This is a custom content card in the carousel with title and description.',
    },
    {
      id: 'card2',
      title: 'Feature Card',
      description: 'Another custom content example showing different styling possibilities.',
    },
    {
      id: 'card3',
      title: 'Info Card',
      description: 'Custom content can display any information you need.',
    },
  ]);

  usageExample = `// In your component
import { CarouselComponent } from '../carousel';
import { CarouselItem } from '../carousel/models/carousel-item.model';

@Component({
  template: \`
    <ui-carousel
      [items]="carouselItems()"
      [showControls]="true"
      [showIndicators]="true"
      [autoPlay]="false"
      [loop]="true"
      size="medium"
      (itemChange)="onItemChange($event)"
      (itemClick)="onItemClick($event)"
    />
  \`
})
export class MyComponent {
  carouselItems = signal<CarouselItem[]>([
    {
      id: 'slide1',
      image: '/assets/image1.jpg',
      title: 'Slide Title',
      description: 'Slide description'
    },
    {
      id: 'slide2',
      image: '/assets/image2.jpg',
      title: 'Another Slide',
      description: 'Another description'
    }
  ]);
  
  onItemChange(event: { item: CarouselItem; index: number }) {
    console.log('Current slide:', event.item.id, 'at index', event.index);
  }
  
  onItemClick(event: { item: CarouselItem; index: number }) {
    console.log('Clicked slide:', event.item.id);
  }
}`;

  onItemChange(event: { item: CarouselItem; index: number }): void {
    console.log('Carousel item changed:', event.item.id, 'at index', event.index);
  }
}
