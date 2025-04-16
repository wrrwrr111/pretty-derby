'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { AnimatePresence, motion, type Transition } from 'motion/react';

import { cn } from '@/lib/utils';
import {
  MotionHighlight,
  MotionHighlightItem,
} from '@/components/animate-ui/motion-highlight';

interface DropdownMenuContextType {
  isOpen: boolean;
  highlightTransition: Transition;
}
const DropdownMenuContext = React.createContext<DropdownMenuContextType>({
  isOpen: false,
  highlightTransition: { type: 'spring', stiffness: 200, damping: 25 },
});

const useDropdownMenu = (): DropdownMenuContextType => {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error('useDropdownMenu must be used within a DropdownMenu');
  }
  return context;
};

type DropdownMenuProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Root
> & {
  transition?: Transition;
};
const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  transition = { type: 'spring', stiffness: 200, damping: 25 },
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(
    props?.open ?? props?.defaultOpen ?? false,
  );

  React.useEffect(() => {
    if (props?.open !== undefined) setIsOpen(props.open);
  }, [props?.open]);

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      setIsOpen(open);
      props.onOpenChange?.(open);
    },
    [props],
  );

  return (
    <DropdownMenuContext.Provider
      value={{ isOpen, highlightTransition: transition }}
    >
      <DropdownMenuPrimitive.Root {...props} onOpenChange={handleOpenChange}>
        {children}
      </DropdownMenuPrimitive.Root>
    </DropdownMenuContext.Provider>
  );
};

type DropdownMenuTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Trigger
>;
const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  DropdownMenuTriggerProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger ref={ref} className={className} {...props} />
));
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

type DropdownMenuGroupProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Group
>;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

type DropdownMenuPortalProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Portal
>;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

type DropdownMenuSubProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Sub
>;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

type DropdownMenuRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioGroup
>;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
> & {
  inset?: boolean;
};
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ className, children, inset, disabled, ...props }, ref) => (
  <MotionHighlightItem disabled={disabled}>
    <DropdownMenuPrimitive.SubTrigger ref={ref} {...props} disabled={disabled}>
      <motion.span
        data-disabled={disabled}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'relative z-[1] flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
          inset && 'pl-8',
          className,
        )}
      >
        {children}
        <ChevronRight className="ml-auto" />
      </motion.span>
    </DropdownMenuPrimitive.SubTrigger>
  </MotionHighlightItem>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
>;
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]',
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
> & {
  transition?: Transition;
};
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(
  (
    {
      className,
      children,
      sideOffset = 4,
      transition = { duration: 0.2 },
      ...props
    },
    ref,
  ) => {
    const { isOpen, highlightTransition } = useDropdownMenu();

    return (
      <AnimatePresence>
        {isOpen && (
          <DropdownMenuPrimitive.Portal forceMount>
            <DropdownMenuPrimitive.Content
              ref={ref}
              sideOffset={sideOffset}
              asChild
              {...props}
            >
              <motion.div
                key="dropdown-menu"
                className={cn(
                  'z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]',
                  className,
                )}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}
                transition={transition}
                style={{ willChange: 'opacity, transform, clip-path' }}
              >
                <MotionHighlight
                  hover
                  className="rounded-sm"
                  controlledItems
                  transition={highlightTransition}
                >
                  {children}
                </MotionHighlight>
              </motion.div>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        )}
      </AnimatePresence>
    );
  },
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

type DropdownMenuItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> & {
  inset?: boolean;
};
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, children, inset, disabled, ...props }, ref) => {
  return (
    <MotionHighlightItem disabled={disabled}>
      <DropdownMenuPrimitive.Item ref={ref} {...props} disabled={disabled}>
        <motion.span
          data-disabled={disabled}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'relative z-[1] flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus-visible:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
            inset && 'pl-8',
            className,
          )}
        >
          {children}
        </motion.span>
      </DropdownMenuPrimitive.Item>
    </MotionHighlightItem>
  );
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>;
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ className, children, checked, disabled, ...props }, ref) => {
  return (
    <MotionHighlightItem disabled={disabled}>
      <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        {...props}
        checked={checked}
        disabled={disabled}
      >
        <motion.span
          data-disabled={disabled}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'relative z-[1] flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus-visible:bg-accent focus-visible:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className,
          )}
        >
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
              <Check className="h-4 w-4" />
            </DropdownMenuPrimitive.ItemIndicator>
          </span>
          {children}
        </motion.span>
      </DropdownMenuPrimitive.CheckboxItem>
    </MotionHighlightItem>
  );
});
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioItem
>;
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ className, children, disabled, ...props }, ref) => {
  return (
    <MotionHighlightItem disabled={disabled}>
      <DropdownMenuPrimitive.RadioItem ref={ref} {...props} disabled={disabled}>
        <motion.span
          data-disabled={disabled}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'relative z-[1] flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus-visible:bg-accent focus-visible:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className,
          )}
        >
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
              <Circle className="h-2 w-2 fill-current" />
            </DropdownMenuPrimitive.ItemIndicator>
          </span>
          {children}
        </motion.span>
      </DropdownMenuPrimitive.RadioItem>
    </MotionHighlightItem>
  );
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Label
> & {
  inset?: boolean;
};
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Separator
>;
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

type DropdownMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;
const DropdownMenuShortcut = React.forwardRef<
  HTMLSpanElement,
  DropdownMenuShortcutProps
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  );
});
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  type DropdownMenuProps,
  type DropdownMenuTriggerProps,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuCheckboxItemProps,
  type DropdownMenuRadioItemProps,
  type DropdownMenuLabelProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuShortcutProps,
  type DropdownMenuGroupProps,
  type DropdownMenuPortalProps,
  type DropdownMenuSubProps,
  type DropdownMenuSubContentProps,
  type DropdownMenuSubTriggerProps,
  type DropdownMenuRadioGroupProps,
};
