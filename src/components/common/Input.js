import React, { PureComponent } from 'react';
import { string, object } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { parseInputErrors } from 'utils/helpers';

export default class Input extends PureComponent {
  static propTypes = {
    className: string,
    input: object.isRequired,
    label: string,
    meta: object,
    placeholder: string,
    type: string.isRequired,
  };

  render() {
    const {
      className,
      input,
      label,
      type,
      placeholder,
      meta: { touched, error }
    } = this.props;

    return (
      <div>
        {label && <label>{label}</label>}
        <div>
          <input {...input} {...{ className, placeholder, type }} />
          {touched && error &&
            <span>
              <FormattedMessage
                id={parseInputErrors(error)}
                defaultMessage={parseInputErrors(error)}
              />
            </span>
          }
        </div>
      </div>
    );
  }
}
