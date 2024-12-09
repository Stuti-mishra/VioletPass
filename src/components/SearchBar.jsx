import React from 'react';

const SearchBar = () => (
  <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem', gap: '1rem',width:'70%' }}>
    <input
  type="text"
  placeholder="Search by event name..."
  style={{
    flex: 1,
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    color: '#212529',
    
    backgroundColor: '#f8f9fa', // Light gray background
  }}
/>
  </div>
);

export default SearchBar;