import { readFile } from "fs/promises";
import { parse, stringify } from "svgson";
import { fillGradient } from "../../src/methods";

describe("test gradient", () => {
    it("should match the example (A)", async () => {
        // Get the input and output image.
        const input = await readFile("examples/gradient/input-a.svg", { encoding: "utf-8" });
        const output = await readFile("examples/gradient/output-a.svg", { encoding: "utf-8" });

        // Run the function and validate that it is correct.
        const result = await fillGradient(input, [{
            "color": "#FF0000",
            "from": 0,
            "to": 0.20,
        }, {
            "color": "#0000FF",
            "from": 0.70,
            "to": 1,
        }]);
        expect(result).toBe(stringify(await parse(output)));
    });

    it("should match the example (M)", async () => {
        // Get the input and output image.
        const input = await readFile("examples/gradient/input-m.svg", { encoding: "utf-8" });
        const output = await readFile("examples/gradient/output-m.svg", { encoding: "utf-8" });

        // Run the function and validate that it is correct.
        const result = await fillGradient(input, [{
            "color": "#FF00FF",
            "from": 0,
            "to": 0.50,
        }, {
            "color": "#A0F0F0",
            "from": 0.50,
            "to": 1,
        }], 90);
        expect(result).toBe(stringify(await parse(output)));
    });
});
