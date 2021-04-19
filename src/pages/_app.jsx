import 'antd/dist/antd.min.css'
import 'tailwindcss/tailwind.css'
import Section from '@comp/Section'

const MyApp = ({ Component, pageProps }) => (
  <Section>
    <Component {...pageProps} />
  </Section>
)

export default MyApp
