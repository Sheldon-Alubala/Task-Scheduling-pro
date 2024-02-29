document.getElementById("taskDate").setAttribute("min", new Date().toISOString().split("T")[0]);

function addTask () {
    const taskName =document.getElementById("taskInput").value;
    const taskDescription =document.getElementById("taskDescription").value;
    const taskDate =document.getElementById("taskDate").value;

    if (taskName && taskDate){
        const taskList = document.getElementById("taskList");

        const li = document.createElement("li");
        li.innerHTML = `

        <span class="taskName"><strong>Task</strong> <span class="editable_field">${taskName}</span></span>
        <span class="taskDescription"><strong>Description</strong> <span class="editable_field">${taskDescription}</span></span>
        <span class="taskDate"><strong>Date</strong> <span class="editable_field">${taskDate}</span></span>
        <button class="edit-btn" onclick="editTask(this)"><i class="fa-regular fa-pen-to-square"></i>Edit</button>
        <button class="delete-btn" onclick="deleteTask(this)"><i class="fa-solid fa-trash"></i>Delete</button>
        `
        taskList.append(li)

        document.getElementById("taskInput").value = "";
        document.getElementById("taskDescription").value = "";
        document.getElementById("taskDate").value = "";

        sortTasks(); //sort the tasks after adding them
    }
    else{
        alert("Must fill in task name and date")
    }
} 

function editTask(btnElement){
    const li = btnElement.parentElement;
    const isEditing = btnElement.innerHTML.include("save");

    const taskNameField = li.querySelector(".taskName .editable_field");
    const taskDescriptionField = li.querySelector(".taskDescription .editable_field");
    const dateValueField = li.querySelector(".taskDate .editable_field");

    if (isEditing){
        taskNameField.innerHTML = taskNameField.querySelector("input").value;
        taskDescriptionField.innerHTML = taskDescriptionField.querySelector("input").value;
        dateValueField.innerHTML = dateValueField.querySelector("input").value;

        btnElement.innerHTML = `<i class=fas fa-edit></i>Edit`

    }else{
        const taskNameValue = taskNameField.textContent.trim();
        const taskDescriptionValue = taskDescriptionField.textContent.trim();
        const taskDateValue = dateValueField.textContent.trim();

        taskNameField.innerHTML = `<input type="text" value="${taskNameValue}" class="editable_field">`;
        taskDescriptionField.innerHTML = `<textarea class="editable_field">${taskDescriptionValue}</textarea>`;
        dateValueField.innerHTML = `<input type="date" value="${taskDateValue}" class="editable_field">`

        btnElement.innerHTML = `<i class="fa-solid fa-floppy-disk"></i>Save`
        

    }

}

function deleteTask(btnElement){
    btnElement.parentElement.remove();
}

function sortTasks(){
    const taskList = document.getElementById("taskList");
    Array.from(taskList.getElementsByTagName("li"))
    .sort((a,b) =>new Date(a.querySelector(".taskDate .editable_field").textContent) - new Date(b.querySelector(".taskDate .editable_field")
    .textContent))
    .forEach(li => taskList.appendChild(li));
}

