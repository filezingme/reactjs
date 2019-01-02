const uuidv4 = require('uuid/v4');

let items = [
    {
    	id: uuidv4(),
        name: "Abc is invoked immediately before a component is unmounted and ",
        level: 0, //0 Smaill, 1 Medium, 2 High
    },
    {
    	id: uuidv4(),
        name: "Def is invoked immediately before a component is unmounted and ",
        level: 1, //0 Smaill, 1 Medium, 2 High
    },
    {
    	id: uuidv4(),
        name: "Ghi is invoked immediately before a component is unmounted and ",
        level: 2, //0 Smaill, 1 Medium, 2 High
    },
    {
    	id: uuidv4(),
        name: "Ghi is invoked immediately before a component is unmounted and ",
        level: 0, //0 Smaill, 1 Medium, 2 High
    }
]

export default items;