import { click, fillIn, findAll, currentPath, find, visit } from '@ember/test-helpers';
/* jshint expr:true */
import { run } from '@ember/runloop';
import {
  describe,
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

describe('Acceptance: /post/:id', function() {
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

  it('can visit /post/post_1', async function() {
    await visit('/post/post_1');

    expect(currentPath()).to.equal('post');
  });

  it('shows the post author', async function() {
    await visit('/post/post_1');

    expect(find('.post-author').textContent.trim()).to.equal('tstirrat');
  });

  it('shows the post date', async function() {
    await visit('/post/post_1');

    expect(find('.post-date').textContent.trim()).to.not.equal(''); // careful of timezones here
  });

  it('shows the post title', async function() {
    await visit('/post/post_1');

    expect(find('.post-title').textContent.trim()).to.equal('Post 1');
  });

  it('shows the post body', async function() {
    await visit('/post/post_1');

    expect(find('.post-content').textContent.trim()).to.equal('Post 1 body');
  });

  it('shows all comments', async function() {
    await visit('/post/post_1');

    expect(findAll('.post-comment:not(.post-comment-new)').length).to.equal(2);
  });

  it('shows comment author', async function() {
    await visit('/post/post_1');

    expect(find('.post-comment:first .post-comment-author').textContent.trim()).to.equal('sara');
  });

  it('shows formatted comment date', async function() {
    await visit('/post/post_1');

    expect(find('.post-comment:first .post-comment-date').textContent.trim()).to.not.equal(''); // careful of timezones
  });

  it('updates properties if they change on the server', async function() {
    await visit('/post/post_1');

    expect(find('.post-title').textContent.trim()).to.equal('Post 1');

    run(function() {
      ref.child('posts/post_1/title').set('Post 1 UPDATED');
    });

    expect(find('.post-title').textContent.trim()).to.equal('Post 1 UPDATED');
  });

  describe('the new comment entry form', function () {

    it('contains a username entry field', async function() {
      await visit('/post/post_1');

      expect(findAll('.post-comment-new input').length).to.equal(1);
    });

    it('contains a comment body entry field', async function() {
      await visit('/post/post_1');

      expect(findAll('.post-comment-new textarea').length).to.equal(1);
    });

  }); // the new comment entry form

  describe('adding a comment', function () {

    const COMMENT_SELECTOR =
        '.post-comments .post-comment:not(.post-comment-new)';

    beforeEach(async () => {
      await visit('/post/post_2');

      expect(findAll(COMMENT_SELECTOR).length).to.equal(0);

      await fillIn('.post-comment-new [placeholder=Username]', 'kanye');
      await fillIn('.post-comment-new > textarea', 'comment');
      await click('.post-comment-new > button');
    });

    it('appends a comment to the comment list', function() {
      expect(findAll(COMMENT_SELECTOR).length).to.equal(1);
    });

    it('appends the correct comment details', function() {
      const comment = find(COMMENT_SELECTOR);
      expect(comment.find('.post-comment-author').text().trim())
          .to.equal('kanye');
      expect(comment.find('.post-comment-body > p').text().trim())
          .to.equal('comment');
    });

  }); // adding a comment
});
