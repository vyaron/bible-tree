export const wikiService = {
    getPersonData,
    cache: {}
}

async function getPersonData(personName, person = null) {
    // Check cache first
    const cacheKey = personName
    if (wikiService.cache[cacheKey]) {
        return wikiService.cache[cacheKey]
    }

    // Try multiple search strategies with biblical context
    const searchStrategies = [
        `${personName} (Bible)`, // Primary: Bible context
        `${personName} (biblical figure)`, // Alternative: biblical figure
        `${personName} (biblical)`, // Fallback: generic biblical
        personName, // Last resort: direct name
    ]
    
    // If Hebrew name exists, add it to search strategies (at the beginning)
    if (person?.nameHe) {
        searchStrategies.unshift(`${person.nameHe} תורה`) // Hebrew name with Torah
        searchStrategies.unshift(person.nameHe) // Just Hebrew name
    }

    let personData = null

    for (const searchTerm of searchStrategies) {
        try {
            const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`
            const response = await fetch(url)
            
            if (response.ok) {
                const data = await response.json()
                
                personData = {
                    name: data.title,
                    summary: data.extract,
                    image: data.thumbnail?.source || data.originalimage?.source || null,
                    url: data.content_urls?.desktop?.page || null,
                    description: data.description || ''
                }
                
                // Cache the result
                wikiService.cache[cacheKey] = personData
                return personData
            }
        } catch (error) {
            console.error(`Failed to fetch ${searchTerm}:`, error)
            // Continue to next strategy
        }
    }

    // If all strategies fail, return fallback
    personData = {
        name: personName,
        summary: 'No Wikipedia information available for this person.',
        image: null,
        url: null,
        description: ''
    }
    
    wikiService.cache[cacheKey] = personData
    return personData
}
