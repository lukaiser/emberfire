import { click, find, visit } from '@ember/test-helpers';
/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
// import Ember from 'ember';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import replaceAppRef from '../helpers/replace-app-ref';
import stubFirebase from '../helpers/stub-firebase';
import unstubFirebase from '../helpers/unstub-firebase';
import createTestRef from '../helpers/create-test-ref';

// This test verifies that someone can use JSONAPIAdapter along side
// FirebaseAdapter in their application
describe('Acceptance: JSONAPIAdapter still works', function() {
  var application, ref;

  beforeEach(function() {
    stubFirebase();
    application = startApp();
    ref = createTestRef('acceptance');

    replaceAppRef(application, ref);
  });

  afterEach(function() {
    unstubFirebase();
    destroyApp(application);
  });

  it('can load widgets', async function() {
    await visit('/widgets');

    expect(find('[data-test-widget=1] .name').textContent).to.equal('WIDGET 1');
  });

  it('can create widgets', async function() {
    await visit('/widgets');
    await click('[data-test-create-widget]');

    expect(find('[data-test-widget=2] .name').textContent).to.equal('WIDGET 2');
  });

  it('can update a widget with sideloaded data', async function() {
    await visit('/widgets');
    await click('[data-test-update-widget=1]');

    expect(find('[data-test-widget=1] .name').textContent).to.equal('WIDGET 1 - UPDATED');
  });

  it('can handle pushing a response with empty data', async function() {
    await visit('/widgets/current');

    var textIgnoringWhitespace = find('[data-test-current-widget]').textContent.replace(/\s+/g, ' ');
    expect(textIgnoringWhitespace).to.equal(' Currently: there is no current widget ');
  });

});


