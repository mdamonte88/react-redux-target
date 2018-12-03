import React, { PureComponent } from 'react';
import { string, object, array } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { parseInputErrors } from 'utils/helpers';

export default class CustomSelect extends PureComponent {
  static propTypes = {
    input: object.isRequired,
    label: string,
    type: string.isRequired,
    placeholder: string,
    selectedOption: string,
    meta: object,
    options: array
  };

  state = {
    options: [],
    selectedOption: ''
  };

  componentDidUpdate() {
    const { options = [] } = this.props;
    this.setState({ options });
  }

  optionItem({ value, label, icon }) {
    const { selectedOption } = this.state;
    const styleClass = value == selectedOption ? 'marked-option' : 'custom-option';
    const styles = {};

    if (icon) {
      styles.backgroundImage = `url(${icon})`;
    }

    return (
      <option key={value} value={value} style={styles} className={styleClass}>
        {label}
      </option>
    );
  }

  handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    if (value === '-1') {
      return false;
    }

    this.setState({ selectedOption: value });
  }

  render() {
    const {
      input,
      label,
      type,
      placeholder,
      meta: { touched, error }
    } = this.props;

    const { options, selectedOption } = this.state;

    return (
      <div>
        {label && <label>{label}</label>}
        <div>

          <select
            className="custom-select" {...input} {...{ type }}
            onChange={this.handleChange}
            value={[selectedOption]}
            multiple
          >
            <option key="-1" value="-1" className="place-holder"> {placeholder} </option>
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
