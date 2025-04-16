'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { AnimatePresence, motion, type Transition } from 'motion/react';

import { cn } from '@/lib/utils';

type TooltipProviderProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Provider
>;

const TooltipProvider = TooltipPrimitive.Provider;

interface TooltipContextType {
  isOpen: boolean;
}
const TooltipContext = React.createContext<TooltipContextType>({
  isOpen: false,
});

const useTooltip = (): TooltipContextType => {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error('useTooltip must be used within a Tooltip');
  }
  return context;
};

type TooltipProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Root
>;

const Tooltip: React.FC<TooltipProps> = ({ children, ...props }) => {
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
    <TooltipContext.Provider value={{ isOpen }}>
      <TooltipPrimitive.Root {...props} onOpenChange={handleOpenChange}>
        {children}
      </TooltipPrimitive.Root>
    </TooltipContext.Provider>
  );
};

type TooltipTriggerProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Trigger
>;

const TooltipTrigger = TooltipPrimitive.Trigger;

type TooltipContentProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
> & {
  transition?: Transition;
};

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(
  (
    {
      className,
      sideOffset = 4,
      transition = { type: 'spring', stiffness: 300, damping: 25 },
      children,
      ...props
    },
    ref,
  ) => {
    const { isOpen } = useTooltip();

    return (
      <AnimatePresence>
        {isOpen && (
          <TooltipPrimitive.Portal forceMount>
            <TooltipPrimitive.Content
              forceMount
              sideOffset={sideOffset}
              className="z-50"
              {...props}
              ref={ref}
            >
              <motion.div
                key="tooltip"
                initial={{ opacity: 0, scale: 0, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 25 }}
                transition={transition}
                className={cn(
                  'relative overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
                  className,
                )}
              >
                {children}
              </motion.div>
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        )}
      </AnimatePresence>
    );
  },
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  useTooltip,
  type TooltipContextType,
  type TooltipProps,
  type TooltipTriggerProps,
  type TooltipContentProps,
  type TooltipProviderProps,
};
