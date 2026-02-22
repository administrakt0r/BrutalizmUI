import dynamic from "next/dynamic"

import { transformToSlug } from "@/lib/utils"

const AccordionDemo = dynamic(() => import("@/examples/ui/accordion"))
const AlertDemo = dynamic(() => import("@/examples/ui/alert"))
const AlertDialogDemo = dynamic(() => import("@/examples/ui/alert-dialog"))
const AlertDescriptionOnlyDemo = dynamic(
  () => import("@/examples/ui/alert/description-only"),
)
const AlertDestructiveDemo = dynamic(
  () => import("@/examples/ui/alert/destructive"),
)
const AlertIconDescriptionDemo = dynamic(
  () => import("@/examples/ui/alert/icon-description"),
)
const AlertIconTitleDemo = dynamic(
  () => import("@/examples/ui/alert/icon-title"),
)
const AlertLongDescriptionDemo = dynamic(
  () => import("@/examples/ui/alert/long-description"),
)
const AlertLongTitleDemo = dynamic(
  () => import("@/examples/ui/alert/long-title"),
)
const AlertLongTitleAndDescriptionDemo = dynamic(
  () => import("@/examples/ui/alert/long-title-and-description"),
)
const AlertWithButtonDemo = dynamic(
  () => import("@/examples/ui/alert/with-button"),
)
const AvatarDemo = dynamic(() => import("@/examples/ui/avatar"))
const AvatarFallbackDemo = dynamic(
  () => import("@/examples/ui/avatar/fallback"),
)
const BadgeDemo = dynamic(() => import("@/examples/ui/badge"))
const BadgeNeutralDemo = dynamic(() => import("@/examples/ui/badge/neutral"))
const BadgeWithIconDemo = dynamic(() => import("@/examples/ui/badge/with-icon"))
const BreadcrumbDemo = dynamic(() => import("@/examples/ui/breadcrumb"))
const ButtonDemo = dynamic(() => import("@/examples/ui/button"))
const ButtonIconDemo = dynamic(() => import("@/examples/ui/button/icon"))
const ButtonNeutralDemo = dynamic(() => import("@/examples/ui/button/neutral"))
const ButtonNoShadowDemo = dynamic(
  () => import("@/examples/ui/button/no-shadow"),
)
const ButtonReverseDemo = dynamic(() => import("@/examples/ui/button/reverse"))
const ButtonWithIconDemo = dynamic(
  () => import("@/examples/ui/button/with-icon"),
)
const CalendarDemo = dynamic(() => import("@/examples/ui/calendar/index"))
const CalendarRangeDemo = dynamic(() => import("@/examples/ui/calendar/range"))
const CardDemo = dynamic(() => import("@/examples/ui/card"))
const CarouselDemo = dynamic(() => import("@/examples/ui/carousel"))
const ChartDemo = dynamic(
  () => import("@/examples/ui/chart/chart-area-stacked"),
)
const CheckboxDemo = dynamic(() => import("@/examples/ui/checkbox"))
const CollapsibleDemo = dynamic(() => import("@/examples/ui/collapsible"))
const ComboboxDemo = dynamic(() => import("@/examples/ui/combobox"))
const ComboboxMultiselectDemo = dynamic(
  () => import("@/examples/ui/combobox/multiselect"),
)
const ComboboxTimezonesDemo = dynamic(
  () => import("@/examples/ui/combobox/timezones"),
)
const ComboboxUsersDemo = dynamic(() => import("@/examples/ui/combobox/users"))
const CommandDemo = dynamic(() => import("@/examples/ui/command"))
const ContextMenuDemo = dynamic(() => import("@/examples/ui/context-menu"))
const DataTableDemo = dynamic(() => import("@/examples/ui/data-table"))
const DatePickerDemo = dynamic(() => import("@/examples/ui/date-picker"))
const DialogDemo = dynamic(() => import("@/examples/ui/dialog"))
const DialogWithScrollableContent = dynamic(
  () => import("@/examples/ui/dialog/scrollable-content"),
)
const DialogWithStickyFooter = dynamic(
  () => import("@/examples/ui/dialog/sticky-footer"),
)
const DrawerDemo = dynamic(() => import("@/examples/ui/drawer"))
const DrawerWithScrollableContent = dynamic(
  () => import("@/examples/ui/drawer/scrollable-content"),
)
const DropdownMenuDemo = dynamic(() => import("@/examples/ui/dropdown-menu"))
const DropdownMenuCheckboxes = dynamic(
  () => import("@/examples/ui/dropdown-menu/checkboxes"),
)
const DropdownMenuRadioGroupDemo = dynamic(
  () => import("@/examples/ui/dropdown-menu/radio"),
)
const FormDemo = dynamic(() => import("@/examples/ui/form"))
const HoverCardDemo = dynamic(() => import("@/examples/ui/hover-card"))
const ImageCardDemo = dynamic(() => import("@/examples/ui/image-card"))
const InputDemo = dynamic(() => import("@/examples/ui/input"))
const InputOTPDemo = dynamic(() => import("@/examples/ui/input-otp"))
const InputDisabledDemo = dynamic(() => import("@/examples/ui/input/disabled"))
const InputFileDemo = dynamic(() => import("@/examples/ui/input/file"))
const InputWithButtonDemo = dynamic(
  () => import("@/examples/ui/input/with-button"),
)
const InputWithLabelDemo = dynamic(
  () => import("@/examples/ui/input/with-label"),
)
const LabelDemo = dynamic(() => import("@/examples/ui/label"))
const MarqueeDemo = dynamic(() => import("@/examples/ui/marquee"))
const MenubarDemo = dynamic(() => import("@/examples/ui/menubar"))
const NavigationMenuDemo = dynamic(
  () => import("@/examples/ui/navigation-menu"),
)
const PaginationDemo = dynamic(() => import("@/examples/ui/pagination"))
const PopoverDemo = dynamic(() => import("@/examples/ui/popover"))
const ProgressDemo = dynamic(() => import("@/examples/ui/progress"))
const RadioGroupDemo = dynamic(() => import("@/examples/ui/radio-group"))
const ResizableDemo = dynamic(() => import("@/examples/ui/resizable"))
const ScrollAreaDemo = dynamic(() => import("@/examples/ui/scroll-area"))
const SelectDemo = dynamic(() => import("@/examples/ui/select"))
const SelectDisabledDemo = dynamic(
  () => import("@/examples/ui/select/disabled"),
)
const SelectLargeListDemo = dynamic(
  () => import("@/examples/ui/select/large-list"),
)
const SelectWithIconDemo = dynamic(
  () => import("@/examples/ui/select/with-icon"),
)
const SheetDemo = dynamic(() => import("@/examples/ui/sheet"))
const SheetSideDemo = dynamic(() => import("@/examples/ui/sheet/side"))
const SidebarDemo = dynamic(() => import("@/examples/ui/sidebar/page"))
const SkeletonDemo = dynamic(() => import("@/examples/ui/skeleton"))
const SliderDemo = dynamic(() => import("@/examples/ui/slider"))
const SliderControlled = dynamic(
  () => import("@/examples/ui/slider/controlled"),
)
const TwoThumbsSliderDemo = dynamic(
  () => import("@/examples/ui/slider/two-thumbs"),
)
const VerticalSliderDemo = dynamic(
  () => import("@/examples/ui/slider/vertical"),
)
const SonnerDemo = dynamic(() => import("@/examples/ui/sonner"))
const SonnerActionDemo = dynamic(() => import("@/examples/ui/sonner/action"))
const SonnerCancelDemo = dynamic(() => import("@/examples/ui/sonner/cancel"))
const SonnerErrorDemo = dynamic(() => import("@/examples/ui/sonner/error"))
const SonnerInfoDemo = dynamic(() => import("@/examples/ui/sonner/info"))
const SonnerPromiseDemo = dynamic(() => import("@/examples/ui/sonner/promise"))
const SonnerSuccessDemo = dynamic(() => import("@/examples/ui/sonner/success"))
const SonnerWarningDemo = dynamic(() => import("@/examples/ui/sonner/warning"))
const SwitchDemo = dynamic(() => import("@/examples/ui/switch"))
const TableDemo = dynamic(() => import("@/examples/ui/table"))
const TabsDemo = dynamic(() => import("@/examples/ui/tabs"))
const TextareaDemo = dynamic(() => import("@/examples/ui/textarea"))
const TooltipDemo = dynamic(() => import("@/examples/ui/tooltip"))

