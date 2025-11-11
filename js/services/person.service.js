
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
    nameHe: 'אלוהים',
    spouseIds: [],
    childrenIds: ['p101', 'p102'],
    parentIds: []
}

const p101 = {
    id: 'p101',
    name: 'Adam',
    nameHe: 'אדם',
    spouseIds: ['p102'],
    childrenIds: ['p203', 'p204', 'p205'],
    parentIds: ['p10']
}

const p102 = {
    id: 'p102',
    name: 'Eve',
    nameHe: 'חוה',
    spouseIds: ['p101'],
    childrenIds: ['p203', 'p204', 'p205'],
    parentIds: ['p10']
}

const p203 = {
    id: 'p203',
    name: 'Cain',
    nameHe: 'קין',
    childrenIds: [],
    parentIds: ['p101', 'p102']
}

const p204 = {
    id: 'p204',
    name: 'Abel',
    nameHe: 'הבל',
    childrenIds: [],
    parentIds: ['p101', 'p102']
}

const p205 = {
    id: 'p205',
    name: 'Seth',
    nameHe: 'שת',
    childrenIds: ['p306'],
    parentIds: ['p101', 'p102']
}

const p306 = {
    id: 'p306',
    name: 'Enosh',
    nameHe: 'אנוש',
    childrenIds: ['p407'],
    parentIds: ['p205']
}

const p407 = {
    id: 'p407',
    name: 'Kenan',
    nameHe: 'קינן',
    childrenIds: ['p508'],
    parentIds: ['p306']
}

const p508 = {
    id: 'p508',
    name: 'Mahalalel',
    nameHe: 'מהללאל',
    childrenIds: ['p609'],
    parentIds: ['p407']
}

const p609 = {
    id: 'p609',
    name: 'Jared',
    nameHe: 'ירד',
    childrenIds: ['p710'],
    parentIds: ['p508']
}

const p710 = {
    id: 'p710',
    name: 'Enoch',
    nameHe: 'חנוך',
    childrenIds: ['p811'],
    parentIds: ['p609']
}

const p811 = {
    id: 'p811',
    name: 'Methuselah',
    nameHe: 'מתושלח',
    childrenIds: ['p912'],
    parentIds: ['p710']
}

const p912 = {
    id: 'p912',
    name: 'Lamech',
    nameHe: 'למך',
    childrenIds: ['p1013'],
    parentIds: ['p811']
}

const p1013 = {
    id: 'p1013',
    name: 'Noah',
    nameHe: 'נח',
    spouseIds: ['p1014'],
    childrenIds: ['p1115', 'p1116', 'p1117'],
    parentIds: ['p912']
}

const p1014 = {
    id: 'p1014',
    name: "Noah's Wife",
    nameHe: 'אשת נח',
    spouseIds: ['p1013'],
    childrenIds: ['p1115', 'p1116', 'p1117'],
    parentIds: []
}

const p1115 = {
    id: 'p1115',
    name: 'Shem',
    nameHe: 'שם',
    childrenIds: ['p1218'],
    parentIds: ['p1013', 'p1014']
}

const p1116 = {
    id: 'p1116',
    name: 'Ham',
    nameHe: 'חם',
    childrenIds: [],
    parentIds: ['p1013', 'p1014']
}

const p1117 = {
    id: 'p1117',
    name: 'Japheth',
    nameHe: 'יפת',
    childrenIds: [],
    parentIds: ['p1013', 'p1014']
}

const p1218 = {
    id: 'p1218',
    name: 'Arphaxad',
    nameHe: 'ארפכשד',
    childrenIds: ['p1319'],
    parentIds: ['p1115']
}

const p1319 = {
    id: 'p1319',
    name: 'Shelah',
    nameHe: 'שלח',
    childrenIds: ['p1420'],
    parentIds: ['p1218']
}

const p1420 = {
    id: 'p1420',
    name: 'Eber',
    nameHe: 'עבר',
    childrenIds: ['p1521'],
    parentIds: ['p1319']
}

const p1521 = {
    id: 'p1521',
    name: 'Peleg',
    nameHe: 'פלג',
    childrenIds: ['p1622'],
    parentIds: ['p1420']
}

const p1622 = {
    id: 'p1622',
    name: 'Reu',
    nameHe: 'רעו',
    childrenIds: ['p1723'],
    parentIds: ['p1521']
}

