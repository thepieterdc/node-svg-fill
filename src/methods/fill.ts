import { parse, stringify } from "svgson";

/**
 * Fills the entire image in the given {color}.
 *
 * @param input the input image
 * @param color the color to fill
 */
export default async function fill(input: string, color: string): Promise<string> {
    // Parse the image.
    const svg = await parse(input);

    // Set the fill colour.
    svg.children.forEach(c => {
        c.attributes.fill = color;
    });

    // Convert the image object back to a string.
    return stringify(svg);
}
