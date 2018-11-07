import Route from '@ember/routing/route';

export default Route.extend({
  model: function() {
    return this.store.findAll('widget');
  },

  actions: {
    createWidget() {
      let widget = this.store.createRecord('widget');
      widget.save();
    },

    updateWidget(widget) {
      widget.save();
    },
  },
});
