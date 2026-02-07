import { Component } from '@angular/core';
import { KbdComponent } from 'angular-ui';

@Component({
  selector: 'app-kbd-showcase',
  standalone: true,
  imports: [KbdComponent],
  template: `
    <div class="showcase showcase--responsive">
      <h1 class="showcase__title">Kbd Component</h1>
      <p class="showcase__description">
        Comprehensive showcase of the Kbd component built with Fluent 2 Design System. The Kbd
        component displays keyboard keys in a styled format, perfect for showing keyboard shortcuts
        and keyboard navigation instructions.
      </p>

      <!-- Basic Usage -->
      <div class="showcase__section">
        <h2 class="showcase__section__title">Basic Usage</h2>
        <p class="showcase__section__description">
          Simple keyboard key displays with default styling.
        </p>
        <div class="showcase__preview">
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <ui-kbd text="Enter" />
            <ui-kbd text="Esc" />
            <ui-kbd text="Tab" />
            <ui-kbd text="Space" />
            <ui-kbd text="Ctrl" />
            <ui-kbd text="Alt" />
            <ui-kbd text="Shift" />
          </div>
        </div>
      </div>

      <!-- Size Variants -->
      <div class="showcase__section">
        <h2 class="showcase__section__title">Size Variants</h2>
        <p class="showcase__section__description">
          Different sizes available: small, medium (default), and large.
        </p>
        <div class="showcase__preview">
          <h3 class="showcase__subsection__title">Small</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <ui-kbd text="Ctrl" size="small" />
            <ui-kbd text="A" size="small" />
            <ui-kbd text="Enter" size="small" />
          </div>

          <h3 class="showcase__subsection__title" style="margin-top: 24px;">Medium (Default)</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <ui-kbd text="Ctrl" size="medium" />
            <ui-kbd text="A" size="medium" />
            <ui-kbd text="Enter" size="medium" />
          </div>

          <h3 class="showcase__subsection__title" style="margin-top: 24px;">Large</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <ui-kbd text="Ctrl" size="large" />
            <ui-kbd text="A" size="large" />
            <ui-kbd text="Enter" size="large" />
          </div>
        </div>
      </div>

      <!-- Appearance Variants -->
      <div class="showcase__section">
        <h2 class="showcase__section__title">Appearance Variants</h2>
        <p class="showcase__section__description">
          Default appearance with white background or filled appearance with subtle gray background.
        </p>
        <div class="showcase__preview">
          <h3 class="showcase__subsection__title">Default</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <ui-kbd text="Ctrl" appearance="default" />
            <ui-kbd text="Shift" appearance="default" />
            <ui-kbd text="Alt" appearance="default" />
            <ui-kbd text="Enter" appearance="default" />
          </div>

          <h3 class="showcase__subsection__title" style="margin-top: 24px;">Filled</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <ui-kbd text="Ctrl" appearance="filled" />
            <ui-kbd text="Shift" appearance="filled" />
            <ui-kbd text="Alt" appearance="filled" />
            <ui-kbd text="Enter" appearance="filled" />
          </div>
        </div>
      </div>

      <!-- Common Keyboard Shortcuts -->
      <div class="showcase__section">
        <h2 class="showcase__section__title">Common Keyboard Shortcuts</h2>
        <p class="showcase__section__description">
          Examples of how to display keyboard shortcuts using the Kbd component.
        </p>
        <div class="showcase__preview">
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span>Copy:</span>
              <ui-kbd text="Ctrl" size="small" />
              <span>+</span>
              <ui-kbd text="C" size="small" />
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span>Paste:</span>
              <ui-kbd text="Ctrl" size="small" />
              <span>+</span>
              <ui-kbd text="V" size="small" />
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span>Undo:</span>
              <ui-kbd text="Ctrl" size="small" />
              <span>+</span>
              <ui-kbd text="Z" size="small" />
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span>Save:</span>
              <ui-kbd text="Ctrl" size="small" />
              <span>+</span>
              <ui-kbd text="S" size="small" />
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span>Select All:</span>
              <ui-kbd text="Ctrl" size="small" />
              <span>+</span>
              <ui-kbd text="A" size="small" />
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span>Find:</span>
              <ui-kbd text="Ctrl" size="small" />
              <span>+</span>
              <ui-kbd text="F" size="small" />
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span>Close Tab:</span>
              <ui-kbd text="Ctrl" size="small" />
              <span>+</span>
              <ui-kbd text="W" size="small" />
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Keys -->
      <div class="showcase__section">
        <h2 class="showcase__section__title">Navigation Keys</h2>
        <p class="showcase__section__description">
          Arrow keys and other navigation keys commonly used in keyboard navigation.
        </p>
        <div class="showcase__preview">
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <ui-kbd text="↑" />
            <ui-kbd text="↓" />
            <ui-kbd text="←" />
            <ui-kbd text="→" />
            <ui-kbd text="Home" />
            <ui-kbd text="End" />
            <ui-kbd text="Page Up" />
            <ui-kbd text="Page Down" />
          </div>
        </div>
      </div>

      <!-- Modifier Keys -->
      <div class="showcase__section">
        <h2 class="showcase__section__title">Modifier Keys</h2>
        <p class="showcase__section__description">
          Special modifier keys used in keyboard shortcuts.
        </p>
        <div class="showcase__preview">
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <ui-kbd text="Ctrl" />
            <ui-kbd text="Alt" />
            <ui-kbd text="Shift" />
            <ui-kbd text="Meta" />
            <ui-kbd text="Cmd" />
            <ui-kbd text="Fn" />
          </div>
        </div>
      </div>

      <!-- Function Keys -->
      <div class="showcase__section">
        <h2 class="showcase__section__title">Function Keys</h2>
        <p class="showcase__section__description">
          Function keys (F1-F12) displayed using the Kbd component.
        </p>
        <div class="showcase__preview">
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <ui-kbd text="F1" />
            <ui-kbd text="F2" />
            <ui-kbd text="F3" />
            <ui-kbd text="F4" />
            <ui-kbd text="F5" />
            <ui-kbd text="F6" />
            <ui-kbd text="F7" />
            <ui-kbd text="F8" />
            <ui-kbd text="F9" />
            <ui-kbd text="F10" />
            <ui-kbd text="F11" />
            <ui-kbd text="F12" />
          </div>
        </div>
      </div>

      <!-- In Context Examples -->
      <div class="showcase__section">
        <h2 class="showcase__section__title">In Context Examples</h2>
        <p class="showcase__section__description">
          Real-world examples of how to use the Kbd component in documentation or help text.
        </p>
        <div class="showcase__preview">
          <div style="background: #F0F0F0; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">
              ⌨️ Keyboard Navigation
            </h3>
            <ul style="margin: 0; padding-left: 24px; line-height: 24px;">
              <li>
                <ui-kbd text="↑" size="small" /> / <ui-kbd text="↓" size="small" /> - Navigate
                between items
              </li>
              <li><ui-kbd text="←" size="small" /> - Collapse group (when focused on group)</li>
              <li><ui-kbd text="→" size="small" /> - Expand group (when focused on group)</li>
              <li>
                <ui-kbd text="Enter" size="small" /> / <ui-kbd text="Space" size="small" /> -
                Activate item or toggle group
              </li>
              <li><ui-kbd text="Home" size="small" /> - Focus first item</li>
              <li><ui-kbd text="End" size="small" /> - Focus last item</li>
              <li><ui-kbd text="Tab" size="small" /> - Move to next focusable element</li>
            </ul>
          </div>

          <div style="background: #F0F0F0; padding: 16px; border-radius: 8px;">
            <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">🔍 Quick Actions</h3>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span>Open Command Palette:</span>
                <ui-kbd text="Ctrl" size="small" />
                <span>+</span>
                <ui-kbd text="K" size="small" />
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span>Search:</span>
                <ui-kbd text="Ctrl" size="small" />
                <span>+</span>
                <ui-kbd text="F" size="small" />
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span>Close:</span>
                <ui-kbd text="Esc" size="small" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Usage Example -->
      <div class="showcase__section">
        <h2 class="showcase__section__title">Usage Example</h2>
        <p class="showcase__section__description">
          Example of how to use the Kbd component in your application:
        </p>
        <div class="showcase__code">
          <pre><code>{{ usageExample }}</code></pre>
        </div>
      </div>
    </div>
  `,
})
export class KbdShowcaseComponent {
  usageExample = `// In your component
import { KbdComponent } from '../kbd';

@Component({
  template: \`
    <div>
      <p>Press <ui-kbd text="Ctrl" size="small" /> + <ui-kbd text="K" size="small" /> to open command palette.</p>
      
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>Shortcut:</span>
        <ui-kbd text="Ctrl" size="small" />
        <span>+</span>
        <ui-kbd text="S" size="small" />
      </div>
      
      <ui-kbd text="Enter" appearance="filled" size="large" />
    </div>
  \`
})
export class MyComponent {}`;
}