type Component = {
  name: string
  exampleComponent?: React.ComponentType
  examples?: Record<string, React.ComponentType>
  notShadcn?: boolean
}

const COMPONENTS: Component[] = [
  {
    name: "Accordion",
    exampleComponent: AccordionDemo,
  },
  {
    name: "Alert Dialog",
    exampleComponent: AlertDialogDemo,
  },
  {
    name: "Alert",
    exampleComponent: AlertDemo,
    examples: {
      default: AlertDemo,
      destructive: AlertDestructiveDemo,
      "icon-description": AlertIconDescriptionDemo,
      "description-only": AlertDescriptionOnlyDemo,
      "icon-title": AlertIconTitleDemo,
      "long-description": AlertLongDescriptionDemo,
      "long-title": AlertLongTitleDemo,
      "long-title-and-description": AlertLongTitleAndDescriptionDemo,
      "with-button": AlertWithButtonDemo,
    },
  },
  {
    name: "Avatar",
    exampleComponent: AvatarDemo,
    examples: {
      default: AvatarDemo,
      fallback: AvatarFallbackDemo,
    },
  },
  {
    name: "Badge",
    exampleComponent: BadgeDemo,
    examples: {
      default: BadgeDemo,
      neutral: BadgeNeutralDemo,
      "with-icon": BadgeWithIconDemo,
    },
  },
  {
    name: "Breadcrumb",
    exampleComponent: BreadcrumbDemo,
  },
  {
    name: "Button",
    exampleComponent: ButtonDemo,
    examples: {
      default: ButtonDemo,
      reverse: ButtonReverseDemo,
      noShadow: ButtonNoShadowDemo,
      neutral: ButtonNeutralDemo,
      "with-icon": ButtonWithIconDemo,
      icon: ButtonIconDemo,
    },
  },
  {
    name: "Calendar",
    exampleComponent: CalendarDemo,
    examples: {
      default: CalendarDemo,
      range: CalendarRangeDemo,
    },
  },
  {
    name: "Card",
    exampleComponent: CardDemo,
  },
  {
    name: "Carousel",
    exampleComponent: CarouselDemo,
  },
  {
    name: "Chart",
    exampleComponent: ChartDemo,
  },
  {
    name: "Checkbox",
    exampleComponent: CheckboxDemo,
  },
  {
    name: "Collapsible",
    exampleComponent: CollapsibleDemo,
  },
  {
    name: "Combobox",
    exampleComponent: ComboboxDemo,
    examples: {
      default: ComboboxDemo,
      users: ComboboxUsersDemo,
      timezones: ComboboxTimezonesDemo,
      multiselect: ComboboxMultiselectDemo,
    },
  },
  {
    name: "Command",
    exampleComponent: CommandDemo,
  },
  {
    name: "Context Menu",
    exampleComponent: ContextMenuDemo,
  },
  {
    name: "Date Picker",
    exampleComponent: DatePickerDemo,
  },
  {
    name: "Data Table",
    exampleComponent: DataTableDemo,
  },
  {
    name: "Dialog",
    exampleComponent: DialogDemo,
    examples: {
      default: DialogDemo,
      "scrollable-content": DialogWithScrollableContent,
      "sticky-footer": DialogWithStickyFooter,
    },
  },
  {
    name: "Drawer",
    exampleComponent: DrawerDemo,
    examples: {
      default: DrawerDemo,
      "scrollable-content": DrawerWithScrollableContent,
    },
  },
  {
    name: "Dropdown Menu",
    exampleComponent: DropdownMenuDemo,
    examples: {
      default: DropdownMenuDemo,
      checkboxes: DropdownMenuCheckboxes,
      radio: DropdownMenuRadioGroupDemo,
    },
  },
  {
    name: "Form",
    exampleComponent: FormDemo,
  },
  {
    name: "Hover Card",
    exampleComponent: HoverCardDemo,
  },
  {
    name: "Image Card",
    exampleComponent: ImageCardDemo,
    notShadcn: true,
  },
  {
    name: "Input Otp",
    exampleComponent: InputOTPDemo,
  },
  {
    name: "Input",
    exampleComponent: InputDemo,
    examples: {
      default: InputDemo,
      file: InputFileDemo,
      disabled: InputDisabledDemo,
      "with-label": InputWithLabelDemo,
      "with-button": InputWithButtonDemo,
    },
  },
  {
    name: "Label",
    exampleComponent: LabelDemo,
  },
  {
    name: "Marquee",
    exampleComponent: MarqueeDemo,
    notShadcn: true,
  },
  {
    name: "Menubar",
    exampleComponent: MenubarDemo,
  },
  {
    name: "Navigation Menu",
    exampleComponent: NavigationMenuDemo,
  },
  {
    name: "Pagination",
    exampleComponent: PaginationDemo,
  },
  {
    name: "Popover",
    exampleComponent: PopoverDemo,
  },
  {
    name: "Progress",
    exampleComponent: ProgressDemo,
  },
  {
    name: "Radio Group",
    exampleComponent: RadioGroupDemo,
  },
  {
    name: "Resizable",
    exampleComponent: ResizableDemo,
  },
  {
    name: "Scroll Area",
    exampleComponent: ScrollAreaDemo,
  },
  {
    name: "Select",
    exampleComponent: SelectDemo,
    examples: {
      default: SelectDemo,
      "large-list": SelectLargeListDemo,
      disabled: SelectDisabledDemo,
      "with-icon": SelectWithIconDemo,
    },
  },
  {
    name: "Sheet",
    exampleComponent: SheetDemo,
    examples: {
      default: SheetDemo,
      side: SheetSideDemo,
    },
  },
  {
    name: "Sidebar",
    exampleComponent: SidebarDemo,
  },
  {
    name: "Skeleton",
    exampleComponent: SkeletonDemo,
  },
  {
    name: "Slider",
    exampleComponent: SliderDemo,
    examples: {
      default: SliderDemo,
      "two-thumbs": TwoThumbsSliderDemo,
      vertical: VerticalSliderDemo,
      controlled: SliderControlled,
    },
  },
  {
    name: "Sonner",
    exampleComponent: SonnerDemo,
    examples: {
      default: SonnerDemo,
      success: SonnerSuccessDemo,
      info: SonnerInfoDemo,
      warning: SonnerWarningDemo,
      error: SonnerErrorDemo,
      action: SonnerActionDemo,
      cancel: SonnerCancelDemo,
      promise: SonnerPromiseDemo,
    },
  },
  {
    name: "Switch",
    exampleComponent: SwitchDemo,
  },
  {
    name: "Table",
    exampleComponent: TableDemo,
  },
  {
    name: "Tabs",
    exampleComponent: TabsDemo,
  },
  {
    name: "Textarea",
    exampleComponent: TextareaDemo,
  },
  {
    name: "Tooltip",
    exampleComponent: TooltipDemo,
  },
]

export const COMPONENTS_MAP = COMPONENTS.reduce(
  (acc, component) => {
    acc[transformToSlug(component.name)] = component
    return acc
  },
  {} as Record<string, Component>,
)

export default COMPONENTS
