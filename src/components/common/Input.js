import React, { PureComponent } from 'react';
import { string, object, bool } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { parseInputErrors } from 'utils/helpers';

export default class Input extends PureComponent {
  static propTypes = {
    className: string,
    disabled: bool,
    label: string,
    input: object.isRequired,
    placeholder: string,
    type: string.isRequired,
    meta: object
  };

  render() {
    const {
      className,
      disabled,
      label,
      input,
      placeholder,
      type,
      meta: { touched, error }
    } = this.props;

    return (
      <div>
        {label && <label>{label}</label>}
        <div>
          <input {...input} {...{ className, placeholder, type, disabled }} />
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
