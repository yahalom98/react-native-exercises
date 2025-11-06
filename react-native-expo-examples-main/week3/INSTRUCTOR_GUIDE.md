# Instructor Guide - Week 3

## Overview

This guide provides hints, solutions, and teaching tips for the Week 3 exercises.

## Exercise Solutions Overview

### Exercise 1: Navigation

**Learning Objectives:**
- Create Stack Navigator
- Navigate between screens
- Pass and receive navigation params

**Key Concepts:**
- `navigation.navigate()` with params
- `route.params` to access passed data

**Solution Hints:**
```javascript
// ProductListScreen
function ProductListScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
  
  return (
    <FlatList
      data={PRODUCTS}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}

// ProductDetailScreen
function ProductDetailScreen({ route }) {
  const { product } = route.params;
  return (
    <View>
      <Text>{product.name}</Text>
      <Text>{product.price}</Text>
      <Text>{product.description}</Text>
    </View>
  );
}
```

---

### Exercise 2: Hooks

**Learning Objectives:**
- Use useState for state management
- Use useEffect for side effects
- Understand dependency arrays

**Key Concepts:**
- State initialization
- State updates
- Effect dependencies
- Console logging

**Solution Hints:**
```javascript
const [count, setCount] = useState(0);

useEffect(() => {
  console.log(`Count changed to: ${count}`);
}, [count]);

const increment = () => setCount(count + 1);
const decrement = () => setCount(count - 1);
const reset = () => setCount(0);

// Conditional rendering
{count === 10 && <Text>You've reached 10!</Text>}
```

---

### Exercise 3: FlatList

**Learning Objectives:**
- Implement FlatList
- Add items to array state
- Toggle item completion
- Delete items
- Calculate counts

**Key Concepts:**
- Array state updates
- Filter method
- Map method
- Conditional styling

**Solution Hints:**
```javascript
const [todos, setTodos] = useState(INITIAL_TODOS);
const [inputText, setInputText] = useState('');

const addTodo = () => {
  if (inputText.trim()) {
    setTodos([...todos, {
      id: Date.now().toString(),
      text: inputText,
      completed: false,
    }]);
    setInputText('');
  }
};

const toggleTodo = (id) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
};

const deleteTodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id));
};

const completedCount = todos.filter(todo => todo.completed).length;
```

---

### Exercise 4: Forms

**Learning Objectives:**
- Create controlled inputs
- Implement validation
- Display error messages
- Handle form submission

**Key Concepts:**
- Controlled components
- Validation logic
- Error state management
- Alert component

**Solution Hints:**
```javascript
const [formData, setFormData] = useState({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  
  if (formData.username.length < 3) {
    newErrors.username = 'Username must be at least 3 characters';
  }
  
  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Valid email is required';
  }
  
  if (formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
  }
  
  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = () => {
  if (validate()) {
    Alert.alert('Success', 'Registration successful!');
  }
};
```

---

### Exercise 5: SectionList

**Learning Objectives:**
- Organize data into sections
- Implement SectionList
- Handle item selection
- Calculate totals

**Key Concepts:**
- Data transformation
- Section structure
- Selection state
- Grade calculation

**Solution Hints:**
```javascript
function organizeByGrade(students) {
  const grades = { A: [], B: [], C: [], D: [], F: [] };
  
  students.forEach(student => {
    if (student.score >= 90) grades.A.push(student);
    else if (student.score >= 80) grades.B.push(student);
    else if (student.score >= 70) grades.C.push(student);
    else if (student.score >= 60) grades.D.push(student);
    else grades.F.push(student);
  });
  
  return Object.entries(grades)
    .filter(([_, students]) => students.length > 0)
    .map(([grade, students]) => ({
      title: `Grade ${grade}`,
      data: students,
    }));
}

const getGrade = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};
```

---

### Exercise 6: Comprehensive

**Learning Objectives:**
- Combine multiple concepts
- Create a full-featured app
- Use all hooks together
- Implement navigation with state

**Key Concepts:**
- Multiple hooks in one component
- Navigation params
- State management
- Form handling in lists

**Solution Approach:**
1. Start with navigation structure
2. Add state management (useState)
3. Implement FlatList
4. Add form for new items
5. Use useEffect for side effects
6. Use useRef for input focus
7. Add conditional rendering

---

## Teaching Tips

### 1. Progressive Disclosure
- Start with simple examples
- Gradually add complexity
- Let students experiment between concepts

### 2. Common Mistakes to Watch For

**Navigation:**
- Forgetting NavigationContainer
- Not passing params correctly
- Using wrong navigation method

**Hooks:**
- Missing dependency arrays
- Infinite loops in useEffect
- Not cleaning up effects

**Lists:**
- Missing keyExtractor
- Not handling empty states
- Performance issues with large lists

**Forms:**
- Not validating on submit
- Not clearing errors
- Uncontrolled inputs

### 3. Debugging Tips
- Use console.log for state values
- Check React Native Debugger
- Verify prop types
- Test navigation flow manually

### 4. Assessment Ideas
- Code review of exercises
- Build a small app combining concepts
- Explain concepts in own words
- Debug intentionally broken code

### 5. Extension Activities
- Add animations to navigation
- Implement search functionality
- Add pagination to lists
- Create multi-step forms
- Add data persistence

---

## Time Allocation Suggestions

- **Navigation Basics**: 30-45 minutes
- **Hooks (useState)**: 30-45 minutes
- **Hooks (useEffect)**: 30-45 minutes
- **Hooks (useRef)**: 20-30 minutes
- **Conditional Rendering**: 20-30 minutes
- **FlatList**: 30-45 minutes
- **SectionList**: 30-45 minutes
- **Forms**: 45-60 minutes
- **Exercises**: 2-3 hours

**Total Estimated Time**: 6-8 hours

---

## Additional Resources

- React Navigation Troubleshooting Guide
- React Hooks FAQ
- React Native Performance Optimization
- Form Validation Best Practices

---

## Questions to Ask Students

1. When would you use FlatList vs SectionList?
2. Why do we need dependency arrays in useEffect?
3. What's the difference between useState and useRef?
4. How does navigation state work?
5. What's the best way to handle form validation?

---

Good luck with your teaching! 🎓

