const ReactDOM = require("react-dom")

let domFixture

function setupDOM() {
    domFixture = document.createElement("div")
    document.body.appendChild(domFixture)
}

beforeEach(function () {
    setupDOM()
})

afterEach(function () {
    domFixture.remove()
})

function page() {
    return domFixture.innerText
}

function renderComponent(component){
    ReactDOM.render(
        component,
        domFixture
    )
}

window.page = page
window.domFixture = domFixture
window.renderComponent = renderComponent