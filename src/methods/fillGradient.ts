import { INode, parse, stringify } from "svgson";

/**
 * Configuration of a gradient.
 */
export interface GradientConfiguration {
    /**
     * The fill color.
     */
    color: string;

    /**
     * The starting point of this gradient step, between [0..1).
     */
    from: number;

    /**
     * The finishing point of this gradient step, between (0..1].
     */
    to: number;
}

/**
 * <defs /> element.
 *
 * @param children the children elements
 * @return the defs element
 */
function defs(...children: INode[]): INode {
    return {
        attributes: {},
        children,
        name: "defs",
        type: "element",
        value: "",
    };
}

/**
 * <linearGradient /> element.
 *
 * @param stops the gradient stops
 * @param direction the direction of the rotation
 * @return the gradient element
 */
function linearGradient(stops: INode[], direction: number): INode {
    return {
        attributes: {
            id: "gradientFill",
            gradientTransform: `rotate(${direction})`,
        },
        children: stops,
        name: "linearGradient",
        type: "element",
        value: "",
    };
}

/**
 * <stop /> element.
 *
 * @param offset the percentage of the offset to stop at between [0..100]
 * @param color the fill color from here
 * @return the stop element
 */
function stop(offset: number, color: string): INode {
    return {
        attributes: {
            "offset": `${offset}%`,
            "stop-color": color,
        },
        children: [],
        name: "stop",
        type: "element",
        value: "",
    };
}

/**
 * Fills the image with the given gradient.
 *
 * @param input the input image
 * @param gradients the gradients to apply
 * @param direction the direction of the gradient in degrees
 * @return the processed image code
 */
export default async function fillGradient(input: string, gradients: GradientConfiguration[], direction?: number): Promise<string> {
    // Parse the image.
    const svg = await parse(input);

    // Fill the children elements with the gradient.
    svg.children.forEach(c => {
        c.attributes.fill = "url(#gradientFill)";
    });

    // Configure the gradients.
    svg.children.unshift(defs(linearGradient(
        gradients.flatMap(({ color, from, to }) => [
            stop(from * 100.0, color),
            stop(to * 100.0, color),
        ]),
        direction || 0,
    )));

    // Convert the image object back to a string.
    return stringify(svg);
}

