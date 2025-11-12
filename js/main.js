import { personService } from './services/person.service.js'
import { wikiService } from './services/wiki.service.js'

window.app = {
    onInit
}


function onInit() {
    const rootPerson = personService.getRoot()
    console.log(rootPerson)
    renderLevel()
    setupModalHandlers()
}


function renderLevel(level=1) {
    const persons = personService.getPersonsByLevel(level)
    if (!persons?.length) return
    
    const renderedIds = new Set()
    var strHTML = '<div class="row" data-level="' + level + '">'
    
    persons.forEach(person => {
        if (renderedIds.has(person.id)) return
        
        // Check if person has spouses at the same level
        const spouseIds = person.spouseIds || []
        const spouses = spouseIds
            .map(id => personService.getPersonById(id))
            .filter(spouse => spouse && persons.some(p => p.id === spouse.id))
        
        if (spouses.length > 0) {
            // Render person with all their spouses together
            const allIds = [person.id, ...spouses.map(s => s.id)].join(',')
            strHTML += '<div class="couple" data-person-ids="' + allIds + '">'
            strHTML += getPersonHTML(person)
            spouses.forEach(spouse => {
                strHTML += getPersonHTML(spouse)
                renderedIds.add(spouse.id)
            })
            strHTML += '</div>'
            renderedIds.add(person.id)
        } else {
            // Render single person with wrapper
            strHTML += '<div class="single-person" data-person-id="' + person.id + '">'
            strHTML += getPersonHTML(person)
            strHTML += '</div>'
            renderedIds.add(person.id)
        }
    })
    
    strHTML += '</div>'
    const el = document.querySelector('.family-tree')
    el.innerHTML += strHTML
    
    // Draw connections after rendering
    if (level > 0) {
        setTimeout(() => drawConnectionsForLevel(level), 0)
    }
    
    renderLevel(level + 1)
}


function drawConnectionsForLevel(childLevel) {
    const childRow = document.querySelector(`.row[data-level="${childLevel}"]`)
    if (!childRow) return
    
    // Get all persons in this child level
    const childContainersInRow = childRow.querySelectorAll('.couple, .single-person')
    
    // Find all unique parent levels that have children in this level
    const parentLevels = new Set()
    
    console.log(`Drawing connections for level ${childLevel}`)
    
    childContainersInRow.forEach(childContainer => {
        const childPersonIds = (childContainer.dataset.personIds || childContainer.dataset.personId || '').split(',').filter(id => id)
        
        childPersonIds.forEach(childPersonId => {
            const childPerson = personService.getPersonById(childPersonId)
            if (!childPerson || !childPerson.parentIds) return
            
            childPerson.parentIds.forEach(parentId => {
                const parentPerson = personService.getPersonById(parentId)
                if (!parentPerson) return
                
                const parentLevel = parseInt(parentPerson.id.substring(1, parentPerson.id.length - 2))
                console.log(`  Found parent: ${parentPerson.name} (${parentPerson.id}) at level ${parentLevel} for child ${childPerson.name}`)
                parentLevels.add(parentLevel)
            })
        })
    })
    
    console.log(`  Parent levels found: ${Array.from(parentLevels).join(', ')}`)
    
    // Draw connections from each parent level to this child level
    parentLevels.forEach(parentLevel => {
        console.log(`  Calling drawConnections(${parentLevel}, ${childLevel})`)
        drawConnections(parentLevel, childLevel)
    })
}


function getPersonHTML(person) {
    // Determine border color based on mother
    let colorClass = ''
    if (person.parentIds) {
        // Jacob's children
        if (person.parentIds.includes('p2235')) colorClass = 'mother-leah' // Leah - blue
        else if (person.parentIds.includes('p2236')) colorClass = 'mother-rachel' // Rachel - pink
        else if (person.parentIds.includes('p2237')) colorClass = 'mother-bilhah' // Bilhah - green
        else if (person.parentIds.includes('p2238')) colorClass = 'mother-zilpah' // Zilpah - purple
        
        // David's children
        else if (person.parentIds.includes('p3367')) colorClass = 'mother-ahinoam' // Ahinoam - orange
        else if (person.parentIds.includes('p3368')) colorClass = 'mother-abigail' // Abigail - teal
        else if (person.parentIds.includes('p3369')) colorClass = 'mother-maacah' // Maacah - red
        else if (person.parentIds.includes('p3370')) colorClass = 'mother-haggith' // Haggith - brown
        else if (person.parentIds.includes('p3372')) colorClass = 'mother-bathsheba' // Bathsheba - gold
    }
    
    // Mark Jacob's wives
    if (person.id === 'p2235') colorClass = 'mother-leah'
    else if (person.id === 'p2236') colorClass = 'mother-rachel'
    else if (person.id === 'p2237') colorClass = 'mother-bilhah'
    else if (person.id === 'p2238') colorClass = 'mother-zilpah'
    
    // Mark David's wives
    else if (person.id === 'p3367') colorClass = 'mother-ahinoam'
    else if (person.id === 'p3368') colorClass = 'mother-abigail'
    else if (person.id === 'p3369') colorClass = 'mother-maacah'
    else if (person.id === 'p3370') colorClass = 'mother-haggith'
    else if (person.id === 'p3372') colorClass = 'mother-bathsheba'

    const htmlPerson = `<article class="person-preview ${colorClass}" data-person-id="${person.id}" title="ID: ${person.id}">
        <h3>${person.name}</h3>
        ${person.nameHe ? `<p class="hebrew-name">${person.nameHe}</p>` : ''}
    </article>
    `
    return htmlPerson
}


