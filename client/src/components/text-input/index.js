import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import '../../stylesheets/index.css';

const TextInput = props => {
  const {
    meta: { touched, error, warning }
  } = props;
  return (
    <React.Fragment>
      <Form.Input fluid {...props} />
      {touched &&
        ((error && <span className="errorMessage">{error}</span>) ||
          (warning && <span className="warningMessage">{warning}</span>))}
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
