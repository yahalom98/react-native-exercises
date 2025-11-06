import React, { useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, SafeAreaView } from 'react-native';

// Sample data organized by sections
const DATA = [
  {
    title: 'Fruits',
    data: [
      { id: '1', name: 'Apple', price: '$1.50' },
      { id: '2', name: 'Banana', price: '$0.75' },
      { id: '3', name: 'Orange', price: '$1.25' },
      { id: '4', name: 'Grapes', price: '$2.50' },
    ],
  },
  {
    title: 'Vegetables',
    data: [
      { id: '5', name: 'Carrot', price: '$1.00' },
      { id: '6', name: 'Tomato', price: '$2.00' },
      { id: '7', name: 'Lettuce', price: '$1.75' },
      { id: '8', name: 'Broccoli', price: '$2.25' },
    ],
  },
  {
    title: 'Dairy',
    data: [
      { id: '9', name: 'Milk', price: '$3.50' },
      { id: '10', name: 'Cheese', price: '$4.00' },
      { id: '11', name: 'Yogurt', price: '$2.75' },
      { id: '12', name: 'Butter', price: '$3.00' },
    ],
  },
  {
    title: 'Bakery',
    data: [
      { id: '13', name: 'Bread', price: '$2.50' },
      { id: '14', name: 'Croissant', price: '$1.75' },
      { id: '15', name: 'Muffin', price: '$2.00' },
    ],
  },
];

function SectionListExample() {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelection = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Render each item
  const renderItem = ({ item, section }) => {
    const isSelected = selectedItems.includes(item.id);
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          isSelected && styles.itemContainerSelected,
        ]}
        onPress={() => toggleSelection(item.id)}
      >
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <Text style={styles.itemPrice}>{item.price}</Text>
        {isSelected && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    );
  };

  // Render section header
  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
      <Text style={styles.sectionHeaderCount}>
        {section.data.length} items
      </Text>
    </View>
  );

  // Render section footer (optional)
  const renderSectionFooter = ({ section }) => (
    <View style={styles.sectionFooter}>
      <Text style={styles.sectionFooterText}>
        Total: {section.data.length} items in this section
      </Text>
    </View>
  );

  // Render list header
  const renderListHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderTitle}>Shopping List</Text>
      <Text style={styles.listHeaderSubtitle}>
        Select items to add to your cart
      </Text>
    </View>
  );

  // Render list footer
  const renderListFooter = () => (
    <View style={styles.listFooter}>
      <Text style={styles.listFooterText}>
        {selectedItems.length > 0
          ? `${selectedItems.length} item(s) selected`
          : 'No items selected'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SectionList
          sections={DATA}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          renderSectionFooter={renderSectionFooter}
          ListHeaderComponent={renderListHeader}
          ListFooterComponent={renderListFooter}
          keyExtractor={item => item.id}
          stickySectionHeadersEnabled={true}
          contentContainerStyle={styles.listContent}
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
  listContent: {
    paddingBottom: 30,
  },
  listHeader: {
    padding: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  listHeaderTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  listHeaderSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionHeaderCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  sectionFooter: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    paddingLeft: 15,
  },
  sectionFooterText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  itemContainerSelected: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 10,
  },
  checkmark: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  listFooter: {
    padding: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    marginTop: 10,
  },
  listFooterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default SectionListExample;

