/*
 * Use Case
 * Run wcc against custom elements with declarative shadow dom that use `<slot>` and other custom content.
 *
 * User Result
 * Should return the expected slotted HTML output for all custom elements.
 *
 * User Workspace
 * src/
 *   components/
 *     my-paragraph.js
 *   pages/
 *     index.js
 */

import chai from 'chai';
import { JSDOM } from 'jsdom';
import { renderToString } from '../../../src/wcc.js';

const expect = chai.expect;

describe('Run WCC For ', function() {
  const LABEL = 'Custom Element w/ Declarative Shadow DOM and using children and <slot> content';
  let dom;
  let pageContentsDom;

  before(async function() {
    const { html } = await renderToString(new URL('./src/pages/index.js', import.meta.url));

    dom = new JSDOM(html);

    pageContentsDom = new JSDOM(dom.window.document.querySelectorAll('template[shadowroot="open"]')[0].innerHTML);
  });

  describe(LABEL, function() {
    it('should have one top level <template> with an open shadowroot', function() {
      expect(dom.window.document.querySelectorAll('template[shadowroot="open"]').length).to.equal(1);
      expect(dom.window.document.querySelectorAll('template').length).to.equal(1);
    });

    describe('<my-paragraph> with default <slot> content', function() {
      let paragraphContentsDom;

      before(function() {
        paragraphContentsDom = new JSDOM(pageContentsDom.window.document.querySelectorAll('wcc-paragraph.default template[shadowroot="open"]')[0].innerHTML);
      });

      it('should have one <my-paragraph> tag for the default content', function() {
        expect(paragraphContentsDom.window.document.querySelectorAll('p').length).to.equal(1);
      });

      it('should have one <my-paragraph> tag with the default content', function() {
        expect(paragraphContentsDom.window.document.querySelector('p').textContent).to.equal('My default text');
      });
    });

    describe('<my-paragraph> with custom <slot> content', function() {
      let paragraphContentsDom;
      let paragraphContentsLightDom;
  
      before(function() {
        paragraphContentsDom = new JSDOM(pageContentsDom.window.document.querySelectorAll('wcc-paragraph.custom template[shadowroot="open"]')[0].innerHTML);
        paragraphContentsLightDom = new JSDOM(pageContentsDom.window.document.querySelectorAll('wcc-paragraph.custom')[0].innerHTML);
      });
  
      it('should have one <my-paragraph> tag for the default content', function() {
        expect(paragraphContentsDom.window.document.querySelectorAll('p').length).to.equal(1);
      });
  
      it('should have one <span> tag with the custom content in the light DOM', function() {
        expect(paragraphContentsLightDom.window.document.querySelector('span').textContent).to.equal('Let\'s have some different text!');
      });
    });
  });
});