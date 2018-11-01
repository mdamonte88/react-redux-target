import React, { PureComponent } from 'react';
import { string, object } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { parseInputErrors } from 'utils/helpers';

export default class Select extends PureComponent {
  static propTypes = {
    input: object.isRequired,
    label: string,
    type: string.isRequired,
    placeholder: string,
    meta: object,
  };

  optionItem({ value, label }) {
    return <option key={value} value={value}> {label} </option>;
  }

  render() {
    const {
      input,
      label,
      type,
      placeholder,
      options,
      meta: { touched, error }
    } = this.props;

    return (
      <div>
        {label && <label>{label}</label>}
        <div>

          <select {...input} {...{ placeholder, type }}>
            {options.map(option => this.optionItem(option))}
          </select>

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
