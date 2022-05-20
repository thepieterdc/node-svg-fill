const {parse, stringify} = require("svgson");
exports.fillImage = async function (input, gradients, direction) {
    // Parse the image.
    const svg = await parse(input);

    // Add the gradients.
    svg.children.forEach(c => {
        c.attributes.fill = "url(#gradientFill)"
    })
    svg.children.unshift({
        name: "defs",
        children: [
            {
                name: "linearGradient",
                attributes: {
                    id: "gradientFill",
                    gradientTransform: `rotate(${direction})`
                },
                children: gradients.flatMap(({color, from, to}) => [
                    {
                        name: "stop",
                        attributes: {
                            "offset": `${from * 100.0}%`,
                            "stop-color": color
                        }
                    },
                    {
                        name: "stop",
                        attributes: {
                            "offset": `${to * 100.0}%`,
                            "stop-color": color
                        }
                    }
                ])
            }
        ]
    });
    return stringify(svg);
}
