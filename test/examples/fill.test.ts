import { readFile } from "fs/promises";
import { parse, stringify } from "svgson";
import { fill } from "../../src/methods";

describe("test fill", () => {
    it("should match the example", async () => {
        // Get the input and output image.
        const input = await readFile("examples/fill/input.svg", { encoding: "utf-8" });
        const output = await readFile("examples/fill/output.svg", { encoding: "utf-8" });

        // Run the function and validate that it is correct.
        const result = await fill(input, "#FFFF00");
        expect(result).toBe(stringify(await parse(output)));
    });
});
