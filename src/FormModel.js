import { observable, computed, extendObservable, transaction } from 'mobx';
import Field from './Field';

class FormModel {
  @observable fields = {};
  @observable validating = false;
  @computed get valid() {
    if (this.validating) {
      return false; // consider the form invalid until the validation process finish
    }
    const keys = Object.keys(this.fields);
    return keys.every((key) => {
      const field = this.fields[key];
      return !!field.valid;
    }, true);
  }

  @computed get interacted() {
    const keys = this.fieldKeys();
    return keys.some((key) => {
      const field = this.fields[key];
      return !!field.interacted;
    });
  }

  clearValues(obj) {
    transaction(() => {
      Object.keys(obj).forEach((key) => this.updateField(key, obj[key], true));
    });

  }

  fieldKeys() {
    return Object.keys(this.fields);
  }

  getField(field) {
    const theField = this.fields[field];
    if (!theField) {
      throw new Error(`Field ${field} not found`);
    }
    return theField;
  }

  valueOf(field) {
    return this.getField(field).value;
  }

  @computed get summary() {
    return this.fieldKeys().reduce((seq, key) => {
      const field = this.fields[key];
      if (field.errorMessage) {
        seq.push(field.errorMessage);
      }
      return seq;
    }, []);
  }

  validate() {
    this.validating = true;

    const p = this.fieldKeys().reduce((seq, key) => {
      const field = this.fields[key];
      return seq.then(() => field.validate(true));
    }, Promise.resolve());

    p.then(() => (this.validating = false));

    return p;
  }

  updateField(field, value, reset) {
    transaction(() => {
      const theField = this.getField(field);

      if (reset) {
        theField._skipValidation = true;
      }

      theField.value = value;

      if (reset) {
        theField.clearValidation();
        theField.clearInteractive();
        theField._skipValidation = false;
      }
    });
  }

  toJSON() {
    const keys = Object.keys(this.fields);
    return keys.reduce((seq, key) => {
      const field = this.fields[key];
      seq[key] = field.value; // eslint-disable-line no-param-reassign
      return seq;
    }, {});
  }

  constructor(initialState = {}, validators = {}) {
    const keys = Object.keys(initialState);

    keys.forEach((key) => {
      extendObservable(this.fields, {
        [key]: new Field(this, initialState[key], validators[key]),
      });
    });
  }
}

export function createModel(initialState, validators) {
  return new FormModel(initialState, validators);
}
