import { resolve } from 'rsvp';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  findAll: function() {
    return resolve({
      data: [{
        id: '1',
        type: 'widget',
        attributes: {
          name: "WIDGET 1",
        },
      }],
    });
  },

  createRecord: function() {
    return resolve({
      data: {
        id: '2',
        type: 'widget',
        attributes: {
          name: "WIDGET 2",
        },
      },
    });
  },

  updateRecord: function(store, typeClass, snapshot) {
    const id = snapshot.id;

    return resolve({
      data: {
        id: id,
        type: 'widget',
        attributes: {
          name: `WIDGET ${id} - UPDATED`,
        },
      },

      // This response contains included to reproduce
      // https://github.com/firebase/emberfire/issues/508
      included: [],
    });
  },
});
