import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';
import { View } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Chip, 
  Divider, 
  Text,
  Button,
  IconButton,
  MD3Colors
} from 'react-native-paper';

const PopularTimesChart = ({ dayData, day }) => {

  const material = data?.material ?? {};
  const popularTimesData = data?.popularTimes ?? {};
  const chartData = dayData.map((value, index) => ({
    hour: index,
    level: value,
  }));

  const hoursLabels = [
    '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM',
    '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM',
    '8 PM', '9 PM', '10 PM', '11 PM'
  ];

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 10 }}>
        Popular Times on {day}
      </Text>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 10, y: 20 }}
        height={300}
      >
        <VictoryAxis
          tickValues={chartData.map((_, index) => index)}
          tickFormat={(t) => hoursLabels[t]}
          style={{
            tickLabels: { fontSize: 8, angle: -45, textAnchor: 'end' },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(y) => `${y}`}
          style={{ tickLabels: { fontSize: 10 } }}
        />
        <VictoryBar
          data={chartData}
          x="hour"
          y="level"
          style={{
            data: { fill: '#B8860B', width: 8 }, // Adjust width and color of bars
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default PopularTimesChart;
