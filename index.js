/* jshint node: true */
'use strict';

module.exports = {
  name: 'emberfire',

  options: {
    autoImport:{
      exclude: [],
      webpack: {
        // extra webpack configuration goes here
      },
      alias: {
        'firebase': 'node_modules/firebase/firebase-app.js'
      }
    }
  },

  treeForVendor(defaultTree) {
    return defaultTree
  },

  included: function(app) {
    this._super.included.apply(this, arguments);

    //app.import('node_modules/firebase/firebase-app.js');
    //app.import('node_modules/firebase/firebase-auth.js');
    //app.import('node_modules/firebase/firebase-database.js');
  },
};
