/**
 * @jest-environment jsdom
 */

import {registerLocalModule, initHtml} from "@root/lib";

it('dom init test', () => {
  document.body.innerHTML = '<ax-scene>\n' +
      '    <ax-entity>\n' +
      '        <ax-component module="@local/ComponentExample" config=\'{text:"component1 created"}\'></ax-component>\n' +
      '        <ax-component module="@local/ComponentExample" config=\'{text:"component2 created"}\'></ax-component>\n' +
      '    </ax-entity>\n' +
      '</ax-scene>';


  registerLocalModule("@local/ServiceExample", async () => {
    const module = await import("../../demo/page/basic/ServiceExample");
    return {module, classname: module.Factory.name}
  });

  registerLocalModule("@local/ComponentExample", async () => {
    const module = await import("../../demo/page/basic/ComponentExample");
    return {module, classname: module.Factory.name}
  });

  initHtml();

});
