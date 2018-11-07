import { Promise } from 'rsvp';
import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    publishComment: function(post, comment) {
      comment.save().then(function() {
        Promise.cast(post.get('comments')).then(function(comments) {
          comments.addObject(comment);
          post.save().then(function() {}, function() {});
        });
      });
    }
  }
});
