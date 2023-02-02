/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const brownTing = {
  dark: true,
  colors: {
    background: '#1A120B',
    surface: '#3C2A21',
    primary: '#3C2A21',
    'primary-darken-1': '#3700B3', 
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    error: '#eb2a4d',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "brownTing",
    themes: {
      brownTing,
      light: {

        dark: false,
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
      dark: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },

  },
})
