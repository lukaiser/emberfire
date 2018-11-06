/* jshint node: true */
'use strict';

module.exports = {
  name: 'emberfire',

  treeForVendor(defaultTree) {
    return defaultTree
  },

  included: function(app) {
    this._super.included.apply(this, arguments);
  },
};
