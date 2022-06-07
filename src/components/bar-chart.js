import React, { useContext }from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { PokemonsContext } from '../context/PokemonsContext';
import { FormattedMessage } from 'react-intl';

/*const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}*/

const BarChart = () => {
  const [pokemonsList] = useContext(PokemonsContext);
  
  var labels = [];
  var data = [];
  ////////////////////////////

  const result = Object.keys(pokemonsList).map(key => {
    labels.push(pokemonsList[key].name)
    data.push(pokemonsList[key].height)
  });

  const state = {
    labels: labels,
    datasets: [
      {
        label: "Height",
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: data
      }
    ]
  }

  return <Bar data={state} />;
};

export default BarChart;