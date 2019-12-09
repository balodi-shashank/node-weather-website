console.log('client side javascript file is loaded')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messgeOne = document.querySelector('#message-1')
const messgeTwo = document.querySelector('#message-2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messgeOne.textContent = 'loading...'
    messgeTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messgeOne.textContent = data.error
                messgeTwo.textContent = ''
            } else {
                messgeOne.textContent = data.location
                messgeTwo.textContent = data.forecast
            }
        })
    })
})