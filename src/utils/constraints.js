import validate from 'validate.js';

export const login = {
  email: {
    presence: { message: 'email.presence' },
    email: { message: 'email.invalid' },
  },
  password: {
    presence: { message: 'password.presence' },
  }
};

export const signUp = {
  name: {
    presence: { message: 'name.presence' }
  },
  email: {
    presence: { message: 'email.presence' },
    email: { message: 'email.invalid' }
  },
  password: {
    presence: { message: 'password.presence' }
  },
  passwordConfirmation: {
    presence: { message: 'passwordConfirmation.presence' },
    equality: { attribute: 'password', message: 'passwordConfirmation.equality' }
  }
};

export const createTarget = {
  radius: {
    presence: { message: 'area.presence' },
    numericality: { greaterThan: 0, message: 'area.numeric' }
  },
  title: {
    presence: { message: 'title.presence' }
  },
  topicId: {
    presence: { message: 'password.presence' }
  }
};


export const validations = (constraints, props = {}) =>
  data => validate(data.toJS(), constraints, props) || {};
