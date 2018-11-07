/* jshint node: true */
'use strict';

module.exports = {
  name: 'emberfire',

  treeForVendor(defaultTree) {
    return defaultTree
  },

  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import('node_modules/firebase/firebase-app.js');
    app.import('node_modules/firebase/firebase-auth.js');
    app.import('node_modules/firebase/firebase-database.js');
  },
};
