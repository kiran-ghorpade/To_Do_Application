package com.practical.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practical.model.Task;
import com.practical.service.TaskService;

@RestController
@RequestMapping("/task")
public class TaskControlller {
	
	@Autowired
	private TaskService taskService;
	
	@GetMapping("/")
	public List<Task> getAllTasks(){
		return taskService.getAllTasks();
	}
	
	@GetMapping("/{id}")
	public Task getTask(@PathVariable int id) {
		return taskService.getTask(id);
	}
	
	@PostMapping("/")
	public Task createTask(@RequestBody Task newTask) {	
		return taskService.createTask(newTask);
	}
	
	@PutMapping("/{id}")
	public Task updateTask(@PathVariable int id, @RequestBody Task task) {
		return taskService.updateTask(id,task);
	}
	
	@DeleteMapping("/{id}")
	public boolean deleteTask(@PathVariable int id) {
		return taskService.deleteTask(id);
	}
	
}
