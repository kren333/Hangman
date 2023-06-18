const utils = require('../backend/utils');

// isInteger.spec.js
test("Sanity check", () => {
    utils.iwannainducesideeffects = jest.fn(options => {options.joopy = 6; return 9;});
    const options = {}
    console.log(utils.iwannainducesideeffects(options));
    console.log(utils.help(options));
    console.log(options);
    expect(utils.iwannainducesideeffects.mock).toBeTruthy();
});