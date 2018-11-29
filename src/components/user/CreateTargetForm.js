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
// Images
import createTargetIcon from './../../assets/targetGroup/group.png';
import smileIcon from './../../assets/smilies/smilies@3x.png';

const messages = defineMessages({
  specifyArea: { id: 'target.form.specifyArea' },
  targetTitle: { id: 'target.form.targetTitle' },
  selectTopic: { id: 'target.form.selectTopic' },
  placeChooseTitle: { id: 'target.form.placeHolderTitle' },
  placeHolderTopics: { id: 'target.form.placeHolderTopics' }
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
    return topics.map(item =>
      // Removed the unnecesary topic level
      ({
        value: item.topic.id,
        label: item.topic.label,
        icon: item.topic.icon
      }));
  }

  render() {
    const { handleSubmit, error, submitting, intl } = this.props;
    const topicsOptions = this.mapTopicsToArray();

    return (
      <form onSubmit={handleSubmit}>
        {error && <strong>{error}</strong>}
        <div>
          <div className="targetGroupContainer">
            <img src={createTargetIcon} className="targetGroup" alt="" />
            <FormattedMessage id="target.title.createTarget" />
          </div>

          <Field
            name="radius"
            label={intl.formatMessage(messages.specifyArea)}
            component={Input}
            type="text"
            className="text-center area"
          />
        </div>
        <div>
          <Field
            name="title"
            label={intl.formatMessage(messages.targetTitle)}
            component={Input}
            type="text"
            className="choose-title"
            placeholder={intl.formatMessage(messages.placeChooseTitle)}
          />
        </div>
        <div>
          <Field
            name="topicId"
            label={intl.formatMessage(messages.selectTopic)}
            component={CustomSelect}
            options={topicsOptions}
            type="select"
            placeholder={intl.formatMessage(messages.placeHolderTopics)}
          />
        </div>
        <div className="wrapper-button">
          <button className="create-target__button" type="submit">
            <FormattedMessage id="target.form.saveTarget" />
          </button>
        </div>

        <div>
          <img id="smilesIcon" className="iconSmile" alt="smiles" src={smileIcon} />
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

