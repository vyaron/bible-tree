
export const personService = {
    getRoot,
    getPersonsByLevel,
    getPersonById
}


function getRoot() {
    return p10
}

function getPersonsByLevel(level) {
    const persons = []
    if (level === 0) return [p10]
    for (const person of Object.values(personById)) {
        // Extract the level from the person's ID (e.g., p203 -> level 2, p1013 -> level 10)
        const personLevel = parseInt(person.id.substring(1, person.id.length - 2))
        if (personLevel === level) {
            persons.push(person)
        }
    }
    return persons
}

function getPersonById(id) {
    return personById[id]
}

const p10 = {
    id: 'p10',
    name: 'God',
    spouseIds: [],
    childrenIds: ['p101', 'p102'],
    parentIds: []
}

const p101 = {
    id: 'p101',
    name: 'Adam',
    spouseIds: ['p102'],
    childrenIds: ['p203', 'p204', 'p205'],
    parentIds: ['p10']
}

const p102 = {
    id: 'p102',
    name: 'Eve',
    spouseIds: ['p101'],
    childrenIds: ['p203', 'p204', 'p205'],
    parentIds: ['p10']
}

const p203 = {
    id: 'p203',
    name: 'Cain',
    childrenIds: [],
    parentIds: ['p101', 'p102']
}

const p204 = {
    id: 'p204',
    name: 'Abel',
    childrenIds: [],
    parentIds: ['p101', 'p102']
}

const p205 = {
    id: 'p205',
    name: 'Seth',
    childrenIds: ['p306'],
    parentIds: ['p101', 'p102']
}

const p306 = {
    id: 'p306',
    name: 'Enosh',
    childrenIds: ['p407'],
    parentIds: ['p205']
}

const p407 = {
    id: 'p407',
    name: 'Kenan',
    childrenIds: ['p508'],
    parentIds: ['p306']
}

const p508 = {
    id: 'p508',
    name: 'Mahalalel',
    childrenIds: ['p609'],
    parentIds: ['p407']
}

const p609 = {
    id: 'p609',
    name: 'Jared',
    childrenIds: ['p710'],
    parentIds: ['p508']
}

const p710 = {
    id: 'p710',
    name: 'Enoch',
    childrenIds: ['p811'],
    parentIds: ['p609']
}

const p811 = {
    id: 'p811',
    name: 'Methuselah',
    childrenIds: ['p912'],
    parentIds: ['p710']
}

const p912 = {
    id: 'p912',
    name: 'Lamech',
    childrenIds: ['p1013'],
    parentIds: ['p811']
}

const p1013 = {
    id: 'p1013',
    name: 'Noah',
    spouseIds: ['p1014'],
    childrenIds: ['p1115', 'p1116', 'p1117'],
    parentIds: ['p912']
}

const p1014 = {
    id: 'p1014',
    name: "Noah's Wife",
    spouseIds: ['p1013'],
    childrenIds: ['p1115', 'p1116', 'p1117'],
    parentIds: []
}

const p1115 = {
    id: 'p1115',
    name: 'Shem',
    childrenIds: ['p1218'],
    parentIds: ['p1013', 'p1014']
}

const p1116 = {
    id: 'p1116',
    name: 'Ham',
    childrenIds: [],
    parentIds: ['p1013', 'p1014']
}

const p1117 = {
    id: 'p1117',
    name: 'Japheth',
    childrenIds: [],
    parentIds: ['p1013', 'p1014']
}

const p1218 = {
    id: 'p1218',
    name: 'Arphaxad',
    childrenIds: ['p1319'],
    parentIds: ['p1115']
}

const p1319 = {
    id: 'p1319',
    name: 'Shelah',
    childrenIds: ['p1420'],
    parentIds: ['p1218']
}

const p1420 = {
    id: 'p1420',
    name: 'Eber',
    childrenIds: ['p1521'],
    parentIds: ['p1319']
}

const p1521 = {
    id: 'p1521',
    name: 'Peleg',
    childrenIds: ['p1622'],
    parentIds: ['p1420']
}

const p1622 = {
    id: 'p1622',
    name: 'Reu',
    childrenIds: ['p1723'],
    parentIds: ['p1521']
}

const p1723 = {
    id: 'p1723',
    name: 'Serug',
    childrenIds: ['p1824'],
    parentIds: ['p1622']
}

const p1824 = {
    id: 'p1824',
    name: 'Nahor',
    childrenIds: ['p1925'],
    parentIds: ['p1723']
}

const p1925 = {
    id: 'p1925',
    name: 'Terah',
    childrenIds: ['p2026', 'p2027', 'p2028'],
    parentIds: ['p1824']
}

const p2026 = {
    id: 'p2026',
    name: 'Abraham',
    spouseIds: ['p2029'],
    childrenIds: ['p2130', 'p2131'],
    parentIds: ['p1925']
}

const p2027 = {
    id: 'p2027',
    name: 'Nahor II',
    childrenIds: [],
    parentIds: ['p1925']
}

const p2028 = {
    id: 'p2028',
    name: 'Haran',
    childrenIds: [],
    parentIds: ['p1925']
}

const p2029 = {
    id: 'p2029',
    name: 'Sarah',
    spouseIds: ['p2026'],
    childrenIds: ['p2131'],
    parentIds: []
}

const p2130 = {
    id: 'p2130',
    name: 'Ishmael',
    childrenIds: [],
    parentIds: ['p2026']
}

const p2131 = {
    id: 'p2131',
    name: 'Isaac',
    spouseIds: ['p2132'],
    childrenIds: ['p2233', 'p2234'],
    parentIds: ['p2026', 'p2029']
}

