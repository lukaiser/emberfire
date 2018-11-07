import { run } from '@ember/runloop';
import destroyFirebaseApps from './destroy-firebase-apps';

export default function destroyApp(application) {
  destroyFirebaseApps();
  run(application, 'destroy');
}
