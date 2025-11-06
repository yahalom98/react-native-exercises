import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';

// Sample data
const INITIAL_DATA = [
  { id: '1', name: 'Apple', category: 'Fruits', price: '$1.50' },
  { id: '2', name: 'Banana', category: 'Fruits', price: '$0.75' },
  { id: '3', name: 'Carrot', category: 'Vegetables', price: '$1.00' },
  { id: '4', name: 'Tomato', category: 'Vegetables', price: '$2.00' },
  { id: '5', name: 'Milk', category: 'Dairy', price: '$3.50' },
  { id: '6', name: 'Bread', category: 'Bakery', price: '$2.50' },
  { id: '7', name: 'Orange', category: 'Fruits', price: '$1.25' },
  { id: '8', name: 'Cheese', category: 'Dairy', price: '$4.00' },
];

function FlatListExample() {
  const [items, setItems] = useState(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(INITIAL_DATA.map(item => item.category))];

  // Filter items based on search and category
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Render item function
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </View>
  );

  // Render header
  const renderHeader = () => (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search items..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#999"
      />
      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === item && styles.categoryButtonTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
        />
      </View>
    </View>
  );

  // Render empty state
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No items found</Text>
    </View>
  );

  // Render footer
  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Showing {filteredItems.length} of {items.length} items
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>FlatList Example</Text>
        
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.listContent}
          // Performance optimizations
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          // Pull to refresh
          refreshing={false}
          onRefresh={() => {
            // Simulate refresh
            setItems([...INITIAL_DATA]);
          }}
        />
      </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  listContent: {
    padding: 15,
    paddingBottom: 30,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  categoryContainer: {
    marginBottom: 15,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  itemCategory: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
});

export default FlatListExample;

