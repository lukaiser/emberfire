import { click, currentPath, find, visit } from '@ember/test-helpers';
/* jshint expr:true */
import { resolve, Promise } from 'rsvp';
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import stubFirebase from '../helpers/stub-firebase';
import unstubFirebase from '../helpers/unstub-firebase';
import createTestRef from '../helpers/create-test-ref';
import replaceAppRef from '../helpers/replace-app-ref';
import replaceFirebaseAppService from '../helpers/replace-firebase-app-service';

describe('Acceptance: /auth', function() {
  let application;
  let signInWithPopupStub;

  const authMock = {
    signInAnonymously() {},
    signInWithPopup() {}
  };

  const firebaseAppMock = {
    auth() {
      return authMock;
    }
  };

  beforeEach(function() {
    stubFirebase();
    signInWithPopupStub = sinon.stub(authMock, 'signInWithPopup');

    application = startApp();
    replaceFirebaseAppService(application, firebaseAppMock);
    replaceAppRef(application, createTestRef('acceptance'));
  });

  afterEach(function() {
    signInWithPopupStub.restore();
    destroyApp(application);
    unstubFirebase();
  });

  it('can visit /auth', async function() {
    await visit('/auth');

    expect(currentPath()).to.equal('auth');
  });

  describe('anonymous auth', function () {

    let authData, signInAnonymouslyStub;

    beforeEach(function() {
      authData = {
        uid: 'uid1234',
        isAnonymous: true,
        providerData: []
      };

      signInAnonymouslyStub =
          sinon.stub(authMock, 'signInAnonymously')
              .returns(resolve(authData));
    });

    afterEach(function() {
      signInAnonymouslyStub.restore();
    });

    it('creates a session when the auth method returns data', async function() {
      await visit('/auth');

      expect(find('.user-data-is-authenticated').textContent.trim()).to.equal('false');

      await click('.auth-as-anon');

      expect(find('.user-data-is-authenticated').textContent.trim()).to.equal('true');
      expect(find('.user-data-provider').textContent.trim()).to.equal('anonymous');
      expect(find('.user-data-uid').textContent.trim()).to.equal('uid1234');
    });

  }); // anonymous auth

  describe('twitter auth', function () {

    let authData;

    beforeEach(function() {
      authData = {
        uid: 'twitter:uid1234',
        providerData: [{providerId: 'twitter.com'}],
      };

      signInWithPopupStub.returns(Promise.resolve(authData));
    });

    it('creates a session when the auth method returns data', async function() {
      await visit('/auth');

      expect(find('.user-data-is-authenticated').textContent.trim()).to.equal('false');

      await click('.auth-as-twitter');

      expect(find('.user-data-is-authenticated').textContent.trim()).to.equal('true');
      expect(find('.user-data-provider').textContent.trim()).to.equal('twitter.com');
      expect(find('.user-data-uid').textContent.trim()).to.equal(authData.uid);
    });

  }); // twitter auth

  describe('facebook auth', function () {

    let authData;

    beforeEach(function() {
      authData = {
        uid: 'uid1234',
        providerData: [{providerId: 'facebook.com'}],
      };

      signInWithPopupStub.returns(Promise.resolve(authData));
    });

    it('creates a session when the auth method returns data', async function() {
      await visit('/auth');

      expect(find('.user-data-is-authenticated').textContent.trim()).to.equal('false');

      await click('.auth-as-facebook');

      expect(find('.user-data-is-authenticated').textContent.trim()).to.equal('true');
      expect(find('.user-data-provider').textContent.trim()).to.equal('facebook.com');
      expect(find('.user-data-uid').textContent.trim()).to.equal(authData.uid);
    });

  }); // facebook auth

  describe('github auth', function () {

    let authData;

    beforeEach(function() {
      authData = {
        uid: 'uid1234',
        providerData: [{providerId: 'github.com'}],
      };

      signInWithPopupStub.returns(Promise.resolve(authData));
    });

    it('creates a session when the auth method returns data', async function() {
      await visit('/auth');

      expect(find('.user-data-is-authenticated').textContent.trim()).to.equal('false');

      await click('.auth-as-github');

      expect(find('.user-data-is-authenticated').textContent.trim()).to.equal('true');
      expect(find('.user-data-provider').textContent.trim()).to.equal('github.com');
      expect(find('.user-data-uid').textContent.trim()).to.equal(authData.uid);
    });

  }); // google auth

  describe('google auth', function () {

    let authData;

    beforeEach(function() {
      authData = {
        uid: 'uid1234',
        providerData: [{providerId: 'google.com'}],
      };

      signInWithPopupStub.returns(Promise.resolve(authData));
    });

    it('creates a session when the auth method returns data', async function() {
      await visit('/auth');

      expect(find('.user-data-is-authenticated').textContent.trim()).to.equal('false');

      await click('.auth-as-google');

      expect(find('.user-data-is-authenticated').textContent.trim()).to.equal('true');
      expect(find('.user-data-provider').textContent.trim()).to.equal('google.com');
      expect(find('.user-data-uid').textContent.trim()).to.equal(authData.uid);
    });

  }); // google auth

});
