import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { func, string, bool, array, object } from 'prop-types';
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
    topicsList: array,
    isDeletingTarget: bool,
    initialValues: object,
    handleSubmit: func.isRequired,
    intl: intlShape.isRequired,
    submitting: bool.isRequired,
    submitSucceeded: bool.isRequired,
    error: string,
  }

  state = {
    topics: []
  };

  componentDidMount() {
    this.mapTopicsToArray();
  }

  mapTopicsToArray() {
    const { topicsList = [] } = this.props;
    const topics = topicsList.map(({ topic: { id, label, icon } }) =>
      // Removed the unnecesary topic level
      ({
        id,
        label,
        icon
      }));

    this.setState({ topics });
  }

  render() {
    const { topics } = this.state;
    const { handleSubmit, error, submitting, submitSucceeded, intl, isDeletingTarget, initialValues } = this.props;
    const target = initialValues ? initialValues.toJS() : {};
    const topicIdSelected = target.topicId ? target.topicId.toString() : '';

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div className="target-group-container">
            <img src={createTargetIcon} className="target-group" alt="" />
            <FormattedMessage id="target.title.createTarget" />
          </div>

          <Field
            name="radius"
            label={intl.formatMessage(messages.specifyArea)}
            component={Input}
            type="text"
            className="text-center area"
            disabled={isDeletingTarget}
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
            disabled={isDeletingTarget}
          />
        </div>
        <div>
          <Field
            name="topicId"
            label={intl.formatMessage(messages.selectTopic)}
            component={CustomSelect}
            options={topics}
            type="select"
            placeholder={intl.formatMessage(messages.placeHolderTopics)}
            initialOption={topicIdSelected}
            disabled={isDeletingTarget}
          />
        </div>
        {error && <strong>{error}</strong>}
        <div className="wrapper-button">
          {isDeletingTarget &&
            <button className="delete-button" type="submit" >
              <FormattedMessage id="target.form.deleteTarget" />
            </button>
          }
          <button className="create-target__button" type="submit">
            <FormattedMessage id="target.form.saveTarget" />
          </button>
        </div>

        {submitting && <Loading />}
        {submitSucceeded && <div className="icon saved-icon--small" />}

        <div>
          <img id="smiles-icon" className="icon smile-icon--small" alt="smiles" src={smileIcon} />
        </div>
      </form>
    );
  }
}

CreateTargetForm = reduxForm({
  form: 'target',
  validate: validations(createTarget, { fullMessages: false }),
  onSubmitSuccess: (result, dispatch, props) => {
    setTimeout(() => {
      props.reset();
    }, 2000);
  }
})(injectIntl(CreateTargetForm));

const mapState = state => ({
  topicsList: state.getIn(['topic', 'topicList']).toJS(),
  initialValues: state.getIn(['target', 'target']).toJS()
});

const mapDispatch = () => ({});

export default connect(mapState, mapDispatch)(CreateTargetForm);
