import { expect, fixture, html, unsafeStatic } from '@open-wc/testing';

import { DxButton } from './button';

describe('DxButon <dx-button>', function () {
  let component: DxButton;

  beforeEach(async () => {
    component = await createTestComponent();
  });

  afterEach(async () => {
    component.remove();
  });

  describe('Basic', () => {
    it('Render button correctly', async function () {
      await expect(component).shadowDom.to.be.accessible();
      await expect(component.disabled).to.equal(undefined);
    });
  });

  describe('Variant', () => {
    it('Render default', async function () {
      // TODO:
    });
    it('Render outline', async function () {
      // TODO:
    });
    it('Render disabled', async function () {
      // TODO:
    });
  });

  const createTestComponent = (template = '<dx-button></dx-button>') => {
    return fixture(html`${unsafeStatic(template)}`);
  };
});
