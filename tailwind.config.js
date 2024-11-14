/** @type {import('tailwindcss').Config}*/

import flowbite from 'flowbite/plugin';
import daisyui from 'daisyui';
import typography from "flowbite-typography"

export default {
  content: ['./src/**/*.{html,js,svelte,ts}', 
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
    './components/**/*.{html,js}'
  ],

  darkMode: 'class',

  theme: {
    extend: {
      fontFamily: {
        sans: ['"PT SANS"', 'sans-serif'],
        // arial: ["Arial"]
      }
    }
  },
    plugins: [
      flowbite,
      daisyui,
      typography
    ]
};

// module.exports = config;
