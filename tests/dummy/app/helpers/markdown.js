import { htmlSafe } from '@ember/template';
import { helper as buildHelper } from '@ember/component/helper';

export default buildHelper(function(params) {
  let content = params[0];
  if (content) {
    return new htmlSafe(window.markdown.toHTML(content));
  }
});
