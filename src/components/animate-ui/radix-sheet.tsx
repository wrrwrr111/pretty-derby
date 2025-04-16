'use client';

import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, motion, type Transition } from 'motion/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SheetContextType {
  isOpen: boolean;
}
const SheetContext = React.createContext<SheetContextType>({ isOpen: false });

const useSheet = (): SheetContextType => {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error('useSheet must be used within a Sheet');
  }
  return context;
};

type SheetProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Root>;
const Sheet: React.FC<SheetProps> = ({ children, ...props }) => {
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
    <SheetContext.Provider value={{ isOpen }}>
      <SheetPrimitive.Root {...props} onOpenChange={handleOpenChange}>
        {children}
      </SheetPrimitive.Root>
    </SheetContext.Provider>
  );
};

type SheetTriggerProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Trigger
>;
const SheetTrigger = SheetPrimitive.Trigger;

type SheetCloseProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Close
>;
const SheetClose = SheetPrimitive.Close;

type SheetPortalProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Portal
>;
const SheetPortal = SheetPrimitive.Portal;

type SheetOverlayProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Overlay
>;
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  SheetOverlayProps
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn('fixed inset-0 z-50 bg-black/80', className)}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva('fixed z-50 gap-4 bg-background p-6 shadow-lg', {
  variants: {
    side: {
      top: 'inset-x-0 top-0 border-b',
      bottom: 'inset-x-0 bottom-0 border-t',
      left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
      right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
    },
  },
  defaultVariants: {
    side: 'right',
  },
});

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  transition?: Transition;
}
const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(
  (
    {
      side = 'right',
      className,
      transition = { type: 'spring', stiffness: 150, damping: 25 },
      children,
      ...props
    },
    ref,
  ) => {
    const { isOpen } = useSheet();

    return (
      <AnimatePresence>
        {isOpen && (
          <SheetPortal forceMount>
            <SheetOverlay asChild forceMount>
              <motion.div
                key="sheet-overlay"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              />
            </SheetOverlay>
            <SheetPrimitive.Content asChild forceMount ref={ref} {...props}>
              <motion.div
                key="sheet-content"
                initial={
                  side === 'right'
                    ? { x: '100%', opacity: 0 }
                    : side === 'left'
                      ? { x: '-100%', opacity: 0 }
                      : side === 'top'
                        ? { y: '-100%', opacity: 0 }
                        : { y: '100%', opacity: 0 }
                }
                animate={{ x: 0, y: 0, opacity: 1 }}
                exit={
                  side === 'right'
                    ? { x: '100%', opacity: 0 }
                    : side === 'left'
                      ? { x: '-100%', opacity: 0 }
                      : side === 'top'
                        ? { y: '-100%', opacity: 0 }
                        : { y: '100%', opacity: 0 }
                }
                transition={transition}
                className={cn(sheetVariants({ side }), className)}
              >
                {children}
                <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </SheetPrimitive.Close>
              </motion.div>
            </SheetPrimitive.Content>
          </SheetPortal>
        )}
      </AnimatePresence>
    );
  },
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

type SheetHeaderProps = React.HTMLAttributes<HTMLDivElement>;
const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-2 text-center sm:text-left',
        className,
      )}
      {...props}
    />
  ),
);
SheetHeader.displayName = 'SheetHeader';

type SheetFooterProps = React.HTMLAttributes<HTMLDivElement>;
const SheetFooter = React.forwardRef<HTMLDivElement, SheetFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className,
      )}
      {...props}
    />
  ),
);
SheetFooter.displayName = 'SheetFooter';

type SheetTitleProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Title
>;
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  SheetTitleProps
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

type SheetDescriptionProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Description
>;
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  SheetDescriptionProps
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  useSheet,
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  type SheetProps,
  type SheetPortalProps,
  type SheetOverlayProps,
  type SheetTriggerProps,
  type SheetCloseProps,
  type SheetContentProps,
  type SheetHeaderProps,
  type SheetFooterProps,
  type SheetTitleProps,
  type SheetDescriptionProps,
};
