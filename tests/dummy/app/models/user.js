import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  created: DS.attr('number'),
  username: computed(function() {
    return this.get('id');
  }),
  firstName: DS.attr('string'),
  avatar: computed(function() {
    return 'https://www.gravatar.com/avatar/' + md5(this.get('id')) + '.jpg?d=retro&size=80';
  })
});
