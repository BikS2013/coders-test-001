import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

// Import ECharts components
import {
  BarChart,
  LineChart
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// Register ECharts components
use([
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

const app = createApp(App)
app.component('v-chart', ECharts)
app.mount('#app')
