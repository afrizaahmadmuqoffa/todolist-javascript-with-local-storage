//DOM Selector
const taskInput = document.getElementById('taskInput')
const taskList = document.getElementById('taskList')
const addBtn = document.getElementById('addButton')
const modalBox = document.getElementById('modal')
const closeModal = document.getElementById('closeModalBtn')
const inputModal = document.getElementById('inputField')
const doneBtn = document.getElementById('doneBtn')
let taskParent = null;

//Valisdasi Local Storage
if (JSON.parse(localStorage.getItem('tasks'))) {
    let tasksLocalStorage = JSON.parse(localStorage.getItem('tasks')) || []

    tasksLocalStorage.forEach(e => {

        const divTask = document.createElement('div')
        divTask.className = 'task-item'
        const span = document.createElement('span')
        span.textContent = e
        divTask.appendChild(span)


        const divBtn = document.createElement('div')
        divBtn.className = 'btn'
        divBtn.innerHTML = ` <button class="edit-button" id="edit-button">Edit</button>
            <button class="delete-button" id="delete-button">Delete</button>`

        divTask.appendChild(divBtn)
        taskList.appendChild(divTask)

        //Event tombol edit task
        const editBtn = document.querySelectorAll('.edit-button')
        editBtn.forEach(e => {
            e.addEventListener('click', function () {
                modalBox.style.display = 'block'
                taskParent = e.closest('.task-item')
                console.log(taskParent)
            })
        })

        //event delete button
        const deleteBtn = document.querySelectorAll('.delete-button')

        deleteBtn.forEach(del => {
            del.addEventListener('click', function () {
                let parentDel = this.parentElement.parentElement
                let tasksLocalStorage = JSON.parse(localStorage.getItem('tasks')) || []
                tasksLocalStorage = tasksLocalStorage.filter(task => task !== parentDel.querySelector('span').textContent)
                localStorage.setItem('tasks', JSON.stringify(tasksLocalStorage))

                parentDel.remove()
            })

        })
    })
}

//Event tombol add task
addBtn.addEventListener('click', function () {
    const taskValue = taskInput.value.trim()
    if (taskValue !== '') {
        let tasksLocalStorage = JSON.parse(localStorage.getItem('tasks')) || []

        tasksLocalStorage.push(taskValue)

        localStorage.setItem('tasks', JSON.stringify(tasksLocalStorage))

        const divTask = document.createElement('div')
        divTask.className = 'task-item'
        const span = document.createElement('span')
        span.textContent = taskValue
        divTask.appendChild(span)


        const divBtn = document.createElement('div')
        divBtn.className = 'btn'
        divBtn.innerHTML = ` <button class="edit-button" id="edit-button">Edit</button>
        <button class="delete-button" id="delete-button">Delete</button>`

        divTask.appendChild(divBtn)
        taskList.appendChild(divTask)

        //Event tombol edit task
        const editBtn = document.querySelectorAll('.edit-button')
        editBtn.forEach(e => {
            e.addEventListener('click', function () {
                modalBox.style.display = 'block'
                taskParent = e.closest('.task-item')
                console.log(taskParent)
            })
        })

        //event delete button
        const deleteBtn = document.querySelectorAll('.delete-button')

        deleteBtn.forEach(del => {
            del.addEventListener('click', function () {
                let parentDel = this.parentElement.parentElement
                let tasksLocalStorage = JSON.parse(localStorage.getItem('tasks')) || []
                tasksLocalStorage = tasksLocalStorage.filter(task => task !== parentDel.querySelector('span').textContent)
                localStorage.setItem('tasks', JSON.stringify(tasksLocalStorage))

                parentDel.remove()
            })

        })

        //reset input task
        taskInput.value = ''
    }
})

//Event tombol done modal box
doneBtn.addEventListener('click', function () {
    const inputEdit = inputModal.value
    const resultTask = taskParent.querySelector('span')



    if (inputEdit !== '') {
        resultTask.textContent = inputEdit
        let tasksLocalStorage = JSON.parse(localStorage.getItem('tasks')) || []

        const editedTaskIndex = Array.from(taskList.children).indexOf(taskParent)
        console.log(editedTaskIndex)
        tasksLocalStorage[editedTaskIndex] = inputEdit

        localStorage.setItem('tasks', JSON.stringify(tasksLocalStorage))
    }
    modalBox.style.display = 'none'
    inputModal.value = ''
})

//Event tombol close modal box
closeModal.addEventListener('click', function () {
    modalBox.style.display = 'none'

    //Reset input modal box
    inputModal.value = ''
})