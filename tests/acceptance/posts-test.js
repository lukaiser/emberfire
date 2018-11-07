import { find, click, findAll, currentPath, visit } from '@ember/test-helpers';
/* jshint expr:true */
import {
  // describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import replaceAppRef from '../helpers/replace-app-ref';
import stubFirebase from '../helpers/stub-firebase';
import unstubFirebase from '../helpers/unstub-firebase';
import createTestRef from '../helpers/create-test-ref';

describe('Acceptance: /posts', function() {
  var application;

  beforeEach(function() {
    stubFirebase();
    application = startApp();

    replaceAppRef(application, createTestRef('acceptance'));
  });

  afterEach(function() {
    unstubFirebase();
    destroyApp(application);
  });

  it('can visit /posts', async function() {
    await visit('/posts');

    expect(currentPath()).to.equal('posts.index');
  });

  it('shows only the latest 20 results', async function() {
    await visit('/posts');

    expect(findAll('.post-slug').length).to.equal(20);
  });

  it('shows latest post first', async function() {
    await visit('/posts');

    expect(find('.post-slug-title:first a').textContent.trim()).to.equal('Post 21');
  });

  it('shows second post last', async function() {
    await visit('/posts');

    expect(find('.post-slug-title:last a').textContent.trim()).to.equal('Post 2');
  });

  it('links to each post', async function() {
    await visit('/posts');

    expect(find('.post-slug-title:first a').getAttribute('href')).to.equal('/post/post_21');
  });

  it('navigates to the correct route, when clicking on a post link', async function() {
    await visit('/posts');
    await click('.post-slug-title:first a');

    expect(currentPath()).to.equal('post');
  });
});
