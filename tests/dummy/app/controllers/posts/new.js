import { hash } from 'rsvp';
import EmberObject from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  init: function() {
    this.set('post',  EmberObject.create());
  },
  postIsValid: function() {
    var isValid = true;
    ['post.title', 'post.username', 'post.body'].forEach(function(field) {
      if (this.get(field) === '') {
        isValid = false;
      }
    }, this);
    return isValid;
  },
  actions: {
    publishPost: function() {
      if (!this.postIsValid()) { return; }
      hash({
        user: this.get('util').getUserByUsername(this.get('post.username'))
      })
      .then(function(promises) {
        var newPost = this.store.createRecord('post', {
          title: this.get('post.title'),
          body: this.get('post.body'),
          published: new Date().getTime(),
          user: promises.user
        });
        newPost.save();
        this.setProperties({
          'post.title': '',
          'post.username': '',
          'post.body': ''
        });
        this.transitionToRoute('post', newPost);
      }.bind(this));
    }
  },
  post: undefined
});
