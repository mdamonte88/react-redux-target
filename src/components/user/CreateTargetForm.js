import React, { PureComponent } from 'react';
import { func, string, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import { validations, createTarget } from 'utils/constraints';

const messages = defineMessages({
  specifyArea: { id: 'target.form.specifyArea' },
  targetTitle: { id: 'target.form.targetTitle' },
  selectTopic: { id: 'target.form.selectTopic' }
});

export class CreateTargetForm extends PureComponent {
  static propTypes = {
    handleSubmit: func.isRequired,
    intl: intlShape.isRequired,
    submitting: bool.isRequired,
    error: string
  }

  render() {
    const { handleSubmit, error, submitting, intl } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        {error && <strong>{error}</strong>}
        <div>
          <Field
            name="area"
            label={intl.formatMessage(messages.specifyArea)}
            component={Input}
            type="text"
          />
        </div>
        <div>
          <Field
            name="title"
            label={intl.formatMessage(messages.targetTitle)}
            component={Input}
            type="text"
          />
        </div>
        <div>
          <Field
            name="topic"
            label={intl.formatMessage(messages.selectTopic)}
            component={Input}
            type="text"
          />
        </div>
        <div className="content">
          <button className="sign-in-button" type="submit">
            <FormattedMessage id="target.form.saveTarget" />
          </button>
        </div>
        {submitting && <Loading />}
      </form>
    );
  }
}

export default reduxForm({
  form: 'target',
  validate: validations(createTarget, { fullMessages: false })
})(injectIntl(CreateTargetForm));
