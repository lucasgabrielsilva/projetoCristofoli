const model = {
    scale: [
        {
            name: 'um',
            a: 0,
            b: 1,
        },
        {
            name: 'dois',
            a: 0,
            b: 1,
        },
    ],
    parameters: [
        {
            a: 0,
            b: 1,
        },
        {
            a: 0,
            b: 1,
        },
    ],
};

const teste = {};

model.scale.forEach((scale) => {
    teste[scale.name] = scale;
});

console.log(teste);
