const {keyboard, Key} = require("@nut-tree/nut-js");

const _empty = () => {};

async function clearItermBuffer() {
  // console.log("Clearing buffer ...");
  await keyboard.pressKey(Key.LeftControl, Key.LeftShift, Key.L);
  await keyboard.releaseKey(Key.LeftControl, Key.LeftShift, Key.L);
  // console.log("Clearing scrollback buffer ...");
  await keyboard.pressKey(Key.LeftControl, Key.LeftShift, Key.K);
  await keyboard.releaseKey(Key.LeftControl, Key.LeftShift, Key.K);
  // console.log("Done!");
}

clearItermBuffer().then(_empty).catch(_empty);
