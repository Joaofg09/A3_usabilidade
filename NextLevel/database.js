// Este arquivo funciona como nosso banco de dados simulado.
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
    // Adicione mais jogos aqui se quiser
];