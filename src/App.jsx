import React from 'react';
import VehicleMap from './VehicleMap';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>Vehicle Movement on Map</h1>
      <div className={styles.mapContainer}>
        <VehicleMap />
      </div>
    </div>
  );
};

export default App;