const p1723 = {
    id: 'p1723',
    name: 'Serug',
    nameHe: 'שרוג',
    childrenIds: ['p1824'],
    parentIds: ['p1622']
}

const p1824 = {
    id: 'p1824',
    name: 'Nahor',
    nameHe: 'נחור',
    childrenIds: ['p1925'],
    parentIds: ['p1723']
}

const p1925 = {
    id: 'p1925',
    name: 'Terah',
    nameHe: 'תרח',
    childrenIds: ['p2026', 'p2027', 'p2028'],
    parentIds: ['p1824']
}

const p2026 = {
    id: 'p2026',
    name: 'Abraham',
    nameHe: 'אברהם',
    spouseIds: ['p2029'],
    childrenIds: ['p2130', 'p2131'],
    parentIds: ['p1925']
}

const p2027 = {
    id: 'p2027',
    name: 'Nahor II',
    nameHe: 'נחור',
    childrenIds: [],
    parentIds: ['p1925']
}

const p2028 = {
    id: 'p2028',
    name: 'Haran',
    nameHe: 'הרן',
    childrenIds: [],
    parentIds: ['p1925']
}

const p2029 = {
    id: 'p2029',
    name: 'Sarah',
    nameHe: 'שרה',
    spouseIds: ['p2026'],
    childrenIds: ['p2131'],
    parentIds: []
}

const p2130 = {
    id: 'p2130',
    name: 'Ishmael',
    nameHe: 'ישמעאל',
    childrenIds: [],
    parentIds: ['p2026']
}

const p2131 = {
    id: 'p2131',
    name: 'Isaac',
    nameHe: 'יצחק',
    spouseIds: ['p2132'],
    childrenIds: ['p2233', 'p2234'],
    parentIds: ['p2026', 'p2029']
}

const p2132 = {
    id: 'p2132',
    name: 'Rebekah',
    nameHe: 'רבקה',
    spouseIds: ['p2131'],
    childrenIds: ['p2233', 'p2234'],
    parentIds: []
}

const p2233 = {
    id: 'p2233',
    name: 'Esau',
    nameHe: 'עשו',
    childrenIds: [],
    parentIds: ['p2131', 'p2132']
}

const p2234 = {
    id: 'p2234',
    name: 'Jacob',
    nameHe: 'יעקב',
    spouseIds: ['p2235', 'p2236', 'p2237', 'p2238'],
    childrenIds: ['p2337', 'p2338', 'p2339', 'p2340', 'p2341', 'p2342', 'p2343', 'p2344', 'p2345', 'p2346', 'p2347', 'p2348'],
    parentIds: ['p2131', 'p2132']
}

const p2235 = {
    id: 'p2235',
    name: 'Leah',
    nameHe: 'לאה',
    spouseIds: ['p2234'],
    childrenIds: ['p2337', 'p2338', 'p2339', 'p2342', 'p2345', 'p2347'],
    parentIds: []
}

const p2236 = {
    id: 'p2236',
    name: 'Rachel',
    nameHe: 'רחל',
    spouseIds: ['p2234'],
    childrenIds: ['p2346', 'p2348'],
    parentIds: []
}

const p2237 = {
    id: 'p2237',
    name: 'Bilhah',
    nameHe: 'בלהה',
    spouseIds: ['p2234'],
    childrenIds: ['p2341', 'p2342'],
    parentIds: []
}

const p2238 = {
    id: 'p2238',
    name: 'Zilpah',
    nameHe: 'זלפה',
    spouseIds: ['p2234'],
    childrenIds: ['p2343', 'p2344'],
    parentIds: []
}

const p2337 = {
    id: 'p2337',
    name: 'Reuben',
    nameHe: 'ראובן',
    childrenIds: [],
    parentIds: ['p2234', 'p2235']
}

const p2338 = {
    id: 'p2338',
    name: 'Simeon',
    nameHe: 'שמעון',
    childrenIds: [],
    parentIds: ['p2234', 'p2235']
}

const p2339 = {
    id: 'p2339',
    name: 'Levi',
    nameHe: 'לוי',
    childrenIds: ['p2449'],
    parentIds: ['p2234', 'p2235']
}

const p2340 = {
    id: 'p2340',
    name: 'Judah',
    nameHe: 'יהודה',
    spouseIds: ['p2349'],
    childrenIds: ['p2456'],
    parentIds: ['p2234', 'p2235']
}

