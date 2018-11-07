import { run } from '@ember/runloop';
import { Promise } from 'rsvp';

export default function(fn, context, _args, errorMsg) {
  var args = _args || [];
  return new Promise(function(resolve, reject) {
    var callback = function(error) {
      if (error) {
        if (errorMsg && typeof error === 'object') {
          error.location = errorMsg;
        }
        run(null, reject, error);
      } else {
        run(null, resolve);
      }
    };
    args.push(callback);
    fn.apply(context, args);
  });
}
