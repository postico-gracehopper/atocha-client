import * as Font from 'expo-font'

// fonts preloading
export const fontAssets = [
  {
    openSans_regular: require('../../assets/fonts/OpenSans-Regular.ttf'),
  },
  {
    openSans_regular_italic: require('../../assets/fonts/OpenSans-Italic.ttf'),
  },
  {
    openSans_semiBold: require('../../assets/fonts/OpenSans-Semibold.ttf'),
  },
  {
    openSans_semiBold_italic: require('../../assets/fonts/OpenSans-SemiboldItalic.ttf'),
  },
  {
    openSans_bold: require('../../assets/fonts/OpenSans-Bold.ttf'),
  },
  {
    openSans_bold_italic: require('../../assets/fonts/OpenSans-BoldItalic.ttf'),
  },
  {
    lora_regular: require('../../assets/fonts/Lora-Regular.ttf'),
  },
  {
    lora_regular_italic: require('../../assets/fonts/Lora-Italic.ttf'),
  },
  {
    lora_semibold: require('../../assets/fonts/Lora-SemiBold.ttf'),
  },
  {
    lora_semibold_italic: require('../../assets/fonts/Lora-SemiBoldItalic.ttf'),
  },
  {
    lora_bold: require('../../assets/fonts/Lora-Bold.ttf'),
  },
  {
    lora_bold_italic: require('../../assets/fonts/Lora-BoldItalic.ttf'),
  },
  {
    lora_medium: require('../../assets/fonts/Lora-Bold.ttf'),
  },
  {
    lora_medium_italic: require('../../assets/fonts/Lora-BoldItalic.ttf'),
  },
  {
    arsilon: require('../../assets/fonts/Arsilon.ttf'),
  },
].map((x) => Font.loadAsync(x))

const fonts = {
  openSans: {
    regular: 'openSans_regular',
    regularItalic: 'openSans_regular_italic',
    semiBold: 'openSans_semiBold',
    semiBoldItalic: 'openSans_semiBold_italic',
    bold: 'openSans_bold',
    boldItalic: 'openSans_bold_italic',
  },
  lora: {
    regular: 'openSans_regular',
    regularItalic: 'openSans_regular_italic',
    semiBold: 'openSans_semiBold',
    semiBoldItalic: 'openSans_semiBold_italic',
    bold: 'openSans_bold',
    boldItalic: 'openSans_bold_italic',
  },
}

export default fonts
