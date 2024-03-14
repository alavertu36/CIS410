let food =
{
    id: "0001",
    type: "donut",
    name: "Cake",
    ppu: 0.55,
    base:
    {
        batters:
            [
                { id: "1001", type: "Regular" },
                { id: "1003", type: "Blueberry" },
                { id: "1004", type: "Devil's Food" }
            ]
    },
    topping:
        [
            { id: "5001", type: "None" },
            { id: "5002", type: "Glazed" },
            { id: "5005", type: "Sugar" },
            { id: "5007", type: "Powdered Sugar" },
        ]
}

console.log(food.base.batters[1].type);