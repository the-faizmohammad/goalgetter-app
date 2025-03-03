import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Fetch tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/tasks');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to fetch tasks');
  }
});

// Add a task
export const addTask = createAsyncThunk('tasks/addTask', async (taskData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/tasks', { task: taskData });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to add task');
  }
});

// Update a task
export const updateTask = createAsyncThunk('tasks/updateTask', async (task, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/tasks/${task.id}`, { task: { completed: !task.completed } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to update task');
  }
});

// Delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, { rejectWithValue }) => {
  try {
    await axios.delete(`/tasks/${taskId}`);
    return taskId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to delete task');
  }
});

// Sorting Reducers
const taskSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], error: null, loading: false, sortBy: "due_date" },
  reducers: {
    sortByPriority: (state) => {
      state.tasks = [...state.tasks].sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      state.sortBy = "priority";
    },
    sortByDueDate: (state) => {
      state.tasks = [...state.tasks].sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
      state.sortBy = "due_date";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        if (state.sortBy === "priority") {
          state.tasks.sort((a, b) => {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          });
        } else {
          state.tasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
        }
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        if (state.sortBy === "priority") {
          state.tasks.sort((a, b) => {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          });
        } else {
          state.tasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
        // Reapply sorting after updating a task
        if (state.sortBy === "priority") {
          state.tasks.sort((a, b) => {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          });
        } else {
          state.tasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  }
});

export const { sortByPriority, sortByDueDate } = taskSlice.actions;
export default taskSlice.reducer;
