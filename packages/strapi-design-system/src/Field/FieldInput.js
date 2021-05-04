import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useField } from './FieldContext';
import { Row } from '../Row';
import { Box } from '../Box';

const Input = styled.input`
  border: none;
  padding-left: ${({ theme, hasLeftAction }) => (hasLeftAction ? 0 : theme.spaces[4])};
  padding-right: ${({ theme, hasRightAction }) => (hasRightAction ? 0 : theme.spaces[4])};
  padding-top: ${({ theme }) => `${theme.spaces[3]}`};
  padding-bottom: ${({ theme }) => `${theme.spaces[3]}`};

  color: ${({ theme }) => theme.colors.neutral800};
  font-weight: 400;
  // TODO: Make sure to use the theme when it's ready
  font-size: ${14 / 16}rem;
  display: block;
  width: 100%;

  ::placeholder {
    color: ${({ theme }) => theme.colors.neutral500};
  }

  :disabled {
    color: ${({ theme }) => theme.colors.neutral500};
    background: ${({ theme }) => theme.colors.neutral150};
  }
`;

const InputWrapper = styled(Row)`
  border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
`;

export const FieldInput = forwardRef(({ rightAction, leftAction, ...props }, ref) => {
  const { id, error, hint, name } = useField();

  let ariaDescription;

  if (error) {
    ariaDescription = `field-error-${id}`;
  } else if (hint) {
    ariaDescription = `field-hint-${id}`;
  }

  const fieldId = `field-${id}`;
  const hasError = Boolean(error);

  return (
    <InputWrapper justifyContent="space-between" hasError={hasError}>
      {leftAction && (
        <Box paddingLeft={3} paddingRight={2}>
          {leftAction}
        </Box>
      )}
      <Input
        id={fieldId}
        name={name}
        ref={ref}
        aria-describedby={ariaDescription}
        aria-invalid={hasError}
        hasLeftAction={Boolean(leftAction)}
        hasRightAction={Boolean(rightAction)}
        {...props}
      />
      {rightAction && (
        <Box paddingLeft={2} paddingRight={3}>
          {rightAction}
        </Box>
      )}
    </InputWrapper>
  );
});

FieldInput.displayName = 'FieldInput';

FieldInput.defaultProps = {
  rightAction: undefined,
  leftAction: undefined,
};

FieldInput.propTypes = {
  rightAction: PropTypes.element,
  leftAction: PropTypes.element,
};