import React, { useState, useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';
import { View } from 'react-native';
import { Text, Menu, Button, Portal, Dialog, List } from 'react-native-paper';
import { useBearGuide } from '../BearGuideContext';

const PopularTimesChart = ({ location }) => {
  const { bearGuide } = useBearGuide();
  const [selectedDay, setSelectedDay] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Get the current day by default
  useEffect(() => {
    const currentDayIndex = new Date().getDay(); // Sunday = 0, Monday = 1, ...
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setSelectedDay(daysOfWeek[currentDayIndex]);
  }, []);

  // Data mapping
  const dayData = location.popularTimes[selectedDay.toLowerCase()] || [];
  const chartData = dayData.map((value, index) => ({
    hour: index,
    level: value,
  }));

  // Filter the data to show only show a subset of times
  const filteredData = chartData.filter((_, index) => index % 4 === 0);
  const filteredLabels = filteredData.map((data) => data.hour);

  const hoursLabels = [
    '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM',
  ];

  return (
    <View style={{ padding: 20 }}>
      <Button mode="outlined" onPress={() => setModalVisible(true)}>
        {selectedDay}
      </Button>

      {/* Modal for day selection */}
      <Portal>
        <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <Dialog.Title style={{ fontWeight: 'bold' }}>Select a Day</Dialog.Title>
          <Dialog.Content>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <List.Item
                key={day}
                title={day}
                onPress={() => {
                  setSelectedDay(day);
                  setModalVisible(false);
                }}
              />
            ))}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setModalVisible(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Chart */}
      <VictoryChart
        domainPadding={{ x: 15 }}
        style={{ parent: { alignSelf: 'center' } }}
        height={400}
      >
        {/* Match the reduced labels */}
        <VictoryAxis
          tickValues={filteredLabels}
          tickFormat={(t) => hoursLabels[t / 4]}
          style={{
            tickLabels: { fontSize: 13 },
            grid: { stroke: 'none' },
            ticks: {
              stroke: "#757575",
              size: 10,
            },
          }}
          />
        <VictoryBar
          data={filteredData}
          x="hour"
          y="level"
          style={{
            data: { fill: '#B8860B', width: 35 },
          }}
          />
      </VictoryChart>

    </View>
  );
};

export default PopularTimesChart;
