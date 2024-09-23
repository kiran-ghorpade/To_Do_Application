package com.practical.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.practical.model.Task;
import com.practical.repository.TaskRepository;

@Service
public class TaskService {

	@Autowired
	TaskRepository taskRepository;

	public List<Task> getAllTasks() {
		return taskRepository.findAll();
	}

	public Task getTask(int id) {
		return taskRepository.findById(id).orElse(null);
	}

	public Task createTask(Task newTask) {
		return taskRepository.save(newTask);
	}

	public Task updateTask(int id, Task task) {
		Task existedTask = taskRepository.findById(id).orElse(null);
		if (existedTask != null) {
			existedTask.setTitle(task.getTitle());
			existedTask.setDescription(task.getDescription());
			existedTask.setStatus(task.getStatus());
		}
		try {
			taskRepository.save(existedTask);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return existedTask;
	}

	public boolean deleteTask(int id) {
		try {
			taskRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
