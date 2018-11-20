import React, { PureComponent } from 'react';
import { func, string, bool, array } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage
} from 'react-intl';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import CustomSelect from 'components/common/CustomSelect';
import { validations, createTarget } from 'utils/constraints';

const messages = defineMessages({
  specifyArea: { id: 'target.form.specifyArea' },
  targetTitle: { id: 'target.form.targetTitle' },
  selectTopic: { id: 'target.form.selectTopic' }
});

export class CreateTargetForm extends PureComponent {
  static propTypes = {
    topics: array,
    handleSubmit: func.isRequired,
    intl: intlShape.isRequired,
    submitting: bool.isRequired,
    error: string,
  }

  mapTopicsToArray() {
    const { topics } = this.props;
    const result = [];
    topics.forEach((item) => {
      const topic = {
        value: item.topic.id,
        label: item.topic.label,
        icon: item.topic.icon
      };
      result.push(topic);
    });
    return result;
  }

  render() {
    const { handleSubmit, error, submitting, intl } = this.props;
    const topicsOptions = this.mapTopicsToArray();

    return (
      <form onSubmit={handleSubmit}>
        {error && <strong>{error}</strong>}
        <div>
          <Field
            name="radius"
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
            name="topicId"
            label={intl.formatMessage(messages.selectTopic)}
            component={CustomSelect}
            options={topicsOptions}
            type="select"
            placeholder="What do you want to talk about?"
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

