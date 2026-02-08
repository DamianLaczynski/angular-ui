import { Routes } from '@angular/router';
import { AccordionShowcaseComponent } from '@showcase/accordion/accordion.showcase.component';
import { AvatarShowcaseComponent } from '@showcase/avatar/avatar.showcase.component';
import { ButtonShowcaseComponent } from '@showcase/button/button.showcase.component';
import { CalendarShowcaseComponent } from '@showcase/calendar/calendar.showcase.component';
import { CommandPaletteShowcaseComponent } from '@showcase/command-palette/command-palette.showcase.component';
import { TimeShowcaseComponent } from '@showcase/time/time.showcase.component';
import { DateShowcaseComponent } from '@showcase/field/date/date.showcase.component';
import { TimeSpanShowcaseComponent } from '@showcase/field/time-span/time-span.showcase.component';
import { DateRangeShowcaseComponent } from '@showcase/field/date-range/date-range.showcase.component';
import { DropdownShowcaseComponent } from '@showcase/field/dropdown/dropdown.showcase.component';
import { NumberShowcaseComponent } from '@showcase/field/number/number.showcase.component';
import { PasswordShowcaseComponent } from '@showcase/field/password/password.showcase.component';
import { TextShowcaseComponent } from '@showcase/field/text/text.showcase.component';
import { EmailShowcaseComponent } from '@showcase/field/email/email.showcase.component';
import { SearchShowcaseComponent } from '@showcase/field/search/search.showcase.component';
import { TelShowcaseComponent } from '@showcase/field/tel/tel.showcase.component';
import { TextareaShowcaseComponent } from '@showcase/field/textarea/textarea.showcase.component';
import { UrlShowcaseComponent } from '@showcase/field/url/url.showcase.component';
import { TabsShowcaseComponent } from '@showcase/tabs/tabs.showcase.component';
import { SkeletonShowcaseComponent } from '@showcase/skeleton/skeleton.showcase.component';
import { DialogShowcaseComponent } from '@showcase/dialog/dialog.showcase.component';
import { EmptyStateShowcaseComponent } from '@showcase/empty-state/empty-state.showcase.component';
import { ErrorStateShowcaseComponent } from '@showcase/error-state/error-state.showcase.component';
import { LoadingStateShowcaseComponent } from '@showcase/loading-state/loading-state.showcase.component';
import { MenuShowcaseComponent } from '@showcase/menu/menu.showcase.component';
import { TagShowcaseComponent } from '@showcase/tag/tag.showcase.component';
import { ProgressBarShowcaseComponent } from '@showcase/progress-bar/progress-bar.showcase.component';
import { StateContainerShowcaseComponent } from '@showcase/state-container/state-container.showcase.component';
import { SliderShowcaseComponent } from '@showcase/field/slider/slider.showcase.component';
import { DividerShowcaseComponent } from '@showcase/divider/divider.showcase.component';
import { BadgeShowcaseComponent } from '@showcase/badge/badge.showcase.component';
import { CardShowcaseComponent } from '@showcase/card/card.showcase.component';
import { CheckboxShowcaseComponent } from '@showcase/field/checkbox/checkbox.showcase.component';
import { ColorShowcaseComponent } from '@showcase/field/color/color.showcase.component';
import { SwitchShowcaseComponent } from '@showcase/field/switch/switch.showcase.component';
import { RadioShowcaseComponent } from '@showcase/field/radio/radio.showcase.component';
import { SplitterShowcaseComponent } from '@showcase/splitter/splitter.showcase.component';
import { ScrollPanelShowcaseComponent } from '@showcase/scroll-panel/scroll-panel.showcase.component';
import { ScrollContainerShowcaseComponent } from '@showcase/scroll-container/scroll-container.showcase.component';
import { SpinnerShowcaseComponent } from '@showcase/spinner/spinner.showcase.component';
import { FileShowcaseComponent } from '@showcase/field/file/file.showcase.component';
import { StepperShowcaseComponent } from '@showcase/field/stepper/stepper.showcase.component';
import { ToastShowcaseComponent } from '@showcase/toast/toast.showcase.component';
import { TotpShowcaseComponent } from '@showcase/field/totp/totp.showcase.component';
import { NavShowcaseComponent } from '@showcase/nav/nav.showcase.component';
import { NodeShowcaseComponent } from '@showcase/node/node.showcase.component';
import { TreeShowcaseComponent } from '@showcase/tree/tree.showcase.component';
import { TreeNodeShowcaseComponent } from '@showcase/tree-node/tree-node.showcase.component';
import { DataGridShowcaseComponent } from '@showcase/data-grid/data-grid.showcase.component';
import { PaginationShowcaseComponent } from '@showcase/pagination/pagination.showcase.component';
import { ToolbarShowcaseComponent } from '@showcase/toolbar/toolbar.showcase.component';
import { IconShowcaseComponent } from '@showcase/icon/icon.showcase.component';
import { TableOfContentShowcaseComponent } from '@showcase/table-of-content/table-of-content.showcase.component';
import { BreadcrumbShowcaseComponent } from '@showcase/breadcrumb/breadcrumb.showcase.component';
import { CarouselShowcaseComponent } from '@showcase/carousel/carousel.showcase.component';
import { DrawerShowcaseComponent } from '@showcase/drawer/drawer.showcase.component';
import { KbdShowcaseComponent } from '@showcase/kbd/kbd.showcase.component';
import { TooltipShowcaseComponent } from '@showcase/tooltip/tooltip.showcase.component';
import { RatingShowcaseComponent } from '@showcase/rating/rating.showcase.component';
import { VideoShowcaseComponent } from '@showcase/video/video.showcase.component';

