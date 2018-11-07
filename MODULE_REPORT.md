## Module Report
### Unknown Global

**Global**: `Ember.libraries`

**Location**: `addon/initializers/emberfire.js` at line 9

```js
var VERSION = '0.0.0';

if (Ember.libraries) {
  if (firebase.SDK_VERSION) {
    Ember.libraries.registerCoreLibrary('Firebase', firebase.SDK_VERSION);
```

### Unknown Global

**Global**: `Ember.libraries`

**Location**: `addon/initializers/emberfire.js` at line 11

```js
if (Ember.libraries) {
  if (firebase.SDK_VERSION) {
    Ember.libraries.registerCoreLibrary('Firebase', firebase.SDK_VERSION);
  }

```

### Unknown Global

**Global**: `Ember.libraries`

**Location**: `addon/initializers/emberfire.js` at line 14

```js
  }

  Ember.libraries.registerCoreLibrary('EmberFire', VERSION);
}

```

### Unknown Global

**Global**: `Ember.testing`

**Location**: `addon/mixins/waitable.js` at line 10

```js
    this._reasons = 0;

    if (Ember.testing) {
      this._registerWaiter();
    }
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `addon/adapters/firebase.js` at line 191

```js
        called = true;
      }, (error) => {
        Ember.Logger.error(error);
      });
    }
```

### Unknown Global

**Global**: `Ember.MODEL_FACTORY_INJECTIONS`

**Location**: `tests/dummy/app/app.js` at line 8

```js
let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
```

### Unknown Global

**Global**: `Ember.Handlebars`

**Location**: `tests/dummy/app/helpers/breaklines.js` at line 6

```js
  let value = params[0];
  if (value) {
    let escaped = Ember.Handlebars.Utils.escapeExpression(value);
        escaped = escaped.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new Ember.String.htmlSafe(escaped);
```
