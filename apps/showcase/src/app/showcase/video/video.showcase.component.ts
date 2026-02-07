import { Component, signal, computed, viewChild } from '@angular/core';

import { VideoComponent } from 'angular-ui';
import { TableOfContentComponent } from 'angular-ui';
import { IconName } from 'angular-ui';
import {
  InteractiveShowcaseComponent,
  ShowcaseConfig,
} from '@shared/components/interactive-showcase';

@Component({
  selector: 'app-video-showcase',
  imports: [VideoComponent, TableOfContentComponent, InteractiveShowcaseComponent],
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
        <h1 class="showcase__title">Video Component</h1>
        <p class="showcase__description">
          Comprehensive showcase of the Video component built with Fluent 2 Design System. The Video
          component provides a full-featured video player with custom controls, playback controls,
          and fullscreen support.
        </p>

        <!-- Interactive Demo -->
        <section class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-interactive-showcase
            #showcase
            [config]="showcaseConfig"
            [showEventLog]="true"
            (valuesChange)="onValuesChange($event)"
            (reset)="onReset()"
          >
            <div preview>
              <ui-video
                [src]="currentSrc()"
                [poster]="currentPoster() || ''"
                [autoplay]="currentAutoplay()"
                [loop]="currentLoop()"
                [muted]="currentMuted()"
                [controls]="currentControls()"
                [showPlayButton]="currentShowPlayButton()"
                [showFullscreenButton]="currentShowFullscreenButton()"
                [showVolumeButton]="currentShowVolumeButton()"
                [showProgressBar]="currentShowProgressBar()"
                [showSpeedButton]="currentShowSpeedButton()"
                [showQualityButton]="currentShowQualityButton()"
                [qualityOptions]="currentQualityOptions()"
                [size]="currentSize()"
                (play)="onPlay()"
                (pause)="onPause()"
                (ended)="onEnded()"
                (timeUpdate)="onTimeUpdate($event)"
                (volumeChange)="onVolumeChange($event)"
              />
            </div>
          </app-interactive-showcase>
        </section>

        <!-- Basic Example -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Basic Video Player</h2>
          <p class="showcase__section__description">
            Simple video player with default browser controls.
          </p>
          <div class="showcase__preview">
            <ui-video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              [controls]="true"
            />
          </div>
        </div>

        <!-- Custom Controls -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Video Player with Custom Controls</h2>
          <p class="showcase__section__description">
            Video player with custom Fluent 2 styled controls, including play/pause, progress bar,
            volume, and fullscreen buttons.
          </p>
          <div class="showcase__preview">
            <ui-video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              [controls]="false"
              [showPlayButton]="true"
              [showFullscreenButton]="true"
              [showVolumeButton]="true"
              [showProgressBar]="true"
              [showSpeedButton]="true"
              [showQualityButton]="true"
              [qualityOptions]="qualityOptions()"
            />
          </div>
        </div>

        <!-- With Poster -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Video Player with Poster Image</h2>
          <p class="showcase__section__description">
            Video player with a poster image displayed before playback starts.
          </p>
          <div class="showcase__preview">
            <ui-video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg"
              [controls]="false"
              [showPlayButton]="true"
              [showFullscreenButton]="true"
              [showVolumeButton]="true"
              [showProgressBar]="true"
            />
          </div>
        </div>

        <!-- Different Sizes -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Video Player Sizes</h2>
          <p class="showcase__section__description">
            Video player in different sizes: small, medium, and large.
          </p>
          <div class="showcase__preview">
            <div class="showcase__preview-item">
              <h3 class="showcase__subsection__title">Small</h3>
              <ui-video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                size="small"
                [controls]="false"
                [showPlayButton]="true"
                [showFullscreenButton]="true"
                [showVolumeButton]="true"
                [showProgressBar]="true"
              />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__subsection__title">Medium</h3>
              <ui-video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                size="medium"
                [controls]="false"
                [showPlayButton]="true"
                [showFullscreenButton]="true"
                [showVolumeButton]="true"
                [showProgressBar]="true"
              />
            </div>
            <div class="showcase__preview-item">
              <h3 class="showcase__subsection__title">Large</h3>
              <ui-video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                size="large"
                [controls]="false"
                [showPlayButton]="true"
                [showFullscreenButton]="true"
                [showVolumeButton]="true"
                [showProgressBar]="true"
              />
            </div>
          </div>
        </div>

        <!-- Autoplay -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Autoplay Video</h2>
          <p class="showcase__section__description">
            Video player that automatically starts playing when loaded (may require muted attribute
            in some browsers).
          </p>
          <div class="showcase__preview">
            <ui-video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              [autoplay]="true"
              [muted]="true"
              [loop]="true"
              [controls]="false"
              [showPlayButton]="true"
              [showFullscreenButton]="true"
              [showVolumeButton]="true"
              [showProgressBar]="true"
            />
          </div>
        </div>

        <!-- Without Volume Control -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Video Player without Volume Control</h2>
          <p class="showcase__section__description">Video player with volume control hidden.</p>
          <div class="showcase__preview">
            <ui-video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              [controls]="false"
              [showPlayButton]="true"
              [showFullscreenButton]="true"
              [showVolumeButton]="false"
              [showProgressBar]="true"
            />
          </div>
        </div>

        <!-- Without Fullscreen -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Video Player without Fullscreen Button</h2>
          <p class="showcase__section__description">Video player with fullscreen button hidden.</p>
          <div class="showcase__preview">
            <ui-video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              [controls]="false"
              [showPlayButton]="true"
              [showFullscreenButton]="false"
              [showVolumeButton]="true"
              [showProgressBar]="true"
            />
          </div>
        </div>

        <!-- With Speed and Quality Controls -->
        <div class="showcase__section">
          <h2 class="showcase__section__title">Video Player with Speed and Quality Controls</h2>
          <p class="showcase__section__description">
            Video player with playback speed control (0.25x to 2x) and quality selection menu.
          </p>
          <div class="showcase__preview">
            <ui-video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              [controls]="false"
              [showPlayButton]="true"
              [showFullscreenButton]="true"
              [showVolumeButton]="true"
              [showProgressBar]="true"
              [showSpeedButton]="true"
              [showQualityButton]="true"
              [qualityOptions]="qualityOptions()"
            />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class VideoShowcaseComponent {
  private showcase = viewChild<InteractiveShowcaseComponent>('showcase');

  qualityOptions = signal<Array<{ value: string; label: string }>>([
    { value: 'auto', label: 'Auto' },
    { value: '2160p', label: '2160p (4K)' },
    { value: '1440p', label: '1440p' },
    { value: '1080p', label: '1080p (HD)' },
    { value: '720p', label: '720p' },
    { value: '480p', label: '480p' },
    { value: '360p', label: '360p' },
  ]);

  showcaseConfig: ShowcaseConfig = {
    componentSelector: 'ui-video',
    controlGroups: [
      { id: 'source', label: 'Source', icon: 'video' as IconName, expanded: true },
      { id: 'controls', label: 'Controls', icon: 'settings' as IconName, expanded: true },
      { id: 'playback', label: 'Playback', icon: 'play' as IconName },
      { id: 'appearance', label: 'Appearance', icon: 'color' as IconName },
    ],
    controls: [
      {
        key: 'src',
        label: 'Video Source',
        type: 'text',
        description: 'URL of the video file',
        defaultValue:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        placeholder: 'Enter video URL',
        group: 'source',
      },
      {
        key: 'poster',
        label: 'Poster Image',
        type: 'text',
        description: 'URL of the poster image',
        defaultValue: '',
        placeholder: 'Enter poster image URL',
        group: 'source',
      },
      {
        key: 'controls',
        label: 'Browser Controls',
        type: 'switch',
        description: 'Show default browser controls',
        defaultValue: false,
        group: 'controls',
      },
      {
        key: 'showPlayButton',
        label: 'Show Play Button',
        type: 'switch',
        description: 'Show custom play/pause button',
        defaultValue: true,
        group: 'controls',
      },
      {
        key: 'showProgressBar',
        label: 'Show Progress Bar',
        type: 'switch',
        description: 'Show video progress bar',
        defaultValue: true,
        group: 'controls',
      },
      {
        key: 'showVolumeButton',
        label: 'Show Volume Button',
        type: 'switch',
        description: 'Show volume control button',
        defaultValue: true,
        group: 'controls',
      },
      {
        key: 'showFullscreenButton',
        label: 'Show Fullscreen Button',
        type: 'switch',
        description: 'Show fullscreen button',
        defaultValue: true,
        group: 'controls',
      },
      {
        key: 'showSpeedButton',
        label: 'Show Speed Button',
        type: 'switch',
        description: 'Show playback speed control',
        defaultValue: false,
        group: 'controls',
      },
      {
        key: 'showQualityButton',
        label: 'Show Quality Button',
        type: 'switch',
        description: 'Show quality selection menu',
        defaultValue: false,
        group: 'controls',
      },
      {
        key: 'autoplay',
        label: 'Autoplay',
        type: 'switch',
        description: 'Start playing automatically',
        defaultValue: false,
        group: 'playback',
      },
      {
        key: 'loop',
        label: 'Loop',
        type: 'switch',
        description: 'Loop the video',
        defaultValue: false,
        group: 'playback',
      },
      {
        key: 'muted',
        label: 'Muted',
        type: 'switch',
        description: 'Mute the video',
        defaultValue: false,
        group: 'playback',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'dropdown',
        description: 'Video player size',
        options: [
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' },
        ],
        defaultValue: 'medium',
        group: 'appearance',
      },
    ],
  };

  private values = signal<Record<string, any>>({
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: '',
    controls: false,
    showPlayButton: true,
    showProgressBar: true,
    showVolumeButton: true,
    showFullscreenButton: true,
    showSpeedButton: false,
    showQualityButton: false,
    autoplay: false,
    loop: false,
    muted: false,
    size: 'medium',
  });

  currentSrc = computed(() => this.values()['src'] as string);
  currentPoster = computed(() => {
    const poster = this.values()['poster'] as string;
    return poster || undefined;
  });
  currentControls = computed(() => this.values()['controls'] as boolean);
  currentShowPlayButton = computed(() => this.values()['showPlayButton'] as boolean);
  currentShowProgressBar = computed(() => this.values()['showProgressBar'] as boolean);
  currentShowVolumeButton = computed(() => this.values()['showVolumeButton'] as boolean);
  currentShowFullscreenButton = computed(() => this.values()['showFullscreenButton'] as boolean);
  currentShowSpeedButton = computed(() => this.values()['showSpeedButton'] as boolean);
  currentShowQualityButton = computed(() => this.values()['showQualityButton'] as boolean);
  currentAutoplay = computed(() => this.values()['autoplay'] as boolean);
  currentLoop = computed(() => this.values()['loop'] as boolean);
  currentMuted = computed(() => this.values()['muted'] as boolean);
  currentSize = computed(() => this.values()['size'] as 'small' | 'medium' | 'large');
  currentQualityOptions = computed(() => {
    return this.values()['showQualityButton'] ? this.qualityOptions() : [];
  });

  onValuesChange(newValues: Record<string, any>): void {
    this.values.set(newValues);
  }

  onReset(): void {
    // Values are reset by the showcase component
  }

  onPlay(): void {
    this.showcase()?.logEvent('play');
  }

  onPause(): void {
    this.showcase()?.logEvent('pause');
  }

  onEnded(): void {
    this.showcase()?.logEvent('ended');
  }

  onTimeUpdate(time: number): void {
    this.showcase()?.logEvent('timeUpdate', { time: Math.round(time) });
  }

  onVolumeChange(vol: number): void {
    this.showcase()?.logEvent('volumeChange', { volume: Math.round(vol * 100) });
  }
}
