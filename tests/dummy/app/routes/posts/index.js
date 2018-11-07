import Route from '@ember/routing/route';

export default Route.extend({
  model: function() {
    return this.store.query('post', { orderBy: 'published', limitToLast: 20 });
  }
});
