import { htmlSafe } from '@ember/template';
import { helper as buildHelper } from '@ember/component/helper';
import Ember from 'ember';

export default buildHelper(function(params) {
  let value = params[0];
  if (value) {
    let escaped = Ember.Handlebars.Utils.escapeExpression(value);
        escaped = escaped.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new htmlSafe(escaped);
  }
});
