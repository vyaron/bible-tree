import { personService } from './person.service.js'

export const wikiService = {
    getPersonData,
    cache: {}
}

const FORCED_TITLES_BY_PERSON_ID = {
    p6300: 'Saint Joseph',
    p6301: 'Mary, mother of Jesus',
    p6402: 'Jesus'
}

async function getPersonData(personName, person = null) {
    // Check cache first
    const cacheKey = person?.id || personName
    if (wikiService.cache[cacheKey]) {
        return wikiService.cache[cacheKey]
    }

    const searchStrategies = buildSearchStrategies(personName, person)

    let personData = null

    for (const searchTerm of searchStrategies) {
        try {
            const summaryData = await fetchSummary(searchTerm)
            if (summaryData && isRelevantResult(summaryData, person, personName)) {
                personData = mapSummaryToPersonData(summaryData)
                wikiService.cache[cacheKey] = personData
                return personData
            }

            // If direct summary fetch fails, use search API to resolve a better page title.
            const resolvedTitle = await findBestTitle(searchTerm)
            if (!resolvedTitle) continue

            const resolvedSummaryData = await fetchSummary(resolvedTitle)
            if (!resolvedSummaryData || !isRelevantResult(resolvedSummaryData, person, personName)) continue

            personData = mapSummaryToPersonData(resolvedSummaryData)
            wikiService.cache[cacheKey] = personData
            return personData
        } catch (error) {
            console.error(`Failed to fetch ${searchTerm}:`, error)
            // Continue to next strategy
        }
    }

    // If all strategies fail, return fallback
    personData = {
        name: personName,
        summary: buildContextFallbackSummary(personName, person),
        image: null,
        url: null,
        description: 'Biblical figure'
    }
    
    wikiService.cache[cacheKey] = personData
    return personData
}

function buildSearchStrategies(personName, person) {
    const strategies = []
    const parentNames = person?.parentIds?.map(parentId => personService.getPersonById(parentId)?.name || '').filter(Boolean) || []
    const forcedTitle = person?.id ? FORCED_TITLES_BY_PERSON_ID[person.id] : null
    const level = getPersonLevel(person)
    const isNewTestamentLine = level >= 60

    if (forcedTitle) {
        strategies.push(forcedTitle)
    }

    if (person?.nameHe) {
        strategies.push(person.nameHe)
        strategies.push(`${person.nameHe} Bible`)
    }

    // Highly ambiguous names in the New Testament line need targeted aliases.
    if (isNewTestamentLine && personName === 'Jesus') {
        strategies.push('Jesus Christ')
        strategies.push('Jesus of Nazareth')
    }

    if (isNewTestamentLine && personName === 'Mary') {
        strategies.push('Mary, mother of Jesus')
        strategies.push('Virgin Mary')
        strategies.push('Saint Mary')
    }

    if (isNewTestamentLine && personName === 'Joseph') {
        strategies.push('Saint Joseph')
        strategies.push('Joseph (husband of Mary)')
        strategies.push('Joseph, husband of Mary')
    }

    if (parentNames.length) {
        strategies.push(`${personName} son of ${parentNames[0]} Bible`)
        strategies.push(`${personName} child of ${parentNames[0]} Bible`)
    }

    strategies.push(`${personName} (Bible)`)
    strategies.push(`${personName} (biblical figure)`)
    strategies.push(`${personName} (biblical)`)
    strategies.push(`${personName} Bible`)
    strategies.push(personName)

    return Array.from(new Set(strategies.filter(Boolean)))
}

function getPersonLevel(person) {
    if (!person?.id) return 0
    const level = parseInt(person.id.substring(1, person.id.length - 2))
    return Number.isNaN(level) ? 0 : level
}

async function fetchSummary(title) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    const response = await fetch(url)
    if (!response.ok) return null

    const data = await response.json()
    if (isDisambiguation(data)) return null

    return data
}

function isDisambiguation(data) {
    if (!data) return true
    const description = (data.description || '').toLowerCase()
    const title = (data.title || '').toLowerCase()
    return description.includes('disambiguation') || title.includes('(disambiguation)')
}

async function findBestTitle(query) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&utf8=1&srlimit=5&srsearch=${encodeURIComponent(query)}`
    const response = await fetch(url)
    if (!response.ok) return null

    const data = await response.json()
    const results = data?.query?.search || []
    if (!results.length) return null

    const best = results.find(result => !result.title.toLowerCase().includes('(disambiguation)')) || results[0]
    return best?.title || null
}

function isRelevantResult(data, person, personName) {
    const text = `${data.title || ''} ${data.description || ''} ${data.extract || ''}`.toLowerCase()
    const expectedTitle = person?.id ? FORCED_TITLES_BY_PERSON_ID[person.id] : null

    if (expectedTitle) {
        return data.title?.toLowerCase() === expectedTitle.toLowerCase()
    }

    const level = getPersonLevel(person)
    if (level < 60) return true

    const personNameLc = (personName || '').toLowerCase()
    const biblicalSignal = ['bible', 'biblical', 'new testament', 'gospel', 'christian'].some(keyword => text.includes(keyword))
    const hasName = personNameLc ? text.includes(personNameLc) : false

    const relationNames = [
        ...(person?.parentIds || []).map(parentId => personService.getPersonById(parentId)?.name || ''),
        ...(person?.spouseIds || []).map(spouseId => personService.getPersonById(spouseId)?.name || ''),
        ...(person?.childrenIds || []).map(childId => personService.getPersonById(childId)?.name || '')
    ]
        .filter(Boolean)
        .map(name => name.toLowerCase())

    const hasRelationHint = relationNames.some(name => text.includes(name))

    return (hasName && biblicalSignal) || hasRelationHint
}

function buildContextFallbackSummary(personName, person) {
    const parentNames = (person?.parentIds || [])
        .map(parentId => personService.getPersonById(parentId)?.name || '')
        .filter(Boolean)

    const spouseNames = (person?.spouseIds || [])
        .map(spouseId => personService.getPersonById(spouseId)?.name || '')
        .filter(Boolean)

    const childNames = (person?.childrenIds || [])
        .map(childId => personService.getPersonById(childId)?.name || '')
        .filter(Boolean)

    const relationshipParts = []

    if (parentNames.length === 1) {
        relationshipParts.push(`Child of ${parentNames[0]}.`)
    } else if (parentNames.length > 1) {
        relationshipParts.push(`Child of ${parentNames.join(' and ')}.`)
    }

    if (spouseNames.length === 1) {
        relationshipParts.push(`Spouse of ${spouseNames[0]}.`)
    } else if (spouseNames.length > 1) {
        relationshipParts.push(`Spouse of ${spouseNames.join(', ')}.`)
    }

    if (childNames.length === 1) {
        relationshipParts.push(`Parent of ${childNames[0]}.`)
    } else if (childNames.length > 1) {
        relationshipParts.push(`Parent of ${childNames.slice(0, 4).join(', ')}${childNames.length > 4 ? ', and others' : ''}.`)
    }

    const relationshipText = relationshipParts.length ? ` ${relationshipParts.join(' ')}` : ''
    return `No reliable Wikipedia summary was found for ${personName}.${relationshipText}`
}

function mapSummaryToPersonData(data) {
    return {
        name: data.title,
        summary: data.extract,
        image: data.thumbnail?.source || data.originalimage?.source || null,
        url: data.content_urls?.desktop?.page || null,
        description: data.description || ''
    }
}
