# Instructor Guide - Week 4

## Overview

This guide provides hints, solutions, and teaching tips for the Week 4 exercises on Networking & APIs.

## Exercise Solutions Overview

### Exercise 1: Fetch API

**Learning Objectives:**
- Use fetch API for HTTP requests
- Handle GET and POST requests
- Parse JSON responses
- Handle errors

**Key Concepts:**
- Promise-based API
- Response handling
- Error catching

**Solution Hints:**
```javascript
const fetchUserData = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setData(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

const fetchPosts = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const data = await response.json();
    setData({ posts: data, count: data.length });
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

const createPost = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'New Post',
        body: 'Post content',
        userId: 1,
      }),
    });
    const data = await response.json();
    setData(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

---

### Exercise 2: Axios

**Learning Objectives:**
- Use axios for HTTP requests
- Handle different HTTP methods
- Use query parameters
- Handle errors

**Key Concepts:**
- Axios instance
- Automatic JSON parsing
- Error handling

**Solution Hints:**
```javascript
const fetchUserWithAxios = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
    setData(response.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

const fetchUsersWithParams = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
      params: { _limit: 3 },
    });
    setData(response.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

const updateUser = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await axios.put('https://jsonplaceholder.typicode.com/users/1', {
      id: 1,
      name: 'Updated Name',
      email: 'updated@example.com',
    });
    setData(response.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

const deleteUser = async () => {
  setLoading(true);
  setError(null);
  
  try {
    await axios.delete('https://jsonplaceholder.typicode.com/users/1');
    setData({ message: 'User deleted successfully' });
    Alert.alert('Success', 'User deleted successfully!');
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

---

### Exercise 3: Error Handling

**Learning Objectives:**
- Handle different error types
- Create user-friendly error messages
- Handle network errors
- Handle timeout errors

**Key Concepts:**
- Error response types
- User-friendly messages
- Error status codes

**Solution Hints:**
```javascript
const handle404Error = async () => {
  setLoading(true);
  setResult(null);
  
  try {
    await axios.get('https://jsonplaceholder.typicode.com/posts/99999');
  } catch (err) {
    if (err.response && err.response.status === 404) {
      setResult({
        type: '404 Error',
        message: 'The requested resource was not found.',
      });
    } else {
      setResult({
        type: 'Error',
        message: err.message,
      });
    }
  } finally {
    setLoading(false);
  }
};

const handleNetworkError = async () => {
  setLoading(true);
  setResult(null);
  
  try {
    await axios.get('https://invalid-url-that-does-not-exist.com/api');
  } catch (err) {
    if (err.request) {
      setResult({
        type: 'Network Error',
        message: 'Unable to connect to server. Check your internet connection.',
      });
    } else {
      setResult({
        type: 'Error',
        message: err.message,
      });
    }
  } finally {
    setLoading(false);
  }
};

const getUserFriendlyError = async () => {
  setLoading(true);
  setResult(null);
  
  try {
    await axios.get('https://jsonplaceholder.typicode.com/posts/99999');
  } catch (err) {
    let userMessage = 'Something went wrong. Please try again.';
    
    if (err.response) {
      switch (err.response.status) {
        case 404:
          userMessage = 'The requested resource was not found.';
          break;
        case 401:
          userMessage = 'You are not authorized. Please log in.';
          break;
        case 500:
          userMessage = 'Server error. Please try again later.';
          break;
      }
    } else if (err.request) {
      userMessage = 'Unable to connect. Check your internet connection.';
    }
    
    Alert.alert('Error', userMessage);
    setResult({
      type: 'User-Friendly Error',
      message: userMessage,
    });
  } finally {
    setLoading(false);
  }
};
```

---

### Exercise 4: Loading States

**Learning Objectives:**
- Implement loading states
- Show loading indicators
- Handle multiple loading states
- Create skeleton loading UI

**Key Concepts:**
- Loading state management
- ActivityIndicator component
- Skeleton screens

**Solution Hints:**
```javascript
const fetchDataWithLoading = async () => {
  setLoading(true);
  setError(null);
  setData(null);
  
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    setData(response.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

const fetchDataWithButtonLoading = async () => {
  setButtonLoading(true);
  setError(null);
  setData(null);
  
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
    setData(response.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setButtonLoading(false);
  }
};

const fetchMultipleData = async () => {
  setLoading(true);
  setError(null);
  setData(null);
  
  try {
    const postResponse = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    const userResponse = await axios.get('https://jsonplaceholder.typicode.com/users/1');
    
    setData({
      post: postResponse.data,
      user: userResponse.data,
    });
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

---

### Exercise 5: Environment Variables

**Learning Objectives:**
- Set up environment variables
- Use env variables in code
- Validate environment variables
- Understand setup process

**Key Concepts:**
- .env files
- process.env
- Configuration management

**Solution Hints:**
```javascript
const loadEnvVariables = () => {
  // In production: const apiKey = process.env.API_KEY;
  // For demo, simulate loading
  setApiKey('demo_api_key_123');
  setApiUrl('https://api.example.com');
  
  setResult({
    type: 'Environment Variables Loaded',
    message: 'Environment variables loaded successfully',
    note: 'In production, these come from process.env',
  });
};

const useEnvVariables = async () => {
  if (!apiKey || !apiUrl) {
    Alert.alert('Error', 'Environment variables not set');
    return;
  }
  
  setResult({
    type: 'Using Environment Variables',
    message: `Using API URL: ${apiUrl}`,
    note: 'API key would be used in Authorization header',
  });
};

const validateEnvVariables = () => {
  const missing = [];
  if (!apiKey) missing.push('API_KEY');
  if (!apiUrl) missing.push('API_URL');
  
  if (missing.length > 0) {
    setResult({
      type: 'Validation Failed',
      message: `Missing: ${missing.join(', ')}`,
    });
  } else {
    setResult({
      type: 'Validation Passed',
      message: 'All required environment variables are set',
    });
  }
};
```

---

### Exercise 6: Weather App

**Learning Objectives:**
- Build a complete weather app
- Integrate API calls
- Handle errors and loading states
- Create user-friendly UI

**Key Concepts:**
- Complete app structure
- API integration
- Error handling
- Loading states

**Solution Approach:**
1. Implement fetchWeather function with error handling
2. Create displayWeather function to render weather data
3. Implement getWeatherIcon and getWeatherColor functions
4. Add proper loading and error states
5. Style the UI components

---

### Exercise 7: Movie App

**Learning Objectives:**
- Build a complete movie app
- Fetch trending movies
- Search functionality
- Movie details view

**Key Concepts:**
- Multiple API calls
- Search functionality
- Modal/overlay views
- List rendering

**Solution Approach:**
1. Implement loadTrendingMovies with useEffect
2. Create searchMovies function
3. Implement getMovieDetails function
4. Create renderMovieItem component
5. Create renderMovieDetails modal
6. Add proper error and loading handling

---

## Teaching Tips

### 1. Progressive Disclosure
- Start with basic fetch examples
- Gradually introduce axios
- Add error handling after basic requests work
- Introduce loading states early
- Save environment variables for last

### 2. Common Mistakes to Watch For

**Fetch API:**
- Forgetting to check response.ok
- Not parsing JSON response
- Missing error handling
- Not using async/await properly

**Axios:**
- Not handling errors
- Forgetting to access response.data
- Not setting loading states
- Missing try/catch blocks

**Error Handling:**
- Not checking error types
- Showing technical errors to users
- Not handling network errors
- Missing error states in UI

**Loading States:**
- Not resetting loading in finally
- Forgetting to disable buttons
- Not showing loading indicators
- Missing loading states for multiple requests

**Environment Variables:**
- Committing .env files
- Not validating env variables
- Hardcoding API keys
- Not using secure storage for sensitive data

### 3. Debugging Tips
- Use console.log to check API responses
- Check Network tab in React Native Debugger
- Verify API endpoints are correct
- Test error scenarios
- Check environment variable loading

### 4. Assessment Ideas
- Code review of exercises
- Build a small app using APIs
- Explain error handling strategies
- Debug intentionally broken code
- Create API integration from scratch

### 5. Extension Activities
- Add caching for API responses
- Implement retry logic
- Add request cancellation
- Create API service layer
- Add request interceptors
- Implement offline support

---

## Time Allocation Suggestions

- **Fetch API Basics**: 30-45 minutes
- **Axios Setup**: 30-45 minutes
- **Async/Await**: 30-45 minutes
- **Error Handling**: 45-60 minutes
- **Loading States**: 30-45 minutes
- **Environment Variables**: 30-45 minutes
- **Weather App Example**: 45-60 minutes
- **Movie App Example**: 45-60 minutes
- **Exercises**: 3-4 hours

**Total Estimated Time**: 8-10 hours

---

## Additional Resources

- Fetch API MDN Documentation
- Axios Official Documentation
- Async/Await JavaScript Guide
- React Native Networking Guide
- OpenWeatherMap API Documentation
- The Movie Database API Documentation

---

## Questions to Ask Students

1. When would you use fetch vs axios?
2. Why do we need try/catch with async/await?
3. What's the difference between sequential and parallel requests?
4. How do you handle different types of errors?
5. Why are environment variables important?
6. What's the best way to show loading states?
7. How do you prevent API keys from being exposed?

---

## API Keys Setup

For the Weather and Movie apps, students will need API keys:

**OpenWeatherMap:**
1. Sign up at https://openweathermap.org/api
2. Get free API key
3. Store in environment variable

**The Movie Database:**
1. Sign up at https://www.themoviedb.org/
2. Get API key from settings
3. Store in environment variable

**Note:** For exercises, simulated data can be used if API keys are not available.

---

Good luck with your teaching! 🎓