const p2132 = {
    id: 'p2132',
    name: 'Rebekah',
    spouseIds: ['p2131'],
    childrenIds: ['p2233', 'p2234'],
    parentIds: []
}

const p2233 = {
    id: 'p2233',
    name: 'Esau',
    childrenIds: [],
    parentIds: ['p2131', 'p2132']
}

const p2234 = {
    id: 'p2234',
    name: 'Jacob',
    spouseIds: ['p2235', 'p2236', 'p2237', 'p2238'],
    childrenIds: ['p2337', 'p2338', 'p2339', 'p2340', 'p2341', 'p2342', 'p2343', 'p2344', 'p2345', 'p2346', 'p2347', 'p2348'],
    parentIds: ['p2131', 'p2132']
}

const p2235 = {
    id: 'p2235',
    name: 'Leah',
    spouseIds: ['p2234'],
    childrenIds: ['p2337', 'p2338', 'p2339', 'p2342', 'p2345', 'p2347'],
    parentIds: []
}

const p2236 = {
    id: 'p2236',
    name: 'Rachel',
    spouseIds: ['p2234'],
    childrenIds: ['p2346', 'p2348'],
    parentIds: []
}

const p2237 = {
    id: 'p2237',
    name: 'Bilhah',
    spouseIds: ['p2234'],
    childrenIds: ['p2341', 'p2342'],
    parentIds: []
}

const p2238 = {
    id: 'p2238',
    name: 'Zilpah',
    spouseIds: ['p2234'],
    childrenIds: ['p2343', 'p2344'],
    parentIds: []
}

const p2337 = {
    id: 'p2337',
    name: 'Reuben',
    childrenIds: [],
    parentIds: ['p2234', 'p2235']
}

const p2338 = {
    id: 'p2338',
    name: 'Simeon',
    childrenIds: [],
    parentIds: ['p2234', 'p2235']
}

const p2339 = {
    id: 'p2339',
    name: 'Levi',
    childrenIds: ['p2449'],
    parentIds: ['p2234', 'p2235']
}

const p2340 = {
    id: 'p2340',
    name: 'Judah',
    childrenIds: [],
    parentIds: ['p2234', 'p2235']
}

const p2341 = {
    id: 'p2341',
    name: 'Dan',
    childrenIds: [],
    parentIds: ['p2234', 'p2237']
}

const p2342 = {
    id: 'p2342',
    name: 'Naphtali',
    childrenIds: [],
    parentIds: ['p2234', 'p2237']
}

const p2343 = {
    id: 'p2343',
    name: 'Gad',
    childrenIds: [],
    parentIds: ['p2234', 'p2238']
}

const p2344 = {
    id: 'p2344',
    name: 'Asher',
    childrenIds: [],
    parentIds: ['p2234', 'p2238']
}

const p2345 = {
    id: 'p2345',
    name: 'Issachar',
    childrenIds: [],
    parentIds: ['p2234', 'p2235']
}

const p2346 = {
    id: 'p2346',
    name: 'Joseph',
    childrenIds: [],
    parentIds: ['p2234', 'p2236']
}

const p2347 = {
    id: 'p2347',
    name: 'Zebulun',
    childrenIds: [],
    parentIds: ['p2234', 'p2235']
}

const p2348 = {
    id: 'p2348',
    name: 'Benjamin',
    childrenIds: [],
    parentIds: ['p2234', 'p2236']
}

const p2449 = {
    id: 'p2449',
    name: 'Kohath',
    childrenIds: ['p2550'],
    parentIds: ['p2339']
}

const p2550 = {
    id: 'p2550',
    name: 'Amram',
    spouseIds: ['p2551'],
    childrenIds: ['p2652', 'p2653', 'p2654'],
    parentIds: ['p2449']
}

const p2551 = {
    id: 'p2551',
    name: 'Jochebed',
    spouseIds: ['p2550'],
    childrenIds: ['p2652', 'p2653', 'p2654'],
    parentIds: []
}

const p2652 = {
    id: 'p2652',
    name: 'Miriam',
    childrenIds: [],
    parentIds: ['p2550', 'p2551']
}

const p2653 = {
    id: 'p2653',
    name: 'Aaron',
    childrenIds: [],
    parentIds: ['p2550', 'p2551']
}

const p2654 = {
    id: 'p2654',
    name: 'Moses',
    spouseIds: ['p2655'],
    childrenIds: [],
    parentIds: ['p2550', 'p2551']
}

const p2655 = {
    id: 'p2655',
    name: 'Zipporah',
    spouseIds: ['p2654'],
    childrenIds: [],
    parentIds: []
}

const personById = {
    p10,
    p101,
    p102,
    p203,
    p204,
    p205,
    p306,
    p407,
    p508,
    p609,
    p710,
    p811,
    p912,
    p1013,
    p1014,
    p1115,
    p1116,
    p1117,
    p1218,
    p1319,
    p1420,
    p1521,
    p1622,
    p1723,
    p1824,
    p1925,
    p2026,
    p2027,
    p2028,
    p2029,
    p2130,
    p2131,
    p2132,
    p2233,
    p2234,
    p2235,
    p2236,
    p2237,
    p2238,
    p2337,
    p2338,
    p2339,
    p2340,
    p2341,
    p2342,
    p2343,
    p2344,
    p2345,
    p2346,
    p2347,
    p2348,
    p2449,
    p2550,
    p2551,
    p2652,
    p2653,
    p2654,
    p2655
}


