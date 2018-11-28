import React, { PureComponent } from 'react';
import { string, object, bool } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { parseInputErrors } from 'utils/helpers';

export default class Input extends PureComponent {
  static propTypes = {
    input: object.isRequired,
    label: string,
    type: string.isRequired,
    placeholder: string,
    disabled: bool,
    meta: object,
  };

  render() {
    const {
      input,
      label,
      type,
      placeholder,
      className,
      disabled,
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
