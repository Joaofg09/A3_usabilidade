
const gamesDB = [
    {
        id: 1,
        name: 'Red Dead Redemption II',
        price: 59.99,
        description: 'Estados Unidos, 1899. Arthur Morgan e a gangue Van der Linde são forçados a fugir. Com agentes federais e os melhores caçadores de recompensas no seu encalço, a gangue precisa roubar, assaltar e lutar para sobreviver no coração da América. Com o fim da era do Velho Oeste se aproximando, Arthur deve fazer uma escolha entre seus próprios ideais e a lealdade à gangue que o criou.',
        heroImage: 'https://via.placeholder.com/800x300/B22222/FFFFFF?text=Red+Dead+Redemption+II',
        system_reqs: {
            min: {
                os: 'Windows 10 - 64 bit',
                processor: 'Intel Core i5-2500K / AMD FX-6300',
                memory: '8 GB RAM',
                graphics: 'Nvidia GeForce GTX 770 2GB / AMD Radeon R9 280 3GB',
                storage: '150 GB de espaço disponível'
            },
            rec: {
                os: 'Windows 10 - 64 bit',
                processor: 'Intel Core i7-4770K / AMD Ryzen 5 1500X',
                memory: '12 GB RAM',
                graphics: 'Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 4GB',
                storage: '150 GB de espaço disponível'
            }
        },
        details: {
            developer: 'Rockstar Games',
            publisher: 'Rockstar Games',
            releaseDate: '26 de outubro de 2018'
        },
        reviews: [
            { user: 'User123', rating: 5, comment: 'Achei o jogo bastante divertido com o gráfico magnífico!', likes: 12, dislikes: 1 },
            { user: 'User789', rating: 2, comment: 'Não gostei muito da dinâmica do jogo. Missões muito longas.', likes: 2, dislikes: 8 }
        ]
    },
    {
        id: 2,
        name: 'The Legend of Zelda: Breath of the Wild',
        price: 59.99,
        description: 'Viaje por vastos campos, florestas e picos de montanhas enquanto descobre o que aconteceu com o reino de Hyrule nesta deslumbrante aventura a céu aberto. E agora, no Nintendo Switch, sua jornada é mais livre e aberta do que nunca.',
        heroImage: 'https://via.placeholder.com/800x300/228CB2/FFFFFF?text=Zelda',
        system_reqs: { min: { os: 'Nintendo Switch' }, rec: { os: 'Nintendo Switch' } },
        details: { developer: 'Nintendo', publisher: 'Nintendo', releaseDate: '3 de março de 2017' },
        reviews: [
            { user: 'ZeldaFan', rating: 5, comment: 'Obra de arte, melhor jogo que já joguei!', likes: 25, dislikes: 0 }
        ]
    },
    {
        id: 3,
        name: 'Call of Duty: Modern Warfare',
        price: 59.99, 
        description: 'Experimente a Campanha solo brutal e dramática que te coloca no centro de um conflito que afeta o equilíbrio do poder mundial. Lute ao lado de Operadores de Forças Especiais em uma variedade de operações secretas ao redor do globo, ou mergulhe no multijogador com a jogabilidade tática característica da série.',
        heroImage: 'https://via.placeholder.com/800x300/4F4F4F/FFFFFF?text=Call+of+Duty+Modern+Warfare', // Imagem em tom cinza militar
        system_reqs: {
            min: {
                os: 'Windows 10 64-Bit',
                processor: 'Intel Core i3-4340 ou AMD FX-6300',
                memory: '8 GB de RAM',
                graphics: 'NVIDIA GeForce GTX 670 / GTX 1650 ou Radeon HD 7950',
                storage: '175 GB de espaço disponível'
            },
            rec: {
                os: 'Windows 10 64-Bit',
                processor: 'Intel Core i5-2500K ou AMD Ryzen R5 1600X',
                memory: '12 GB de RAM',
                graphics: 'NVIDIA GeForce GTX 970 / GTX 1660 ou Radeon R9 390',
                storage: '175 GB de espaço disponível'
            }
        },
        details: {
            developer: 'Infinity Ward',
            publisher: 'Activision',
            releaseDate: '25 de outubro de 2019'
        },
        reviews: [
            { user: 'CoDFan', rating: 4, comment: 'O Multijogador é viciante, mas a campanha é muito curta.', likes: 45, dislikes: 5 }
        ]
    }

];