function drawConnections(parentLevel, childLevel) {
    const parentRow = document.querySelector(`.row[data-level="${parentLevel}"]`)
    const childRow = document.querySelector(`.row[data-level="${childLevel}"]`)
    
    console.log(`drawConnections(${parentLevel}, ${childLevel}): parentRow=${!!parentRow}, childRow=${!!childRow}`)
    
    if (!parentRow || !childRow) return
    
    // Check if SVG already exists for this specific parent-child pair
    let svg = document.querySelector(`svg[data-from-level="${parentLevel}"][data-to-level="${childLevel}"]`)
    if (svg) {
        console.log(`  SVG already exists for ${parentLevel}→${childLevel}, skipping`)
        return
    }
    
    // Create SVG
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.classList.add('connection-layer')
    svg.setAttribute('data-from-level', parentLevel)
    svg.setAttribute('data-to-level', childLevel)
    
    const familyTree = document.querySelector('.family-tree')
    const treeRect = familyTree.getBoundingClientRect()
    
    // Get all parent containers
    const parentContainers = parentRow.querySelectorAll('.couple, .single-person')
    
    parentContainers.forEach(parentContainer => {
        // Get person IDs from this container
        const personIds = (parentContainer.dataset.personIds || parentContainer.dataset.personId || '').split(',').filter(id => id)
        if (!personIds.length) return
        
        // Find all child CONTAINERS (not individual person IDs) whose persons have this parent
        const childContainers = []
        const childContainersInRow = childRow.querySelectorAll('.couple, .single-person')
        
        childContainersInRow.forEach(childContainer => {
            const childPersonIds = (childContainer.dataset.personIds || childContainer.dataset.personId || '').split(',').filter(id => id)
            
            // Check if any person in this child container has any person from parent container as parent
            const hasParentMatch = childPersonIds.some(childPersonId => {
                const childPerson = personService.getPersonById(childPersonId)
                return childPerson && childPerson.parentIds && 
                       childPerson.parentIds.some(parentId => personIds.includes(parentId))
            })
            
            if (hasParentMatch) {
                childContainers.push(childContainer)
            }
        })
        
        if (!childContainers.length) return
        
        const parentRect = parentContainer.getBoundingClientRect()
        const parentX = parentRect.left + parentRect.width / 2 - treeRect.left
        const parentY = parentRect.bottom - treeRect.top 
        
        // Check if this is a direct descendant by examining actual parent-child person objects
        let isDirectDescendant = true
        personIds.forEach(parentPersonId => {
            const parentPerson = personService.getPersonById(parentPersonId)
            if (!parentPerson) return
            
            // Get the parent's level from their ID
            const parentPersonLevel = parseInt(parentPerson.id.substring(1, parentPerson.id.length - 2))
            
            // Check each child to see if they're direct descendants
            childContainers.forEach(childContainer => {
                const childPersonIds = (childContainer.dataset.personIds || childContainer.dataset.personId || '').split(',').filter(id => id)
                childPersonIds.forEach(childPersonId => {
                    const childPerson = personService.getPersonById(childPersonId)
                    if (!childPerson) return
                    
                    // Get the child's level from their ID
                    const childPersonLevel = parseInt(childPerson.id.substring(1, childPerson.id.length - 2))
                    
                    // If the child's level is more than 1 greater than parent's level, it's not direct
                    if (childPersonLevel - parentPersonLevel > 1) {
                        isDirectDescendant = false
                        console.log(`Found non-direct: ${parentPerson.name} (${parentPerson.id}, level ${parentPersonLevel}) -> ${childPerson.name} (${childPerson.id}, level ${childPersonLevel})`)
                    }
                })
            })
        })
        
        // Get child container positions
        const childPositions = childContainers.map(childContainer => {
            const childRect = childContainer.getBoundingClientRect()
            return {
                x: childRect.left + childRect.width / 2 - treeRect.left,
                y: childRect.top - treeRect.top,
                container: childContainer
            }
        })
        
        if (!childPositions.length) return
        
        // Calculate positions for the tree structure
        const childY = Math.min(...childPositions.map(p => p.y))
        const midY = parentY + (childY - parentY) / 2
        
        if (childPositions.length === 1) {
            // Single child - draw straight line
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
            line.setAttribute('x1', parentX)
            line.setAttribute('y1', parentY-10)
            line.setAttribute('x2', childPositions[0].x)
            line.setAttribute('y2', childPositions[0].y+10)
            line.classList.add('connection-line')
            if (!isDirectDescendant) {
                line.classList.add('dotted')
            }
            svg.appendChild(line)
        } else {
            // Multiple children - draw tree structure
            const minChildX = Math.min(...childPositions.map(p => p.x))
            const maxChildX = Math.max(...childPositions.map(p => p.x))
            const horizontalMidX = (minChildX + maxChildX) / 2
            
            // Draw vertical line from parent down to horizontal line
            const verticalLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
            verticalLine.setAttribute('x1', parentX)
            verticalLine.setAttribute('y1', parentY)
            verticalLine.setAttribute('x2', horizontalMidX)
            verticalLine.setAttribute('y2', midY)
            verticalLine.classList.add('connection-line')
            if (!isDirectDescendant) {
                verticalLine.classList.add('dotted')
            }
            svg.appendChild(verticalLine)
            
            // Draw horizontal line connecting all children
            const horizontalLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
            horizontalLine.setAttribute('x1', minChildX)
            horizontalLine.setAttribute('y1', midY)
            horizontalLine.setAttribute('x2', maxChildX)
            horizontalLine.setAttribute('y2', midY)
            horizontalLine.classList.add('connection-line')
            if (!isDirectDescendant) {
                horizontalLine.classList.add('dotted')
            }
            svg.appendChild(horizontalLine)
            
            // Draw vertical lines down to each child
            childPositions.forEach(pos => {
                const childLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
                childLine.setAttribute('x1', pos.x)
                childLine.setAttribute('y1', midY)
                childLine.setAttribute('x2', pos.x)
                childLine.setAttribute('y2', pos.y+10)
                childLine.classList.add('connection-line')
                if (!isDirectDescendant) {
                    childLine.classList.add('dotted')
                }
                svg.appendChild(childLine)
            })
        }
    })
    
    childRow.parentNode.insertBefore(svg, childRow)
}


