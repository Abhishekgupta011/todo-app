
import Layout from '@/Components/layout/layout'
import '../Styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
  <>
    <Layout>
        <Component {...pageProps} />
    </Layout>
  </>
  )
}

export default MyApp;