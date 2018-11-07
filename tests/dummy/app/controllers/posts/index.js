import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  posts: sort('model', function (a, b) {
    return b.get('published') - a.get('published');
  })
});
