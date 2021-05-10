import Wrapper from '@comp/Wrapper'
import dynamic from 'next/dynamic'
import axios from 'axios'
import '../style/global.css'

// const Theme = dynamic(async () => {
//   const { data } = await axios.get('/api/settings')

//   if (data.themeType === 'dark') {
//     await import('antd/dist/antd.dark.min.css')
//     if (globalThis.document) {
//       const html = document.querySelector('html')
//       html.classList.add('dark')
//     }
//   } else {
//     await import('antd/dist/antd.min.css')
//     if (globalThis.document) {
//       const html = document.querySelector('html')
//       html.classList.remove('dark')
//     }
//   }
//   await import('../style/global.css')
// })

const MyApp = ({ Component, pageProps }) => (
  <Wrapper>
    {/* <Theme /> */}
    <Component {...pageProps} />
  </Wrapper>
)

export default MyApp
