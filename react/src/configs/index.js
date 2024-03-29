//define os dados exclusivos de cada modelo de autoclave
const infos = {
    vdr300: {
        name: 'VDR 3.00',
        states: false,
        csvHead: [
            'modelo',
            'timeStamp',
            'Tensão(V)',
            'Resistência(ºC)',
            'Vaso de Pressão(ºC)',
            'Pressão(Kgf/cm²)',
            'tempo de pressurização',
            'tempo de esterilização',
            'tempo de despressurização',
            'tempo de secagem',
            'tempo de resfriamento',
            'tempo total',
        ],
        scales: [
            {
                title: 'Linhas da escala da temperatura',
                name: 'Temperatura(ºC)',
                min: 0,
                max: 300,
                id: 'temperature',
                position: 'right',
            },
            {
                title: 'Linhas da escala de pressão',
                name: 'Pressão(Kgf/cm²)',
                min: 0,
                max: 2.8,
                id: 'pressure',
                position: 'left',
            },
            {
                title: 'Linhas da escala da tensão',
                name: 'Tensão(V)',
                min: 80,
                max: 250,
                id: 'tension',
                position: 'left',
            },
        ],
        parameters: [
            {
                title: 'Dados da resistência',
                name: 'Resistência(ºC)',
                idScales: 'temperature',
                color: 'green',
                unit: 'ºC',
                min: 0,
                max: 300,
                majorTicks: ['0', '60', '120', '180', '240', '300'],
                highLights: [
                    {
                        from: '0',
                        to: '180',
                        color: 'lightgreen',
                    },
                    {
                        from: '180',
                        to: '240',
                        color: 'yellow',
                    },
                    {
                        from: '240',
                        to: '300',
                        color: 'coral',
                    },
                ],
            },
            {
                title: 'Dados do vaso de pressão',
                name: 'Vaso de Pressão(ºC)',
                idScales: 'temperature',
                color: 'blue',
                unit: 'ºC',
                min: 0,
                max: 150,
                majorTicks: ['0', '30', '60', '90', '120', '150'],
                highLights: [
                    {
                        from: '0',
                        to: '90',
                        color: 'lightgreen',
                    },
                    {
                        from: '90',
                        to: '120',
                        color: 'yellow',
                    },
                    {
                        from: '120',
                        to: '150',
                        color: 'coral',
                    },
                ],
            },
            {
                title: 'Dados da pressão',
                name: 'Pressão(Kgf/cm²)',
                idScales: 'pressure',
                color: 'orange',
                unit: 'Kgf/cm²',
                min: 0,
                max: 2.8,
                majorTicks: ['0', '0.56', '1.12', '1.68', '2.24', '2.8'],
                highLights: [
                    {
                        from: '0',
                        to: '1.68',
                        color: 'lightgreen',
                    },
                    {
                        from: '1.68',
                        to: '2.24',
                        color: 'yellow',
                    },
                    {
                        from: '2.24',
                        to: '2.8',
                        color: 'coral',
                    },
                ],
            },
            {
                title: 'Dados da tensão',
                name: 'Tensão(V)',
                idScales: 'tension',
                color: 'red',
                unit: 'V',
                min: 80,
                max: 250,
                majorTicks: ['80', '114', '148', '182', '216', '250'],
                highLights: [
                    {
                        from: '80',
                        to: '182',
                        color: 'lightgreen',
                    },
                    {
                        from: '182',
                        to: '216',
                        color: 'yellow',
                    },
                    {
                        from: '216',
                        to: '250',
                        color: 'coral',
                    },
                ],
            },
        ],
    },
    vdr301: {
        name: 'VDR 3.01',
        states: false,
        csvHead: [
            'modelo',
            'timeStamp',
            'Tensão(V)',
            'Resistência(ºC)',
            'Vaso de Pressão(ºC)',
            'Pressão(Kgf/cm²)',
            'tempo de pressurização',
            'tempo de esterilização',
            'tempo de despressurização',
            'tempo de secagem',
            'tempo de resfriamento',
            'tempo total',
        ],
        scales: [
            {
                title: 'Linhas da escala da temperatura',
                name: 'Temperatura(ºC)',
                min: 0,
                max: 300,
                id: 'temperature',
                position: 'right',
            },
            {
                title: 'Linhas da escala de pressão',
                name: 'Pressão(Kgf/cm²)',
                min: 0,
                max: 2.8,
                id: 'pressure',
                position: 'left',
            },
            {
                title: 'Linhas da escala da tensão',
                name: 'Tensão(V)',
                min: 80,
                max: 250,
                id: 'tension',
                position: 'left',
            },
        ],
        parameters: [
            {
                title: 'Dados da resistência',
                name: 'Resistência(ºC)',
                idScales: 'temperature',
                color: 'green',
                unit: 'ºC',
                min: 0,
                max: 300,
                majorTicks: ['0', '60', '120', '180', '240', '300'],
                highLights: [
                    {
                        from: '0',
                        to: '180',
                        color: 'lightgreen',
                    },
                    {
                        from: '180',
                        to: '240',
                        color: 'yellow',
                    },
                    {
                        from: '240',
                        to: '300',
                        color: 'coral',
                    },
                ],
            },
            {
                title: 'Dados da pressão',
                name: 'Pressão(Kgf/cm²)',
                idScales: 'pressure',
                color: 'orange',
                unit: 'Kgf/cm²',
                min: 0,
                max: 2.8,
                majorTicks: ['0', '0.56', '1.12', '1.68', '2.24', '2.8'],
                highLights: [
                    {
                        from: '0',
                        to: '1.68',
                        color: 'lightgreen',
                    },
                    {
                        from: '1.68',
                        to: '2.24',
                        color: 'yellow',
                    },
                    {
                        from: '2.24',
                        to: '2.8',
                        color: 'coral',
                    },
                ],
            },
            {
                title: 'Dados da tensão',
                name: 'Tensão(V)',
                idScales: 'tension',
                color: 'red',
                unit: 'V',
                min: 80,
                max: 250,
                majorTicks: ['80', '114', '148', '182', '216', '250'],
                highLights: [
                    {
                        from: '80',
                        to: '182',
                        color: 'lightgreen',
                    },
                    {
                        from: '182',
                        to: '216',
                        color: 'yellow',
                    },
                    {
                        from: '216',
                        to: '250',
                        color: 'coral',
                    },
                ],
            },
        ],
    },
};
export default infos;
