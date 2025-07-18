import * as React from 'react';

import * as Popover from '@radix-ui/react-popover';
import { styled } from 'styled-components';

import { stripReactIdOfColon } from '../../helpers/strings';
import { useComposedRefs } from '../../hooks/useComposeRefs';
import { useId } from '../../hooks/useId';
import { useIntersection } from '../../hooks/useIntersection';
import { Box } from '../../primitives/Box';
import { ANIMATIONS } from '../../styles/motion';
import { ScrollArea, ScrollAreaProps } from '../../utilities/ScrollArea';

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

interface Props extends Popover.PopoverProps {}

const Root = Popover.Root;

/* -------------------------------------------------------------------------------------------------
 * Anchor
 * -----------------------------------------------------------------------------------------------*/

const Anchor = Popover.Anchor;

/* -------------------------------------------------------------------------------------------------
 * Arrow
 * -----------------------------------------------------------------------------------------------*/

const Arrow = Popover.Arrow;

/* -------------------------------------------------------------------------------------------------
 * Trigger
 * -----------------------------------------------------------------------------------------------*/

type TriggerElement = HTMLButtonElement;

interface TriggerProps extends Omit<Popover.PopoverTriggerProps, 'asChild'> {}

const Trigger = React.forwardRef<TriggerElement, TriggerProps>((props, forwardedRef) => {
  return <Popover.Trigger {...props} asChild ref={forwardedRef} />;
});

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

type ContentElement = HTMLDivElement;

interface ContentProps extends Popover.PopoverContentProps {}

const Content = React.forwardRef<ContentElement, ContentProps>((props, forwardedRef) => {
  return (
    <Popover.Portal>
      <PopoverContent sideOffset={4} side="bottom" align="start" {...props} ref={forwardedRef} />
    </Popover.Portal>
  );
});

const PopoverContent = styled(Popover.Content)`
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  z-index: ${({ theme }) => theme.zIndices.popover};
  background-color: ${(props) => props.theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: ${({ theme }) => theme.borderRadius};

  @media (prefers-reduced-motion: no-preference) {
    animation-duration: ${(props) => props.theme.motion.timings['200']};

    &[data-state='open'] {
      animation-timing-function: ${(props) => props.theme.motion.easings.authenticMotion};

      &[data-side='top'] {
        animation-name: ${ANIMATIONS.slideUpIn};
      }

      &[data-side='bottom'] {
        animation-name: ${ANIMATIONS.slideDownIn};
      }
    }

    &[data-state='closed'] {
      animation-timing-function: ${(props) => props.theme.motion.easings.easeOutQuad};

      &[data-side='top'] {
        animation-name: ${ANIMATIONS.slideUpOut};
      }

      &[data-side='bottom'] {
        animation-name: ${ANIMATIONS.slideDownOut};
      }
    }
  }
`;

interface ScrollAreaImplProps extends ScrollAreaProps {
  intersectionId?: string;
  onReachEnd?: (entry: IntersectionObserverEntry) => void;
}

const ScrollAreaImpl = React.forwardRef<HTMLDivElement, ScrollAreaImplProps>(
  ({ children, intersectionId, onReachEnd, ...props }, forwardedRef) => {
    const popoverRef = React.useRef<HTMLDivElement>(null!);
    const composedRef = useComposedRefs(popoverRef, forwardedRef);

    const generatedIntersectionId = useId();
    useIntersection(popoverRef, onReachEnd ?? (() => {}), {
      selectorToWatch: `#${stripReactIdOfColon(generatedIntersectionId)}`,
      skipWhen: !intersectionId || !onReachEnd,
    });

    return (
      <PopoverScrollArea ref={composedRef} {...props}>
        {children}
        {intersectionId && onReachEnd && (
          <Box id={stripReactIdOfColon(generatedIntersectionId)} width="100%" height="1px" />
        )}
      </PopoverScrollArea>
    );
  },
);

const PopoverScrollArea = styled(ScrollArea)`
  height: 20rem;
`;

export { Root, Anchor, Trigger, Content, Arrow, ScrollAreaImpl as ScrollArea };
export type {
  Props,
  TriggerElement,
  TriggerProps,
  ContentProps,
  ContentElement,
  ScrollAreaImplProps as ScrollAreaProps,
};
