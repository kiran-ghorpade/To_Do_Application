/**
 * 
 */
const tasksBar = document.getElementById("tasks");
const operationsCard = document.getElementById("operations");
let operation = "add";
let task = {
	title: '',
	description: '',
	status: 'pending',
};

async function request(uri, httpMethod = "GET", httpBody) {
	return fetch("http://localhost:8080/" + uri,
		{
			headers: {
				"Content-Type": "application/json",
			},
			method: httpMethod,
			body: httpBody,
		})
		.then(response => response.json())
}

async function addTask() {
	if (task.title != '') {
		request('task/', 'POST', JSON.stringify(task))
			.then(() => {
				renderTasks();
				resetForm('add');
			})
			.catch(e => alert("error occurred.\nError : " + e));
	}
	else alert("title is required");
}

function updateTask() {
	if (task.title != '') {
		request('task/' + task.id, 'PUT', JSON.stringify(task))
			.then(() => {
				renderTasks();
				resetForm('update');
			})
			.catch(e => alert("error occurred.\nError : " + e));
	}
	else alert("title is required");
}

async function deleteTask(id, title) {
	let con = confirm("do you want to delete task\nTitle : " + title)
	if (con) {
		await request('task/' + id, 'DELETE')
			.then(() => {
				renderTasks();
			})
			.catch(e => alert("Error occurred.\nError : " + e));
	}
}

function addTaskToForm(id) {
	request('task/' + id, "GET")
		.then((response) => {
			task = response;
			operation = 'update';
			renderForm();
		}).catch(e=>alert("Unable to Connect to Server\nCheck Internet Connectivity..."))
}

function resetForm(ops) {
	operation = ops;
	task = {
		title: '',
		description: '',
		status: 'pending',
	};
	renderForm();
}

function handleInputChange(e) {
	const { name, value } = e;
	task = { ...task, [name]: value };
}

function renderForm() {
	let form = `
	<form id="taskForm">
		<input hidden="">
		<div class="mb-3">
			<label for="title" class="form-label">Task Title</label> <input
				type="email" class="form-control" id="title" name="title" value="${task.title}" onChange="handleInputChange(this)"
				placeholder="study, workout etc...">
		</div>
		<div class="mb-3">
			<label for="description" class="form-label">Description</label>
			<textarea class="form-control" id="description" rows="3" name="description" onChange="handleInputChange(this)"
				placeholder="I want to study...">${task.description}</textarea>
		</div>
		<div class="mb-3">
			<label for="status" class="form-label">Status</label> <select
				class="form-select" id="status" value="${task.status}" name="status" onChange="handleInputChange(this)"
				aria-label="Default select example">
				<option value="pending">Pending</option>
				<option value="completed">Completed</option>
			</select>
		</div>
		<div class="mb-3 d-flex justify-content-between">
			<button type="button" class="btn btn-secondary" name="add" onClick="addTask()" ${operation !== 'add' && 'disabled'}>Add</button>
			<button type="button" class="btn btn-secondary" name="update" onClick="updateTask()" ${operation !== 'update' && 'disabled'}>Update</button>
			<button type="reset" class="btn btn-secondary" name="reset" onClick="resetForm('add')">Reset</button>
		</div>
	</form>
`;

	operationsCard.innerHTML = form;

}

function renderTasks() {

	// Fetch the tasks and handle the promise
	request('task/').then(tasks => {
		let dataString = "";

		tasks.forEach(task => {
			dataString += `<div class="card m-2" style="width: 18rem;">
									<div class="card-body"><div class='d-flex justify-content-between'>`
			dataString += "<h5 class='card-title'>" + (task?.title || "No title");
			dataString += `</h5><div><button type='button' onClick="addTaskToForm(${task.id})" class='btn btn-secondary btn-sm mx-1'><i class='bi bi-pencil'></i></button>`;
			dataString += `<button type='button' onClick="deleteTask(${task.id},'${task.title}')" class='btn btn-secondary btn-sm'><i class="bi bi-trash3"></i></button></div></div>`;
			dataString += "<div>" + (task?.description || "No title") + "</div>";
			dataString += "<div>" + (task?.status || "No title") + "</div>";
			dataString += `</div></div>`
		});


		tasksBar.innerHTML = dataString;
	})
		.catch(error => {
			console.error("Error fetching tasks:");
			console.log(error);
			tasksBar.innerHTML = "<h4>Failed to load tasks.</h4>";
		});
}

renderForm();
renderTasks();
