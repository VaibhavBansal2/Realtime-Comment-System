let socket = io()

let username;

do {
    username = prompt('Enter your name : ')
} while (!username)

const textarea = document.querySelector('#textarea')
const btn = document.querySelector('#submitBtn')

btn.addEventListener('click', (e) => {
    e.preventDefault()
    let comment = textarea.value
    if (!comment)
        return
    let data = {
        username,
        comment
    }
    textarea.value = ''
    appendToDom(data);
    socket.emit('comment', data)
    syncWithDb(data)
})

const comment_box = document.querySelector('.comment__box')

function appendToDom(data) {
    let ltag = document.createElement('li')
    ltag.classList.add('comment', 'mb-3')
    let markup = `<li class="comment">
    <div class="card border-light mb-3">
        <div class="card-body">
            <h6>${data.username}</h6>
            <p>${data.comment}</p>
            <div>
                <img src="/images/clock.png" alt="clock">
                <small>${moment(data.time).format('LT')}</small>
            </div>
        </div>
    </div>
</li>`
    ltag.innerHTML = markup
    comment_box.prepend(ltag)
}
socket.on('comment', (data) => {
    appendToDom(data)
})

const typingDiv = document.querySelector('.typing');

textarea.addEventListener('keyup', () => {
    socket.emit('typing', username)
})

let timerID = null
socket.on('typing', (name) => {
    typingDiv.innerText = `${name} is typing...`
    debounce(() => {
        typingDiv.innerText = ''
    }, 1000)
})
function debounce(func, timer) {
    if (timerID)
        clearTimeout(timerID)
    timerID = setTimeout(() => { func() }, timer)
}

// Api calls

function syncWithDb(data){
    fetch()
}