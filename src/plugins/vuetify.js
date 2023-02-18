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
    cream: '#d5cea3',
    'text-secondary-1': '#d5cea3', 
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    error: '#eb2a4d',
    info: '#2196F3',
    success: '#66BB6A',
    warning: '#FB8C00',
    chip:"#FFFF00" 
  }
}
const blueTing = {
  dark: false,
  colors: {
    background: '#6096B4',
    surface: '#93BFCF',
    primary: '#93BFCF',
    cream: '#EEE9DA',
    'text-secondary-1': '#525252',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    error: '#eb2a4d',
    info: '#2196F3',
    success: '#026000',
    warning: '#FB8C00',
    chip:"#37474F"

  }
}

const julioTing = {
  dark: true,
  colors: {
    background: '#000000',
    surface: '#212121',
    primary: '#3E432E',
    cream: '#EEE9DA',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    error: '#eb2a4d',
    info: '#2196F3',
    success: '#66BB6A',
    warning: '#FB8C00',
    chip:"#37474F"

  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: JSON.parse(localStorage.getItem("paisejs_pref"))?.theme || "brownTing",
    themes: {
      brownTing,
      blueTing,
      julioTing,
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
