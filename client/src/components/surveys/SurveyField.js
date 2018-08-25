// SurveyField contains login to render a single label and text input
import React from 'react';

export default ({ input }) => {
  return (
    <div>
      <input {...input} />
    </div>
  );
};
