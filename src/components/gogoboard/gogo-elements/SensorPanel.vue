<template>
  <div class='sensor-panel'>
    <canvas ref="chart" id="sensor-canvas" :style="`height: ${(miniMode ? '140' : '100')}px;width:300px`"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

import { setInterval } from 'timers'

import { mapGetters } from 'vuex'
import store from '../../../store'

// const fullLabels = [
//         "Sensor 1",
//         "Sensor 2",
//         "Sensor 3",
//         "Sensor 4",
//         "Sensor 5",
//         "Sensor 6",
//         "Sensor 7",
//         "Sensor 8"
//       ]

const miniLabels = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8"
      ]

export default {
  name: 'sensor-panel',
  components: {
  },
  props: ['miniMode'],
  data () {
    return {
      steps: 1,
      selectedCountry: '',
      name: '',
       //sensorValue: [1010, 120, 340, 50, 220, 770, 10, 330],
      fullLabels: [
        "Sensor 1",
        "Sensor 2",
        "Sensor 3",
        "Sensor 4",
        "Sensor 5",
        "Sensor 6",
        "Sensor 7",
        "Sensor 8"
      ],
      sensorValue: [0, 0, 0, 0, 0, 0, 0, 0],
      sensorChart: null
    };
  },
  mounted () {
    var chart = this.$refs.chart
    var ctx = chart.getContext('2d')
    this.sensorChart = new Chart(ctx, {
      type: 'bar',
      data: {
      labels: (!this.miniMode) ? this.fullLabels : miniLabels,
      datasets: [
          {
            label: 'Sensor Values',
            data: this.sensorValue,
            //data: [1010, 120, 340, 50, 220, 770, 10, 330],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(135, 227, 42, 0.2)',
              'rgba(176, 121, 48, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(135, 227, 42, 1)',
              'rgba(176, 121, 48, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        responsive: true,
        tooltips: {
          enabled: false
        },
        hover: {
          animationDuration: 0
        },
        // barThickness: 5,
        animation: {
          duration: 0,
          onComplete: function() {
            // var ctx = this.chart.ctx
            ctx.textAlign = 'center'
            // ctx.textBaseline = 'bottom'

            this.chart.config.data.datasets.forEach(function(dataset) {
              for (let [key, meta] of Object.entries(dataset._meta)) {
                meta.data.forEach(function(p) {
                  ctx.fillStyle = dataset.borderColor[p._index];
                  ctx.fillText(
                    p._chart.config.data.datasets[p._datasetIndex].data[
                      p._index
                    ],
                    p._model.x + 0,
                    p._model.y + -5
                  );
                });
              }
            });
          }
        },
        scales: {
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: true,
                max: 1130
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    window.setInterval(() => {
      // this.sensorValue.forEach((val, index) => {
      //   this.sensorValue[index] += 23;
      //   if (this.sensorValue[index] > 1024) {
      //     this.sensorValue[index] = 0;
      //   }

      //   // store.commit('updateGogo', this.sensorValue)
      // })

      if (this.sensorChart == null || this.sensorChart == undefined) return
      this.sensorChart.data.datasets[0].data = this.gogo.sensors
      this.sensorChart.update()
    }, 30)

    this.$bus.$on('setLanguage', (lang) => {
      this.updateLabels(lang)
    })
    this.updateLabels()
  },
  // watch: {
  //   gogo(newVal, oldVal) {
  //     // console.log(newVal)
  //     if (this.sensorChart == null || this.sensorChart == undefined) return
  //     this.sensorChart.data.datasets[0].data = newVal.sensors
  //     this.sensorChart.update()
  //   }
  // },
  destroyed () {
    this.$bus.$off('setLanguage')
  },
  methods: {
    updateLabels () {
      if (this.miniMode) { return }
      
      let sensorLabel = this.$t('gogoboard.sensor.label')
      let labels = []

      for (let index = 0; index < 8 ; index++) {
        labels.push(`${sensorLabel} ${index+1}`)
      }
      this.fullLabels = labels
      this.sensorChart.data.labels = labels
      // console.log(sensorLabel)
    }
  },
  computed: {
    ...mapGetters(['gogo']),
    // someComputedLocalState() {
    //   if (!this.sensorChart) return;
    //   this.sensorChart.data.datasets[0].data = this.gogo.sensors;
    //   this.sensorChart.update();
    //   return this.gogo
    // }
  },

};
</script>

<style lang='css'>


.sensor-widget .widget-body {
  padding: 0px !important;
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}
</style>
