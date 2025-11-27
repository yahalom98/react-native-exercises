# Week 3: React Native Advanced Concepts

This lesson covers navigation, React hooks, conditional rendering, lists, and form handling in React Native using Expo.

## 📚 Table of Contents

1. [Navigation](#navigation)
2. [React Hooks](#react-hooks)
3. [Conditional Rendering](#conditional-rendering)
4. [Lists](#lists)
5. [Forms and User Input](#forms-and-user-input)
6. [Exercises](#exercises)

---

## 🧭 Navigation

### Overview

React Navigation is the most popular navigation library for React Native. It allows you to create navigable screens in your app.

### Key Concepts

#### 1. Navigation Basics

**Stack Navigator** - The most common navigator that provides a stack-based navigation system.

```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

**Key Methods:**
- `navigation.navigate('ScreenName')` - Navigate to a screen
- `navigation.goBack()` - Go back to previous screen
- `navigation.replace('ScreenName')` - Replace current screen

#### 2. Passing Parameters

You can pass data between screens using navigation params:

```javascript
// Navigate with params
navigation.navigate('UserDetail', { 
  userId: '123',
  userName: 'John Doe' 
});

// Receive params in destination screen
function UserDetailScreen({ route }) {
  const { userId, userName } = route.params;
  // Use the params...
}
```

#### 3. Header Customization

Customize headers using the `options` prop:

```javascript
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title: 'My App',
    headerStyle: {
      backgroundColor: '#007AFF',
    },
    headerTintColor: '#fff',
    headerRight: () => (
      <Button onPress={() => {}} title="Info" />
    ),
  }}
/>
```

**Common Options:**
- `title` - Header title text
- `headerStyle` - Style object for header
- `headerTintColor` - Color for back button and title
- `headerRight` - Component to render on the right
- `headerLeft` - Component to render on the left
- `header` - Custom header component

---

## 🎣 React Hooks

### useState Hook

**Purpose:** Manage component state.

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <View>
      <Text>{count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
    </View>
  );
}
```

**Key Points:**
- Returns an array: `[value, setterFunction]`
- State updates trigger re-renders
- Use functional updates for state that depends on previous state:
  ```javascript
  setCount(prev => prev + 1);
  ```

**Common Use Cases:**
- Form inputs
- Toggle states (on/off)
- Counters
- Lists/arrays
- Objects

### useEffect Hook

**Purpose:** Handle side effects (API calls, subscriptions, timers, etc.).

```javascript
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This runs after every render
    fetchUser(userId).then(setUser);
  }, [userId]); // Only re-run if userId changes

  return <Text>{user?.name}</Text>;
}
```

**Dependency Array:**
- `[]` - Run only once (on mount)
- `[value]` - Run when `value` changes
- No array - Run on every render

**Cleanup Function:**
```javascript
useEffect(() => {
  const interval = setInterval(() => {
    // Do something
  }, 1000);

  return () => {
    clearInterval(interval); // Cleanup
  };
}, []);
```

**Common Use Cases:**
- API calls
- Timers/intervals
- Event listeners
- Subscriptions
- Cleanup operations

### useRef Hook

**Purpose:** Access DOM elements or store mutable values without causing re-renders.

```javascript
import { useRef, useEffect } from 'react';

function TextInputExample() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus(); // Focus on mount
  }, []);

  return (
    <TextInput
      ref={inputRef}
      placeholder="Type here..."
    />
  );
}
```

**Key Points:**
- Values persist across re-renders
- Changing `.current` doesn't trigger re-renders
- Use for: DOM access, storing previous values, mutable values

**Common Use Cases:**
- Focusing inputs
- Storing interval/timer IDs
- Tracking previous values
- Accessing child component methods

---

## 🔀 Conditional Rendering

Conditional rendering allows you to show different UI based on conditions.

### Methods

#### 1. If/Else with Early Return
```javascript
function Component({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <LoginScreen />;
  }
  
  return <Dashboard />;
}
```

#### 2. Ternary Operator
```javascript
<Text>
  {isLoading ? 'Loading...' : 'Content'}
</Text>
```

#### 3. Logical AND (&&)
```javascript
{isAdmin && <AdminPanel />}
```

#### 4. Multiple Conditions
```javascript
{role === 'admin' && <AdminView />}
{role === 'user' && <UserView />}
{role === 'guest' && <GuestView />}
```

### Re-render Flow

1. **State Change** - `setState` is called
2. **Re-render Triggered** - React schedules a re-render
3. **Component Re-executes** - Component function runs again
4. **Conditional Logic** - New conditions evaluated
5. **UI Updates** - Only changed parts update

**Optimization Tips:**
- Use `React.memo()` for expensive components
- Extract conditional logic to separate functions
- Use `useMemo()` for expensive calculations

---

## 📋 Lists

### FlatList

**Purpose:** Efficiently render large, flat lists.

```javascript
import { FlatList } from 'react-native';

const data = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
];

function MyList() {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      keyExtractor={item => item.id}
    />
  );
}
```

**Key Props:**
- `data` - Array of items to render
- `renderItem` - Function that renders each item
- `keyExtractor` - Function that returns unique key
- `ListHeaderComponent` - Component to render at top
- `ListFooterComponent` - Component to render at bottom
- `ListEmptyComponent` - Component when list is empty
- `onRefresh` - Pull-to-refresh handler
- `refreshing` - Boolean for refresh state

**Performance Tips:**
- Always provide `keyExtractor`
- Use `getItemLayout` for uniform item heights
- Set `removeClippedSubviews={true}` for large lists
- Use `maxToRenderPerBatch` to limit items rendered per batch

### SectionList

**Purpose:** Render lists with sections/headers.

```javascript
import { SectionList } from 'react-native';

const DATA = [
  {
    title: 'Fruits',
    data: ['Apple', 'Banana', 'Orange'],
  },
  {
    title: 'Vegetables',
    data: ['Carrot', 'Tomato'],
  },
];

function MySectionList() {
  return (
    <SectionList
      sections={DATA}
      renderItem={({ item }) => <Text>{item}</Text>}
      renderSectionHeader={({ section: { title } }) => (
        <Text>{title}</Text>
      )}
      keyExtractor={(item, index) => item + index}
    />
  );
}
```

**Key Props:**
- `sections` - Array of section objects with `title` and `data`
- `renderSectionHeader` - Render section header
- `renderSectionFooter` - Render section footer (optional)
- `stickySectionHeadersEnabled` - Make headers stick to top

**When to Use:**
- FlatList: Simple flat lists
- SectionList: Lists with grouped data (contacts, settings, etc.)

---

## 📝 Forms and User Input

### TextInput Component

```javascript
import { TextInput } from 'react-native';

function MyForm() {
  const [text, setText] = useState('');

  return (
    <TextInput
      value={text}
      onChangeText={setText}
      placeholder="Enter text..."
      keyboardType="default"
      secureTextEntry={false}
      multiline={false}
    />
  );
}
```

**Common Props:**
- `value` - Controlled value
- `onChangeText` - Change handler
- `placeholder` - Placeholder text
- `keyboardType` - Keyboard type (email-address, numeric, phone-pad, etc.)
- `secureTextEntry` - For passwords
- `multiline` - Allow multiple lines
- `autoCapitalize` - Auto-capitalization (none, sentences, words, characters)

### Form Handling Pattern

```javascript
function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Submit form
      console.log('Form valid:', formData);
    }
  };

  return (
    <View>
      <TextInput
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        placeholder="Email"
      />
      {errors.email && <Text>{errors.email}</Text>}
      
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
```

### Validation Best Practices

1. **Real-time Validation** - Clear errors as user types
2. **Validate on Submit** - Check all fields on submit
3. **Show Error Messages** - Display clear, helpful errors
4. **Prevent Invalid Submissions** - Disable submit button if invalid
5. **Use Regular Expressions** - For email, phone, etc.

### Switch Component

```javascript
import { Switch } from 'react-native';

function Settings() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      value={enabled}
      onValueChange={setEnabled}
      trackColor={{ false: '#767577', true: '#81b0ff' }}
      thumbColor={enabled ? '#007AFF' : '#f4f3f4'}
    />
  );
}
```

---

## 💪 Exercises

### Exercise 1: Navigation
Create a product list screen with navigation to product detail screen.

**Requirements:**
- List of products
- Navigate to detail screen with product data
- Display product details

### Exercise 2: Hooks
Create a counter with useState and useEffect.

**Requirements:**
- Increment/decrement buttons
- Reset button
- Log count changes to console
- Show message when count reaches 10

### Exercise 3: FlatList
Create a todo list app.

**Requirements:**
- Add new todos
- Mark todos as complete
- Delete todos
- Show completed count

### Exercise 4: Forms
Create a registration form.

**Requirements:**
- Username, email, password fields
- Validation
- Error messages
- Success alert

### Exercise 5: SectionList
Create a student grade book.

**Requirements:**
- Organize by grade levels
- Select students
- Show selected count

### Exercise 6: Comprehensive
Combine all concepts in a shopping list app.

**Requirements:**
- Navigation between screens
- useState, useEffect, useRef
- FlatList for items
- Form for adding items
- Conditional rendering

---

## 🚀 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the App:**
   ```bash
   npm start
   # or
   expo start
   ```

3. **Navigate Examples:**
   - Open the app
   - Select an example or exercise
   - Study the code
   - Complete the exercises

---

## 📖 Additional Resources

- [React Navigation Docs](https://reactnavigation.org/)
- [React Hooks Documentation](https://react.dev/reference/react)
- [React Native TextInput](https://reactnative.dev/docs/textinput)
- [FlatList Documentation](https://reactnative.dev/docs/flatlist)
- [SectionList Documentation](https://reactnative.dev/docs/sectionlist)

---

## 🎯 Key Takeaways

1. **Navigation** - Use React Navigation for screen transitions
2. **Hooks** - useState for state, useEffect for side effects, useRef for refs
3. **Conditional Rendering** - Show different UI based on conditions
4. **Lists** - Use FlatList for simple lists, SectionList for grouped data
5. **Forms** - Control inputs with state, validate on submit, show errors

---

## 💡 Tips

- Always provide keys for list items
- Use functional updates for state that depends on previous state
- Clean up effects (timers, subscriptions) in useEffect cleanup
- Validate forms both on change and submit
- Use conditional rendering to improve UX

---

Happy coding! 🎉




