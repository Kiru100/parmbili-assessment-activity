export const PLANT_DATA = {
    potato: { growing_time: 20 , initial_price: 10, selling_price: 15  },
    onion:  { growing_time: 30, initial_price: 15, selling_price: 25  },
    carrot: { growing_time: 45, initial_price: 25, selling_price: 75  },
    corn:   { growing_time: 60, initial_price: 35, selling_price: 100 }
}

export const TILE_EXPANSION_VALUE = [
    { price: 0,   size: 4 },
    { price: 180, size: 5, to_add: 9  },
    { price: 270, size: 6, to_add: 11 },
    { price: 360, size: 7, to_add: 13 },
    { price: 450, size: 8, to_add: 15 },
    { price: 560, size: 9, to_add: 17 },
]       