const p2341 = {
    id: 'p2341',
    name: 'Dan',
    nameHe: 'דן',
    childrenIds: [],
    parentIds: ['p2234', 'p2237']
}

const p2342 = {
    id: 'p2342',
    name: 'Naphtali',
    nameHe: 'נפתלי',
    childrenIds: [],
    parentIds: ['p2234', 'p2237']
}

const p2343 = {
    id: 'p2343',
    name: 'Gad',
    nameHe: 'גד',
    childrenIds: [],
    parentIds: ['p2234', 'p2238']
}

const p2344 = {
    id: 'p2344',
    name: 'Asher',
    nameHe: 'אשר',
    childrenIds: [],
    parentIds: ['p2234', 'p2238']
}

const p2345 = {
    id: 'p2345',
    name: 'Issachar',
    nameHe: 'יששכר',
    childrenIds: [],
    parentIds: ['p2234', 'p2235']
}

const p2346 = {
    id: 'p2346',
    name: 'Joseph',
    nameHe: 'יוסף',
    childrenIds: [],
    parentIds: ['p2234', 'p2236']
}

const p2347 = {
    id: 'p2347',
    name: 'Zebulun',
    nameHe: 'זבולון',
    childrenIds: [],
    parentIds: ['p2234', 'p2235']
}

const p2348 = {
    id: 'p2348',
    name: 'Benjamin',
    nameHe: 'בנימין',
    childrenIds: [],
    parentIds: ['p2234', 'p2236']
}

const p2349 = {
    id: 'p2349',
    name: 'Tamar',
    nameHe: 'תמר',
    spouseIds: ['p2340'],
    childrenIds: ['p2456'],
    parentIds: []
}

const p2456 = {
    id: 'p2456',
    name: 'Perez',
    nameHe: 'פרץ',
    childrenIds: ['p2557'],
    parentIds: ['p2340', 'p2349']
}

const p2557 = {
    id: 'p2557',
    name: 'Hezron',
    nameHe: 'חצרון',
    childrenIds: ['p2658'],
    parentIds: ['p2456']
}

const p2658 = {
    id: 'p2658',
    name: 'Ram',
    nameHe: 'רם',
    childrenIds: ['p2759'],
    parentIds: ['p2557']
}

const p2759 = {
    id: 'p2759',
    name: 'Amminadab',
    nameHe: 'עמינדב',
    childrenIds: ['p2860'],
    parentIds: ['p2658']
}

const p2860 = {
    id: 'p2860',
    name: 'Nahshon',
    nameHe: 'נחשון',
    childrenIds: ['p2961'],
    parentIds: ['p2759']
}

const p2961 = {
    id: 'p2961',
    name: 'Salmon',
    nameHe: 'שלמון',
    spouseIds: ['p2962'],
    childrenIds: ['p3062'],
    parentIds: ['p2860']
}

const p2962 = {
    id: 'p2962',
    name: 'Rahab',
    nameHe: 'רחב',
    spouseIds: ['p2961'],
    childrenIds: ['p3062'],
    parentIds: []
}

const p3062 = {
    id: 'p3062',
    name: 'Boaz',
    nameHe: 'בועז',
    spouseIds: ['p3063'],
    childrenIds: ['p3163'],
    parentIds: ['p2961', 'p2962']
}

const p3063 = {
    id: 'p3063',
    name: 'Ruth',
    nameHe: 'רות',
    spouseIds: ['p3062'],
    childrenIds: ['p3163'],
    parentIds: []
}

const p3163 = {
    id: 'p3163',
    name: 'Obed',
    nameHe: 'עובד',
    childrenIds: ['p3264'],
    parentIds: ['p3062', 'p3063']
}

const p3264 = {
    id: 'p3264',
    name: 'Jesse',
    nameHe: 'ישי',
    childrenIds: ['p3365'],
    parentIds: ['p3163']
}

const p3365 = {
    id: 'p3365',
    name: 'David',
    nameHe: 'דוד',
    spouseIds: ['p3366', 'p3367', 'p3368', 'p3369', 'p3370', 'p3371', 'p3372'],
    childrenIds: ['p3466', 'p3467', 'p3468', 'p3469', 'p3470', 'p3471'],
    parentIds: ['p3264']
}

const p3366 = {
    id: 'p3366',
    name: 'Michal',
    nameHe: 'מיכל',
    spouseIds: ['p3365'],
    childrenIds: [],
    parentIds: []
}

