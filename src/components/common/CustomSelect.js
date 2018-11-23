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

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    options: [],
    selectedOption: ''
  };

  componentDidMount() {
    const { options, placeholder } = this.props;
    options.unshift({ value: '-1', label: placeholder });
    this.setState({ options });
  }

  optionItem({ value, label, icon }) {
    const { selectedOption } = this.state;
    const styles = {};
    let styleClass = 'customOption';

    if (value == '-1') {
      styleClass = 'placeHolder';
    } else if (value == selectedOption) {
      styleClass = 'markedOption';
    }

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
    const value = [event.target.value];
    if (value === -1) {
      return false;
    }
    this.setState({ selectedOption: value });
  }

  render() {
    const {
      input,
      label,
      type,
      meta: { touched, error }
    } = this.props;

    const { options, selectedOption } = this.state;

    return (
      <div>
        {label && <label>{label}</label>}
        <div>

          <select
            className="customSelect" {...input} {...{ type }}
            onChange={this.handleChange}
            value={selectedOption}
            multiple
          >
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
