/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FormFieldWrapper = styled.div`

`;

const Label = styled.label`

`;

const Input = styled.input`

`;

function FormField({
  // eslint-disable-next-line react/prop-types
  label, type, name, value, onChange,

}) {
  const fieldId = `id_${name}`;
  const isTextarea = type === 'textarea';
  const tag = isTextarea ? 'textarea' : 'input';
  return (
    <FormFieldWrapper>
      <Label
        htmlFor={fieldId}
      >
        {label}
        :
        <Input
          as={tag}
          id={fieldId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}

        />
      </Label>
    </FormFieldWrapper>
  );
}
FormField.defaultProps = {
  type: 'text',
  value: '',
  onChange: () => {},
};

FormField.prototype = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,

};
export default FormField;
