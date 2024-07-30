module.exports = {
    databaseConnection: require('./connect'),
    MarketRepository: require('./repository.js/market-repository'),
    NursaryRepository: require('./repository.js/nursery-repository'),
    LaboratoryRepository: require('./repository.js/laboratory-repository'),
    marketModel: require('./models.js/market-models'),
    nursaryModel: require('./models.js/nursery-models'),
    laboratoryModel: require('./models.js/laboratory-models')
}

