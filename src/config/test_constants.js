const TIMEOUT_SPEED = {
    fastest: 200,
    faster: 500,
    normal: 1000,
    slow: 2000,
    slowest: 3000,
    custom: 150000
};

const ASSERT_DURATION = {
    fastest: 50,
    faster: 2000,
    default: 30000,
    slowest: 61000
}

const AUTO_HARVEST = {
    start_index: 0,
    end_index: 2,
}

exports.TIMEOUT_SPEED = TIMEOUT_SPEED;
exports.ASSERT_DURATION = ASSERT_DURATION;
exports.AUTO_HARVEST = AUTO_HARVEST;