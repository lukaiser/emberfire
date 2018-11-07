import { click, fillIn, currentPath, find, visit } from '@ember/test-helpers';
/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../../helpers/start-app';
import destroyApp from '../../helpers/destroy-app';
import replaceAppRef from '../../helpers/replace-app-ref';
import stubFirebase from '../../helpers/stub-firebase';
import unstubFirebase from '../../helpers/unstub-firebase';
import createTestRef from '../../helpers/create-test-ref';

describe('Acceptance: /posts/new', function() {
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

  it('can visit /posts/new', async function() {
    await visit('/posts/new');

    expect(currentPath()).to.equal('posts.new');
  });

  describe('creating a new post', function() {

    beforeEach(async () => {
      await visit('/posts/new');
      await fillIn('.post-publish [placeholder=Title]', 'AAA');
      await fillIn('.post-publish [placeholder=Username]', 'kanyewest');
      await fillIn('.post-publish [placeholder=Body]', 'things');
      await click('.post-publish button');
    });

    it('navigates to the new post', function() {
      expect(currentPath()).to.equal('post');
    });

    it('creates the post with correct info', function() {
      expect(find('.post-title').textContent.trim()).to.equal('AAA');
      expect(find('.post-author').textContent.trim()).to.equal('kanyewest');
      expect(find('.post-content > p').textContent.trim()).to.equal('things');
    });

  });  // creating a new post

});
