import { resolve, reject, Promise } from 'rsvp';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

export default EmberObject.extend({
  firebase: service(),

  /**
   * Extacts session information from authentication response
   *
   * @param {!firebase.User} user
   * @return {Promise}
   */
  open(user) {
    return resolve({
      provider: this.extractProviderId_(user),
      uid: user.uid,
      currentUser: user
    });
  },


  /**
   * Restore existing authenticated session
   *
   * @return {Promise}
   */
  fetch() {
    return this.fetchAuthState_()
      .then((user) => {
        if (!user) {
          return this.fetchRedirectState_();
        }
        return user;
      })
      .then((user) => {
        if (!user) {
          return reject(new Error('No session available'));
        }
        return this.open(user);
      })
      .catch((err) => reject(err));
  },


  /**
   * Fetches the redirect user, if any.
   *
   * @return {!Promise<?firebase.User>}
   * @private
   */
  fetchRedirectState_() {
    let auth = this.get('firebase').auth();
    return auth.getRedirectResult()
      .then(result => result.user);
  },


  /**
   * Promisifies the first value of onAuthStateChanged
   *
   * @return {!Promise<?firebase.User>}
   * @private
   */
  fetchAuthState_() {
    return new Promise((resolve, reject) => {
      let auth = this.get('firebase').auth();
      const unsub = auth.onAuthStateChanged((user) => {
        unsub();
        resolve(user);
      },
      (err) => {
        unsub();
        reject(err);
      });
    });
  },


  /**
   * Close existing authenticated session
   *
   * @return {Promise}
   */
  close() {
    return this.get('firebase').auth().signOut();
  },

  /**
   * Extracts the provider id from the firebase user
   *
   * @param {!firebase.User} user
   * @private
   */
  extractProviderId_(user) {
    if (user.isAnonymous) {
      return 'anonymous';
    }

    if (user.providerData && user.providerData.length) {
      return user.providerData[0].providerId;
    }

    return 'custom';
  }
});
