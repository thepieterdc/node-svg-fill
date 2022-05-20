import { parse, stringify } from "svgson";

export default async function fillGradient(input: string, gradients, direction: number): Promise<string> {
    // Parse the image.
    const svg = await parse(input);

    // Fill the children elements with the gradient.
    svg.children.forEach(c => {
        c.attributes.fill = "url(#gradientFill)";
    });

    // Configure the gradients.
    svg.children.unshift({
        name: "defs",
        children: [
            {
                name: "linearGradient",
                attributes: {
                    id: "gradientFill",
                    gradientTransform: `rotate(${direction || 0})`,
                },
                children: gradients.flatMap(({ color, from, to }) => [
                    {
                        name: "stop",
                        attributes: {
                            "offset": `${from * 100.0}%`,
                            "stop-color": color,
                        },
                    },
                    {
                        name: "stop",
                        attributes: {
                            "offset": `${to * 100.0}%`,
                            "stop-color": color,
                        },
                    },
                ]),
            },
        ],
    });

    // Convert the image object back to a string.
    return stringify(svg);
}

