let tasks = []

//Load info while openeing the page
loadLocalStorage()
function loadLocalStorage() {
    const jsonStr = localStorage.getItem("tasksJSON")
    if (jsonStr) {
        tasks = JSON.parse(jsonStr)
        printNote(" load")
    }

}

//Show current date function
function showDate() {
    const now = new Date();
    let date = now.getDate()
    let day = now.getDay();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    switch (day) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
    }
    return (`${day} ${date}/${month}/${year}`)

}

// Show current time function
function showTime() {
    const now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes()
    return (`${hour}:${minutes}`)
}

//clear field function
function clearField(input) {
    input.value = "";
}

//Save data to local storage function
function saveToToDoList() {
    event.preventDefault()
    let taskTextBox = document.getElementById("textArea");
    let destinationDate = document.getElementById("destinationDate");

    //if missing fields paint input in red

    if (taskTextBox.value === '' || destinationDate.value === "") {
        if (taskTextBox.value === '') {
            validateInput(taskTextBox)
        } else { validateInput(destinationDate) }


    } else {
        // else do the functionallity of the rest of the function and unpaint the input
        taskTextBox.style.backgroundColor = ''
        destinationDate.style.backgroundColor = ''


        //Genarate object of current task
        const task = {
            text: taskTextBox.value,
            destinationDate: destinationDate.value,
            currentTime: showTime(),
            currentDate: showDate(),

        }
        //push task object to the tasks array
        tasks.push(task)


        //convert array to json and save to local storage
        const json = JSON.stringify(tasks)
        localStorage.setItem("tasksJSON", json)

        //print
        printNote(" animation")

        //clear inputs
        clearField(taskTextBox)
        clearField(destinationDate)
    }
}


function printNote(ani) {
    //get tasks json from local storage and transform back to object
    let currentTasksJson = localStorage.getItem("tasksJSON");
    let currentTasks = JSON.parse(currentTasksJson);

    //Inserting new col to the row section everytime
    let divOfNotes = document.getElementById("thisRow");
    let html = ``
    let counter = 0;

    for (let currentTask of currentTasks) {
        html += `<div class='col${ani}' id="${counter}">
           <div class='note container'>
            <svg onclick="deleteNote(${counter})" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
            <div class='currentTime'>
              <span>${currentTask.currentDate}</span>
              <span>${currentTask.currentTime}</span>
            </div>
              <div class='noteInnerText'>${currentTask.text}</div>
              <div class="destinationDateDiv"><span>Destination date:</span><br><span>${currentTask.destinationDate}</span></div>
            </div>
        </div>
      `
        counter++
    }

    divOfNotes.innerHTML = html


}

// Delete note function

function deleteNote(counter) {
    //delte from html dom
    let index = document.getElementById(`${counter}`)
    index.innerHTML = ""


    // delete from local storage
    let tasksArray = JSON.parse(localStorage.getItem("tasksJSON"))
    tasksArray.splice(counter, 1)

    //Save new array back to local storage 
    let tasksArrayJSON = JSON.stringify(tasksArray)
    localStorage.setItem("tasksJSON", tasksArrayJSON)

    //Load new array on every delete
    loadLocalStorage()
}



//JavaScript Validation function
function validateInput(input) {
    if (input.value === '') {
        input.style.backgroundColor = 'rgb(206, 81, 81, 0.408)'
        alert("Missing information")
    }
}