export const dsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'accordion',
  },
  {
    path: 'accordion',
    component: AccordionShowcaseComponent,
  },
  {
    path: 'avatar',
    component: AvatarShowcaseComponent,
  },
  {
    path: 'badge',
    component: BadgeShowcaseComponent,
  },
  {
    path: 'breadcrumb',
    component: BreadcrumbShowcaseComponent,
  },
  {
    path: 'button',
    component: ButtonShowcaseComponent,
  },
  {
    path: 'calendar',
    component: CalendarShowcaseComponent,
  },
  {
    path: 'card',
    component: CardShowcaseComponent,
  },
  {
    path: 'command-palette',
    component: CommandPaletteShowcaseComponent,
  },
  {
    path: 'data-grid',
    component: DataGridShowcaseComponent,
  },
  {
    path: 'dialog',
    component: DialogShowcaseComponent,
  },
  {
    path: 'pagination',
    component: PaginationShowcaseComponent,
  },
  {
    path: 'divider',
    component: DividerShowcaseComponent,
  },
  {
    path: 'empty-state',
    component: EmptyStateShowcaseComponent,
  },
  {
    path: 'error-state',
    component: ErrorStateShowcaseComponent,
  },
  {
    path: 'loading-state',
    component: LoadingStateShowcaseComponent,
  },
  {
    path: 'state-container',
    component: StateContainerShowcaseComponent,
  },
  {
    path: 'checkbox',
    component: CheckboxShowcaseComponent,
  },
  {
    path: 'color',
    component: ColorShowcaseComponent,
  },
  {
    path: 'date',
    component: DateShowcaseComponent,
  },
  {
    path: 'date-range',
    component: DateRangeShowcaseComponent,
  },
  {
    path: 'dropdown',
    component: DropdownShowcaseComponent,
  },
  {
    path: 'number',
    component: NumberShowcaseComponent,
  },
  {
    path: 'password',
    component: PasswordShowcaseComponent,
  },
  {
    path: 'radio',
    component: RadioShowcaseComponent,
  },
  {
    path: 'slider',
    component: SliderShowcaseComponent,
  },
  {
    path: 'switch',
    component: SwitchShowcaseComponent,
  },
  {
    path: 'text',
    component: TextShowcaseComponent,
  },
  {
    path: 'email',
    component: EmailShowcaseComponent,
  },
  {
    path: 'search',
    component: SearchShowcaseComponent,
  },
  {
    path: 'tel',
    component: TelShowcaseComponent,
  },
  {
    path: 'textarea',
    component: TextareaShowcaseComponent,
  },
  {
    path: 'toolbar',
    component: ToolbarShowcaseComponent,
  },
  {
    path: 'url',
    component: UrlShowcaseComponent,
  },
  {
    path: 'tabs',
    component: TabsShowcaseComponent,
  },
  {
    path: 'menu',
    component: MenuShowcaseComponent,
  },
  {
    path: 'nav',
    component: NavShowcaseComponent,
  },
  {
    path: 'node',
    component: NodeShowcaseComponent,
  },
  {
    path: 'tree',
    component: TreeShowcaseComponent,
  },
  {
    path: 'tree-node',
    component: TreeNodeShowcaseComponent,
  },
  {
    path: 'progress-bar',
    component: ProgressBarShowcaseComponent,
  },
  {
    path: 'scroll-panel',
    component: ScrollPanelShowcaseComponent,
  },
  {
    path: 'scroll-container',
    component: ScrollContainerShowcaseComponent,
  },
  {
    path: 'splitter',
    component: SplitterShowcaseComponent,
  },
  {
    path: 'spinner',
    component: SpinnerShowcaseComponent,
  },
  {
    path: 'stepper',
    component: StepperShowcaseComponent,
  },
  {
    path: 'skeleton',
    component: SkeletonShowcaseComponent,
  },
  {
    path: 'tag',
    component: TagShowcaseComponent,
  },
  {
    path: 'time',
    component: TimeShowcaseComponent,
  },
  {
    path: 'time-span',
    component: TimeSpanShowcaseComponent,
  },
  {
    path: 'toast',
    component: ToastShowcaseComponent,
  },
  {
    path: 'file',
    component: FileShowcaseComponent,
  },
  {
    path: 'totp',
    component: TotpShowcaseComponent,
  },
  {
    path: 'icon',
    component: IconShowcaseComponent,
  },
  {
    path: 'table-of-content',
    component: TableOfContentShowcaseComponent,
  },
  {
    path: 'carousel',
    component: CarouselShowcaseComponent,
  },
  {
    path: 'drawer',
    component: DrawerShowcaseComponent,
  },
  {
    path: 'kbd',
    component: KbdShowcaseComponent,
  },
  {
    path: 'tooltip',
    component: TooltipShowcaseComponent,
  },
  {
    path: 'rating',
    component: RatingShowcaseComponent,
  },
  {
    path: 'video',
    component: VideoShowcaseComponent,
  },
];
