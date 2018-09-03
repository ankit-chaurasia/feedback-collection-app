import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import '../../stylesheets/index.css';

const TextInput = props => {
  const {
    meta: { error, touched }
  } = props;
  return (
    <React.Fragment>
      <Form.Input fluid {...props} />
      {touched && !!error && <span className="errorMessage">{error}</span>}
    </React.Fragment>
  );
};

TextInput.propTypes = {
  type: PropTypes.string,
  required: PropTypes.bool
};

TextInput.defaultProps = {
  type: 'text',
  required: false
};

export default TextInput;