function setupModalHandlers() {
    // Use event delegation for dynamically added person cards
    document.querySelector('.family-tree').addEventListener('click', async (e) => {
        const personCard = e.target.closest('.person-preview')
        if (!personCard) return
        
        const personId = personCard.dataset.personId
        const person = personService.getPersonById(personId)
        
        if (!person) return
        
        await showPersonModal(person)
    })
}


async function showPersonModal(person) {
    const modal = document.getElementById('person-modal')
    const modalName = document.getElementById('modal-name')
    const modalDescription = document.getElementById('modal-description')
    const modalSummary = document.getElementById('modal-summary')
    const modalImage = document.getElementById('modal-image')
    const modalImageContainer = document.querySelector('.modal-image-container')
    const modalLink = document.getElementById('modal-link')
    
    // Set loading state
    modalName.textContent = person.name
    modalDescription.textContent = 'Loading...'
    modalSummary.textContent = ''
    modalImageContainer.style.display = 'none'
    modalLink.style.display = 'none'
    
    // Show modal
    modal.showModal()
    
    // Fetch Wikipedia data
    const wikiData = await wikiService.getPersonData(person.name, person)
    
    // Update modal with data
    modalName.textContent = wikiData.name
    modalDescription.textContent = wikiData.description
    modalSummary.textContent = wikiData.summary
    
    if (wikiData.image) {
        modalImage.src = wikiData.image
        modalImage.alt = wikiData.name
        modalImageContainer.style.display = 'block'
    } else {
        modalImageContainer.style.display = 'none'
    }
    
    if (wikiData.url) {
        modalLink.href = wikiData.url
        modalLink.style.display = 'inline-block'
    } else {
        modalLink.style.display = 'none'
    }
}

