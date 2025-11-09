# Quick Start Guide - Week 4

## How to Use This Lesson

### Option 1: Use Week4 App Directly

1. Navigate to the week4 folder:
   ```bash
   cd week4
   ```

2. Install dependencies:
   ```bash
   npm install axios
   # For environment variables (optional):
   npm install react-native-dotenv
   ```

3. Modify the parent App.js to import week4/App.js, or run:
   ```bash
   # From the react-native-expo-examples-main folder
   npx expo start
   ```

### Option 2: Integrate with Existing Project

1. Copy the examples and exercises folders to your project
2. Install required dependencies (axios)
3. Import the components you need in your App.js
4. Use the examples as reference

## File Structure

```
week4/
├── App.js                      # Main entry point with navigation
├── README.md                   # Comprehensive documentation
├── QUICK_START.md             # This file
├── INSTRUCTOR_GUIDE.md        # Solutions and teaching tips
├── examples/                   # Working examples
│   ├── 1-fetch-basics/
│   ├── 2-axios-setup/
│   ├── 3-async-await/
│   ├── 4-error-handling/
│   ├── 5-loading-states/
│   ├── 6-env-variables/
│   ├── 7-weather-app/
│   └── 8-movie-app/
└── exercises/                  # Practice exercises
    ├── exercise-1-fetch/
    ├── exercise-2-axios/
    ├── exercise-3-error-handling/
    ├── exercise-4-loading-states/
    ├── exercise-5-env-variables/
    ├── exercise-6-weather-app/
    └── exercise-7-movie-app/
```

## Learning Path

1. **Start with Examples** - Run through each example to understand concepts
2. **Read the README** - Study the explanations for each topic
3. **Complete Exercises** - Practice by implementing the TODO items
4. **Build Your Own** - Create your own projects using these concepts

## Running Examples

1. Open `week4/App.js`
2. Select an example from the list
3. Study the code
4. Experiment with modifications

## Completing Exercises

1. Open an exercise file
2. Look for TODO comments
3. Implement the required functionality
4. Test your implementation
5. Compare with examples if stuck

## Required Dependencies

### Core Dependencies
- `axios` - HTTP client library

### Optional Dependencies
- `react-native-dotenv` - Environment variables support

### Installation
```bash
npm install axios
npm install react-native-dotenv --save-dev
```

## API Setup (Optional)

### For Weather App Example

1. Sign up at https://openweathermap.org/api
2. Get your free API key
3. Create `.env` file:
   ```
   OPENWEATHER_API_KEY=your_key_here
   ```
4. Use in code:
   ```javascript
   import { OPENWEATHER_API_KEY } from '@env';
   ```

### For Movie App Example

1. Sign up at https://www.themoviedb.org/
2. Get API key from settings
3. Create `.env` file:
   ```
   TMDB_API_KEY=your_key_here
   ```
4. Use in code:
   ```javascript
   import { TMDB_API_KEY } from '@env';
   ```

**Note:** Examples use simulated data if API keys are not available.

## Tips

- Start with simple examples before moving to complex ones
- Read the code comments in examples
- Test your changes frequently
- Use console.log for debugging
- Check API documentation for endpoints
- Always handle errors and loading states
- Never commit API keys to version control

## Common Issues

### Issue: Axios not found
**Solution:** Run `npm install axios`

### Issue: Environment variables not working
**Solution:** 
1. Install `react-native-dotenv`
2. Configure `babel.config.js`
3. Restart Metro bundler

### Issue: Network request failed
**Solution:**
- Check internet connection
- Verify API endpoint URL
- Check if API requires authentication
- Verify CORS settings (for web)

### Issue: API returns 401/403
**Solution:**
- Check API key is correct
- Verify API key is included in request
- Check API key permissions

## Need Help?

- Check the README.md for detailed explanations
- Look at similar examples
- Review React Native networking documentation
- Check API documentation
- Review error messages carefully
- Use React Native Debugger

## Next Steps

After completing all exercises:
1. Build your own API-integrated app
2. Try different APIs (news, weather, movies, etc.)
3. Implement caching for API responses
4. Add retry logic for failed requests
5. Create reusable API service functions

Happy Learning! 🚀

