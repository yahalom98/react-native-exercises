import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import axios from 'axios';

function EnvVariables() {
  const [apiKey, setApiKey] = useState('');
  const [result, setResult] = useState(null);

  // Example 1: Accessing environment variables
  const showEnvVariables = () => {
    // In Expo, environment variables are accessed via Constants.expoConfig.extra
    // For React Native, you'd use process.env
    const envInfo = {
      note: 'Environment variables are typically stored in .env files',
      expoConfig: Constants.expoConfig?.extra || 'Not configured',
      // In production, you'd access: Constants.expoConfig.extra.apiKey
    };

    setResult({
      type: 'Environment Variables',
      info: envInfo,
      instructions: [
        '1. Create a .env file in your project root',
        '2. Add variables: API_KEY=your_key_here',
        '3. Install: npm install react-native-dotenv',
        '4. Configure babel.config.js to use the plugin',
        '5. Access via: process.env.API_KEY',
      ],
    });
  };

  // Example 2: Using API key from env (simulated)
  const useApiKey = () => {
    if (!apiKey.trim()) {
      Alert.alert('Error', 'Please enter an API key');
      return;
    }

    // In real app, this would come from process.env.API_KEY
    // For demo, we're using the input value
    setResult({
      type: 'API Key Usage',
      message: 'API key would be used here',
      note: 'In production, never hardcode API keys in your code!',
      example: `const apiKey = process.env.API_KEY;`,
    });
  };

  // Example 3: Different environments
  const showEnvironments = () => {
    setResult({
      type: 'Environment Configuration',
      environments: {
        development: {
          apiUrl: 'https://api-dev.example.com',
          apiKey: 'dev_key_123',
        },
        staging: {
          apiUrl: 'https://api-staging.example.com',
          apiKey: 'staging_key_456',
        },
        production: {
          apiUrl: 'https://api.example.com',
          apiKey: 'prod_key_789',
        },
      },
      note: 'Use different .env files: .env.development, .env.production',
    });
  };

  // Example 4: Secure storage
  const showSecureStorage = () => {
    setResult({
      type: 'Secure Storage',
      message: 'For sensitive data, use secure storage',
      libraries: [
        'expo-secure-store (Expo)',
        'react-native-keychain (React Native)',
        '@react-native-async-storage/async-storage (non-sensitive)',
      ],
      note: 'Never store sensitive keys in .env files that are committed to git',
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Environment Variables</Text>
        <Text style={styles.description}>
          Environment variables help you manage configuration across different environments
          (development, staging, production) without hardcoding values in your code.
        </Text>

        {/* Setup Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Setup Instructions</Text>
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionStep}>
              1. Install: npm install react-native-dotenv
            </Text>
            <Text style={styles.instructionStep}>
              2. Create .env file in project root
            </Text>
            <Text style={styles.instructionStep}>
              3. Add variables: API_KEY=your_key_here
            </Text>
            <Text style={styles.instructionStep}>
              4. Configure babel.config.js
            </Text>
            <Text style={styles.instructionStep}>
              5. Access: process.env.API_KEY
            </Text>
          </View>
        </View>

        {/* Example Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Examples</Text>
          
          <TouchableOpacity style={styles.button} onPress={showEnvVariables}>
            <Text style={styles.buttonText}>1. Show Environment Variables</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={showEnvironments}>
            <Text style={styles.buttonText}>2. Different Environments</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={showSecureStorage}>
            <Text style={styles.buttonText}>3. Secure Storage</Text>
          </TouchableOpacity>
        </View>

        {/* API Key Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>API Key Input (Demo)</Text>
          <Text style={styles.hint}>
            In real apps, this would come from process.env.API_KEY
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter API key (for demo only)"
            value={apiKey}
            onChangeText={setApiKey}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={useApiKey}>
            <Text style={styles.buttonText}>4. Use API Key</Text>
          </TouchableOpacity>
        </View>

        {/* Result Display */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Result</Text>
          {result && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultType}>{result.type}</Text>
              {result.message && (
                <Text style={styles.resultText}>{result.message}</Text>
              )}
              {result.info && (
                <Text style={styles.resultText}>
                  {JSON.stringify(result.info, null, 2)}
                </Text>
              )}
              {result.instructions && (
                <View style={styles.instructionsList}>
                  {result.instructions.map((instruction, index) => (
                    <Text key={index} style={styles.instructionItem}>
                      {instruction}
                    </Text>
                  ))}
                </View>
              )}
              {result.environments && (
                <Text style={styles.resultText}>
                  {JSON.stringify(result.environments, null, 2)}
                </Text>
              )}
              {result.libraries && (
                <View style={styles.instructionsList}>
                  {result.libraries.map((lib, index) => (
                    <Text key={index} style={styles.instructionItem}>
                      • {lib}
                    </Text>
                  ))}
                </View>
              )}
              {result.note && (
                <View style={styles.noteBox}>
                  <Text style={styles.noteText}>⚠️ {result.note}</Text>
                </View>
              )}
              {result.example && (
                <View style={styles.codeContainer}>
                  <Text style={styles.codeText}>{result.example}</Text>
                </View>
              )}
            </View>
          )}
          {!result && (
            <Text style={styles.placeholder}>
              Click a button above to see environment variable examples
            </Text>
          )}
        </View>

        {/* Code Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Code Examples</Text>
          
          <Text style={styles.codeTitle}>babel.config.js:</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
{`module.exports = {
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }],
  ],
};`}
            </Text>
          </View>

          <Text style={styles.codeTitle}>.env file:</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
{`API_KEY=your_api_key_here
API_URL=https://api.example.com
ENVIRONMENT=development`}
            </Text>
          </View>

          <Text style={styles.codeTitle}>Usage in code:</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
{`import { API_KEY, API_URL } from '@env';

const response = await axios.get(\`\${API_URL}/data\`, {
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`
  }
});`}
            </Text>
          </View>
        </View>

        {/* Best Practices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best Practices</Text>
          <Text style={styles.listItem}>✓ Never commit .env files to git</Text>
          <Text style={styles.listItem}>✓ Add .env to .gitignore</Text>
          <Text style={styles.listItem}>✓ Use .env.example as a template</Text>
          <Text style={styles.listItem}>✓ Use different .env files for each environment</Text>
          <Text style={styles.listItem}>✓ Store sensitive keys in secure storage</Text>
          <Text style={styles.listItem}>✓ Validate environment variables on app start</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#007AFF',
  },
  instructionsContainer: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  instructionStep: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  hint: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#333',
    marginBottom: 8,
  },
  instructionsList: {
    marginTop: 10,
  },
  instructionItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    lineHeight: 20,
  },
  noteBox: {
    backgroundColor: '#fff3cd',
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  noteText: {
    fontSize: 14,
    color: '#856404',
  },
  placeholder: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  codeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  codeContainer: {
    backgroundColor: '#2d2d2d',
    padding: 15,
    borderRadius: 6,
    marginBottom: 15,
  },
  codeText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#f8f8f2',
    lineHeight: 18,
  },
  listItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default EnvVariables;



