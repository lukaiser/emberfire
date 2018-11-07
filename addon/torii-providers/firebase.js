import { reject } from 'rsvp';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';
import Waitable from '../mixins/waitable';

export default EmberObject.extend(Waitable, {
  firebase: service(),

  open(options) {
    var providerId = options.provider;

    if (!providerId) {
      return reject(new Error('`provider` must be supplied'));
    }

    var auth = this.get('firebase').auth();

    switch (providerId) {
      case 'password':
        if (!options.email || !options.password) {
          return this.waitFor_(reject(new Error('`email` and `password` must be supplied')));
        }

        return this.waitFor_(auth.signInWithEmailAndPassword(options.email, options.password));

      case 'custom':
        if (!options.token) {
          return this.waitFor_(reject(new Error('A token must be supplied')));
        }

        return this.waitFor_(auth.signInWithCustomToken(options.token));

      case 'anonymous':
        return this.waitFor_(auth.signInAnonymously());

      // oauth providers e.g. 'twitter'
      default:
        const ProviderClass = getOwner(this).resolveRegistration(`firebase-auth-provider:${providerId}`);
        if (!ProviderClass) {
          return this.waitFor_(reject(new Error('Unknown provider')));
        }

        const provider = new ProviderClass();

        if (options.settings && options.settings.scope) {
          options.settings.scope.split(',').forEach((s) => provider.addScope(s));
        }

        if (options.redirect === true) {
          // promise will never resolve unless there is an error (due to redirect)
          return this.waitFor_(auth.signInWithRedirect(provider));
        }
        return this.waitFor_(auth.signInWithPopup(provider));
    }
  },


  /**
   * Wraps a promise in test waiters.
   *
   * @param {!Promise} promise
   * @return {!Promise}
   */
  waitFor_(promise) {
    this._incrementWaiters();
    return promise.then((result) => {
      this._decrementWaiters();
      if (result.user) {
        return result.user;
      }
      return result;
    }).catch((err) => {
      this._decrementWaiters();
      return reject(err);
    });
  }
});
