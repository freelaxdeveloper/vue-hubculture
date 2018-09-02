<script>
  //Importing Line class from the vue-chartjs wrapper
  import {Line} from 'vue-chartjs'
  //Exporting this so it can be used in other components
  export default {
    extends: Line,
    data () {
      return {
        datacollection: {
        //Data to be represented on x-axis
          labels: ['Март', 'Апрель', 'Май', 'Июнь', 'Июль'], 
          datasets: [
            {
              label: 'Свет',
              backgroundColor: '#17a2b852',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: [109, 104, 247, 478, 254]
            },
            {
              label: 'Газ',
              backgroundColor: '#f8797947',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: [2, 2, 3, 5, 2]
            },
            {
              label: 'Вода х.',
              backgroundColor: '#3333334f',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: [4, 2, 7, 10, 5]
            },
          ]
        },
        //Chart.js options that controls the appearance of the chart
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
    //renderChart function renders the chart with the datacollection and options object.
      this.renderChart(this.datacollection, this.options)
    }
  }
</script>