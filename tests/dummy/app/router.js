import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('posts', { path: '/posts' }, function() {
    this.route('new');
  });
  this.route('post', { path: '/post/:post_id' });
  this.route('user', { path: '/user/:user_id' });
  this.route('auth');

  this.route('widgets', function() {
    this.route('current');
  });
});

export default Router;
