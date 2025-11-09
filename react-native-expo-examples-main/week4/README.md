# Week 4: Networking & APIs

This lesson covers fetching data from REST APIs, using Axios, async/await patterns, error handling, loading states, and environment variables in React Native using Expo.

## 📚 Table of Contents

1. [Fetch API Basics](#fetch-api-basics)
2. [Axios Setup](#axios-setup)
3. [Async/Await](#asyncawait)
4. [Error Handling](#error-handling)
5. [Loading States](#loading-states)
6. [Environment Variables](#environment-variables)
7. [Projects](#projects)
8. [Exercises](#exercises)

---

## 🌐 Fetch API Basics

### Overview

The Fetch API is a modern, promise-based way to make HTTP requests in JavaScript. It's built into modern browsers and React Native.

### Key Concepts

#### 1. Basic GET Request

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

**Key Points:**
- `fetch()` returns a Promise
- First `.then()` handles the Response object
- `response.json()` parses JSON data
- `.catch()` handles errors

#### 2. POST Request

```javascript
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John',
    email: 'john@example.com',
  }),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

**Common HTTP Methods:**
- `GET` - Retrieve data
- `POST` - Create new resource
- `PUT` - Update existing resource
- `DELETE` - Delete resource
- `PATCH` - Partial update

#### 3. Response Handling

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

**Response Properties:**
- `response.ok` - Boolean, true if status 200-299
- `response.status` - HTTP status code
- `response.statusText` - Status text
- `response.json()` - Parse as JSON
- `response.text()` - Parse as text

---

## 📦 Axios Setup

### Overview

Axios is a popular HTTP client library that makes API calls easier with better error handling and automatic JSON transformation.

### Installation

```bash
npm install axios
# or
yarn add axios
```

### Basic Usage

```javascript
import axios from 'axios';

// GET request
const response = await axios.get('https://api.example.com/data');
console.log(response.data);

// POST request
const response = await axios.post('https://api.example.com/data', {
  name: 'John',
  email: 'john@example.com',
});
```

### Advantages Over Fetch

- Automatic JSON data transformation
- Better error handling
- Request/response interceptors
- Request timeout support
- Automatic request body serialization
- Works in both browser and Node.js

### Axios Instance

```javascript
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Use the instance
const response = await api.get('/users');
```

---

## ⏳ Async/Await

### Overview

Async/await makes asynchronous code look and behave like synchronous code. It's built on Promises and makes error handling easier.

### Basic Syntax

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

**Key Points:**
- `async` functions always return a Promise
- `await` pauses execution until Promise resolves
- Use `try/catch` for error handling
- `await` can only be used inside `async` functions

### Sequential Requests

```javascript
async function fetchSequential() {
  try {
    const user = await axios.get('/users/1');
    const posts = await axios.get(`/users/${user.data.id}/posts`);
    return { user: user.data, posts: posts.data };
  } catch (error) {
    console.error(error);
  }
}
```

### Parallel Requests

```javascript
async function fetchParallel() {
  try {
    const [users, posts, comments] = await Promise.all([
      axios.get('/users'),
      axios.get('/posts'),
      axios.get('/comments'),
    ]);
    return {
      users: users.data,
      posts: posts.data,
      comments: comments.data,
    };
  } catch (error) {
    console.error(error);
  }
}
```

**When to Use:**
- Sequential: When one request depends on another
- Parallel: When requests are independent (faster)

---

## ⚠️ Error Handling

### Overview

Proper error handling is crucial for a good user experience. Always handle errors gracefully and provide meaningful feedback.

### Error Types

#### 1. Response Errors (4xx, 5xx)

```javascript
try {
  const response = await axios.get('https://api.example.com/data');
} catch (error) {
  if (error.response) {
    // Server responded with error status
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  }
}
```

#### 2. Request Errors (Network Issues)

```javascript
catch (error) {
  if (error.request) {
    // Request made but no response received
    console.error('No response:', error.request);
  }
}
```

#### 3. Setup Errors

```javascript
catch (error) {
  // Error setting up the request
  console.error('Error:', error.message);
}
```

### User-Friendly Error Messages

```javascript
try {
  const response = await axios.get('https://api.example.com/data');
} catch (error) {
  let userMessage = 'Something went wrong. Please try again.';
  
  if (error.response) {
    switch (error.response.status) {
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
  } else if (error.request) {
    userMessage = 'Unable to connect. Check your internet connection.';
  }
  
  Alert.alert('Error', userMessage);
}
```

### Best Practices

- Always use try/catch with async/await
- Check error types (response, request, setup)
- Provide user-friendly error messages
- Log errors for debugging
- Handle network errors gracefully
- Implement retry logic for transient errors

---

## ⏱️ Loading States

### Overview

Loading states provide visual feedback to users while data is being fetched. Good loading states improve user experience.

### Basic Loading State

```javascript
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);

const fetchData = async () => {
  setLoading(true);
  try {
    const response = await axios.get('https://api.example.com/data');
    setData(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// In render
{loading && <ActivityIndicator />}
{data && <Text>{JSON.stringify(data)}</Text>}
```

### Button Loading State

```javascript
const [buttonLoading, setButtonLoading] = useState(false);

const handleSubmit = async () => {
  setButtonLoading(true);
  try {
    await axios.post('/api/submit', formData);
  } finally {
    setButtonLoading(false);
  }
};

<TouchableOpacity
  onPress={handleSubmit}
  disabled={buttonLoading}
>
  {buttonLoading ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <Text>Submit</Text>
  )}
</TouchableOpacity>
```

### Skeleton Loading

```javascript
{loading ? (
  <View>
    <View style={styles.skeletonLine} />
    <View style={styles.skeletonLine} />
  </View>
) : (
  <Text>{data}</Text>
)}
```

### Best Practices

- Show loading indicator immediately
- Disable buttons during loading
- Use skeleton screens for better UX
- Show progress for long operations
- Always use finally block to reset loading
- Handle loading errors gracefully

---

## 🔐 Environment Variables

### Overview

Environment variables help manage configuration across different environments without hardcoding values.

### Setup

1. **Install react-native-dotenv:**
```bash
npm install react-native-dotenv
```

2. **Create .env file:**
```env
API_KEY=your_api_key_here
API_URL=https://api.example.com
ENVIRONMENT=development
```

3. **Configure babel.config.js:**
```javascript
module.exports = {
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }],
  ],
};
```

4. **Usage:**
```javascript
import { API_KEY, API_URL } from '@env';

const response = await axios.get(`${API_URL}/data`, {
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
  },
});
```

### Different Environments

- `.env.development` - Development environment
- `.env.staging` - Staging environment
- `.env.production` - Production environment

### Best Practices

- Never commit .env files to git
- Add .env to .gitignore
- Use .env.example as a template
- Store sensitive keys in secure storage
- Validate environment variables on app start

---

## 🎬 Projects

### Weather App

A complete weather application that fetches real-time weather data from OpenWeatherMap API.

**Features:**
- Search by city name
- Display current weather
- Show temperature, humidity, wind speed
- Error handling
- Loading states

**API:** OpenWeatherMap (https://openweathermap.org/api)

### Movie App

A movie database app that fetches movie information from The Movie Database (TMDB) API.

**Features:**
- Search movies
- View trending movies
- Movie details
- Error handling
- Loading states

**API:** The Movie Database (https://www.themoviedb.org/)

---

## 💪 Exercises

### Exercise 1: Fetch API
Implement fetch API calls for GET and POST requests.

**Requirements:**
- Fetch user data
- Fetch posts with query parameters
- Create a new post

### Exercise 2: Axios
Implement axios API calls for all HTTP methods.

**Requirements:**
- GET request
- GET with query parameters
- PUT request
- DELETE request

### Exercise 3: Error Handling
Implement proper error handling for different error types.

**Requirements:**
- Handle 404 errors
- Handle network errors
- Handle timeout errors
- Create user-friendly error messages

### Exercise 4: Loading States
Implement various loading state patterns.

**Requirements:**
- Basic loading state
- Button loading state
- Multiple loading states
- Skeleton loading UI

### Exercise 5: Environment Variables
Set up and use environment variables.

**Requirements:**
- Load environment variables
- Use env variables in API calls
- Validate environment variables
- Show setup instructions

### Exercise 6: Weather App
Build a complete weather application.

**Requirements:**
- Fetch weather data
- Display weather information
- Error handling
- Loading states
- Search functionality

### Exercise 7: Movie App
Build a complete movie database application.

**Requirements:**
- Fetch trending movies
- Search movies
- Display movie details
- Error handling
- Loading states

---

## 🚀 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Install Additional Packages:**
   ```bash
   npm install axios
   # For environment variables:
   npm install react-native-dotenv
   ```

3. **Run the App:**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Navigate Examples:**
   - Open the app
   - Select an example or exercise
   - Study the code
   - Complete the exercises

---

## 📖 Additional Resources

- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Axios Documentation](https://axios-http.com/)
- [Async/Await Guide](https://javascript.info/async-await)
- [React Native Networking](https://reactnative.dev/docs/network)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [The Movie Database API](https://www.themoviedb.org/documentation/api)

---

## 🎯 Key Takeaways

1. **Fetch API** - Built-in way to make HTTP requests
2. **Axios** - Popular library with better features
3. **Async/Await** - Modern way to handle asynchronous code
4. **Error Handling** - Always handle errors gracefully
5. **Loading States** - Provide feedback during API calls
6. **Environment Variables** - Manage configuration securely

---

## 💡 Tips

- Always use try/catch with async/await
- Check response.ok before parsing JSON
- Provide user-friendly error messages
- Show loading indicators during API calls
- Never commit API keys to version control
- Use environment variables for configuration
- Handle network errors gracefully
- Implement retry logic for transient errors

---

Happy coding! 🎉

