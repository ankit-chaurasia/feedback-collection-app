import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import '../../stylesheets/index.css';

const TextInput = props => {
  const {
    input,
    label,
    meta: { error, touched },
    required,
    placeholder,
    icon
  } = props;
  return (
    <React.Fragment>
      <Form.Input
        fluid
        label={label}
        placeholder={placeholder}
        {...input}
        required={required}
        icon={icon}
      />
      {touched && !!error && <span className="errorMessage">{error}</span>}
    </React.Fragment>
  );
};

TextInput.propTypes = {
  required: PropTypes.bool
};

TextInput.defaultProps = {
  required: false
};

export default TextInput;
