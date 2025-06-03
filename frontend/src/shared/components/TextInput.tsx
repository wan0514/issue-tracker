import { useState } from 'react';
import styled from '@emotion/styled';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Wrapper isFocused={isFocused}>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ isFocused: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: ${({ isFocused, theme }) =>
    isFocused ? theme.neutral.surface.strong : theme.neutral.surface.bold};

  box-shadow: ${({ isFocused, theme }) =>
    isFocused ? `0 0 0 1px ${theme.neutral.border.active}` : 'none'};

  transition:
    background-color 0.2s,
    border-color 0.2s;
`;

const StyledLabel = styled.label`
  width: 64px;
  color: ${({ theme }) => theme.neutral.text.weak};
  ${({ theme }) => theme.typography.displayMedium12};
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.neutral.text.strong};
  ${({ theme }) => theme.typography.displayMedium16};

  &:focus {
    outline: none;
  }
`;