const p3367 = {
    id: 'p3367',
    name: 'Ahinoam',
    nameHe: 'אחינעם',
    spouseIds: ['p3365'],
    childrenIds: ['p3466'],
    parentIds: []
}

const p3368 = {
    id: 'p3368',
    name: 'Abigail',
    nameHe: 'אביגיל',
    spouseIds: ['p3365'],
    childrenIds: ['p3467'],
    parentIds: []
}

const p3369 = {
    id: 'p3369',
    name: 'Maacah',
    nameHe: 'מעכה',
    spouseIds: ['p3365'],
    childrenIds: ['p3468'],
    parentIds: []
}

const p3370 = {
    id: 'p3370',
    name: 'Haggith',
    nameHe: 'חגית',
    spouseIds: ['p3365'],
    childrenIds: ['p3469'],
    parentIds: []
}

const p3371 = {
    id: 'p3371',
    name: 'Abital',
    nameHe: 'אביטל',
    spouseIds: ['p3365'],
    childrenIds: [],
    parentIds: []
}

const p3372 = {
    id: 'p3372',
    name: 'Bathsheba',
    nameHe: 'בת שבע',
    spouseIds: ['p3365'],
    childrenIds: ['p3470', 'p3471'],
    parentIds: []
}

const p3466 = {
    id: 'p3466',
    name: 'Amnon',
    nameHe: 'אמנון',
    childrenIds: [],
    parentIds: ['p3365', 'p3367']
}

const p3467 = {
    id: 'p3467',
    name: 'Chileab',
    nameHe: 'כלאב',
    childrenIds: [],
    parentIds: ['p3365', 'p3368']
}

const p3468 = {
    id: 'p3468',
    name: 'Absalom',
    nameHe: 'אבשלום',
    childrenIds: [],
    parentIds: ['p3365', 'p3369']
}

const p3469 = {
    id: 'p3469',
    name: 'Adonijah',
    nameHe: 'אדוניה',
    childrenIds: [],
    parentIds: ['p3365', 'p3370']
}

const p3470 = {
    id: 'p3470',
    name: 'Nathan',
    nameHe: 'נתן',
    childrenIds: [],
    parentIds: ['p3365', 'p3372']
}

const p3471 = {
    id: 'p3471',
    name: 'Solomon',
    nameHe: 'שלמה',
    childrenIds: [],
    parentIds: ['p3365', 'p3372']
}

const p2449 = {
    id: 'p2449',
    name: 'Kohath',
    nameHe: 'קהת',
    childrenIds: ['p2550'],
    parentIds: ['p2339']
}

const p2550 = {
    id: 'p2550',
    name: 'Amram',
    nameHe: 'עמרם',
    spouseIds: ['p2551'],
    childrenIds: ['p2652', 'p2653', 'p2654'],
    parentIds: ['p2449']
}

const p2551 = {
    id: 'p2551',
    name: 'Jochebed',
    nameHe: 'יוכבד',
    spouseIds: ['p2550'],
    childrenIds: ['p2652', 'p2653', 'p2654'],
    parentIds: []
}

const p2652 = {
    id: 'p2652',
    name: 'Miriam',
    nameHe: 'מרים',
    childrenIds: [],
    parentIds: ['p2550', 'p2551']
}

const p2653 = {
    id: 'p2653',
    name: 'Aaron',
    nameHe: 'אהרן',
    childrenIds: [],
    parentIds: ['p2550', 'p2551']
}

const p2654 = {
    id: 'p2654',
    name: 'Moses',
    nameHe: 'משה',
    spouseIds: ['p2655'],
    childrenIds: [],
    parentIds: ['p2550', 'p2551']
}

const p2655 = {
    id: 'p2655',
    name: 'Zipporah',
    nameHe: 'ציפורה',
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
    p2349,
    p2456,
    p2557,
    p2658,
    p2759,
    p2860,
    p2961,
    p2962,
    p3062,
    p3063,
    p3163,
    p3264,
    p3365,
    p3366,
    p3367,
    p3368,
    p3369,
    p3370,
    p3371,
    p3372,
    p3466,
    p3467,
    p3468,
    p3469,
    p3470,
    p3471,
    p2449,
    p2550,
    p2551,
    p2652,
    p2653,
    p2654,
    p2655
}


