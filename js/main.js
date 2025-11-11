import { personService } from './services/person.service.js'

window.app = {
    onInit
}


function onInit() {
    const rootPerson = personService.getRoot()
    console.log(rootPerson)
    renderLevel()
}


function renderLevel(level=0) {
    const persons = personService.getPersonsByLevel(level)
    if (!persons?.length) return
    
    const renderedIds = new Set()
    var strHTML = '<div class="row">'
    
    persons.forEach(person => {
        if (renderedIds.has(person.id)) return
        
        // Check if person has spouses at the same level
        const spouseIds = person.spouseIds || []
        const spouses = spouseIds
            .map(id => personService.getPersonById(id))
            .filter(spouse => spouse && persons.some(p => p.id === spouse.id))
        
        if (spouses.length > 0) {
            // Render person with all their spouses together
            strHTML += '<div class="couple">'
            strHTML += getPersonHTML(person)
            spouses.forEach(spouse => {
                strHTML += getPersonHTML(spouse)
                renderedIds.add(spouse.id)
            })
            strHTML += '</div>'
            renderedIds.add(person.id)
        } else {
            // Render single person
            strHTML += getPersonHTML(person)
            renderedIds.add(person.id)
        }
    })
    
    strHTML += '</div>'
    const el = document.querySelector('.family-tree')
    el.innerHTML += strHTML
    renderLevel(level + 1)
}


function getPersonHTML(person) {

    const htmlPerson = `<article class="person-preview">
        <h3>${person.name}</h3>
        <p>ID: ${person.id}</p>
    </article>
    `
    return htmlPerson
    
}


