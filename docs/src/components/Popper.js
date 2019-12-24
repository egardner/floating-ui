import { createPopper } from '../../../lib/popper.js';
import { useRef, useLayoutEffect, cloneElement } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const usePopper = (options = {}) => {
  const referenceRef = useRef();
  const popperRef = useRef();

  const popperInstanceRef = useRef();

  useLayoutEffect(() => {
    const popperInstance = createPopper(
      referenceRef.current,
      popperRef.current,
      options
    );

    popperInstanceRef.current = popperInstance;

    return () => {
      popperInstance.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    popperInstanceRef.current.setOptions(options);
    popperInstanceRef.current.update();
  }, [options]);

  return {
    reference: referenceRef,
    popper: popperRef,
  };
};

export const Tooltip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: ${props => (props.dark ? '#333' : '#fff')};
  color: ${props => (props.dark ? '#fff' : '#642f45')};
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  pointer-events: none;

  ${props =>
    props.hide &&
    css`
      &[data-popper-escaped] {
        opacity: 0.5;
      }

      &[data-popper-reference-hidden] {
        opacity: 0;
      }
    `}

  &[data-popper-placement^='top'] {
    > [data-popper-arrow] {
      bottom: -5px;
      margin: 0 6px;
    }
  }

  &[data-popper-placement^='right'] {
    > [data-popper-arrow] {
      left: -5px;
      margin: 6px 0;
    }
  }

  &[data-popper-placement^='bottom'] {
    > [data-popper-arrow] {
      top: -5px;
      margin: 0 6px;
    }
  }

  &[data-popper-placement^='left'] {
    > [data-popper-arrow] {
      right: -5px;
      margin: 6px 0;
    }
  }
`;

export const Arrow = styled.div`
  &,
  &::before {
    width: 10px;
    height: 10px;
    position: absolute;
    z-index: -1;
  }

  &::before {
    content: '';
    transform: rotate(45deg);
    background: ${props => (props.dark ? '#333' : '#fff')};
    top: 0;
    left: 0;
  }
`;