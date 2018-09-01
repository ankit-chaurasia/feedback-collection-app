// SurveyField contains login to render a single label and text input
import React from 'react';
import { Form } from 'semantic-ui-react';
import '../../../../stylesheets/index.css';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <React.Fragment>
      <Form.Input fluid label={label} placeholder={label} {...input} />
      {touched && !!error && <span className="errorMessage">{error}</span>}
    </React.Fragment>
  );
};
