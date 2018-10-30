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

  OptionItem({ value, label }) {
    return <option value={value}> {label} </option>;
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
            {options.map(option => <option key={option.value} value={option.value}> {option.label} </option>)}
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
