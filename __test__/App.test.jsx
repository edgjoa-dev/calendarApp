import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { App }  from "../src/App";

/* eslint-disable no-undef */
describe('Test in App component', () => {
    beforeEach(() => { render(<App />) })

    test('should ', () => {
        screen.debug()

    });

 })