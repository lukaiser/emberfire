import { all } from 'rsvp';
import { run } from '@ember/runloop';
import firebase from 'firebase';

/**
 * Destroy all Firebase apps.
 */
export default function destroyFirebaseApps() {
  const deletions = firebase.apps.map((app) => app.delete());
  all(deletions).then(() => run(() => {
    // NOOP to delay run loop until the apps are destroyed
  }));
}
