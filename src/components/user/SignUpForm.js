import React, { PureComponent } from 'react';
import { func, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import Select from 'components/common/Select';
import { validations, signUp } from 'utils/constraints';

const messages = defineMessages({
  name: { id: 'login.form.name' },
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' },
  passwordPlaceHolder: { id: 'login.form.password.placeholder' },
  passConfirmation: { id: 'signup.form.passconfirmation' },
  gender: { id: 'signup.form.gender' }
});

const options = [{ value: 'female', label: 'Female' }, {value: 'male', label: 'Male'}, {value:'other', label: 'Other'}];

class SignUpForm extends PureComponent {
  static propTypes = {
    handleSubmit: func.isRequired,
    submitting: bool.isRequired,
    intl: intlShape.isRequired,
  };

  render() {
    const { handleSubmit, submitting, intl } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="name"
            label={intl.formatMessage(messages.name)}
            component={Input}
            type="text"
          />
        </div>
        <div>
          <Field
            name="email"
            label={intl.formatMessage(messages.email)}
            component={Input}
            type="email"
          />
        </div>
        <div>
          <Field
            name="password"
            label={intl.formatMessage(messages.password)}
            component={Input}
            type="password"
            placeholder={intl.formatMessage(messages.passwordPlaceHolder)}
          />
        </div>
        <div>
          <Field
            name="passwordConfirmation"
            label={intl.formatMessage(messages.passConfirmation)}
            component={Input}
            type="password"
          />
        </div>
        <div>
          <Field
            name="gender"
            label={intl.formatMessage(messages.gender)}
            component={Select}
            options={options}
            type="select"
          />
        </div>
        <button type="submit">
          <FormattedMessage id="login.form.submit" />
        </button>
        {submitting && <Loading />}
      </form>
    );
  }
}

export default reduxForm({
  form: 'signUp',
  validate: validations(signUp, { fullMessages: false })
})(injectIntl(SignUpForm));
