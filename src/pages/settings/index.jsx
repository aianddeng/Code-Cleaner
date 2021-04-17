import Wrapper from '../../components/Wrapper'

const Settings = () => {
  return (
    <Wrapper>
      <h1>Not Found</h1>
    </Wrapper>
  )
}

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: '/?settings=true',
      permanent: false,
    },
  }
}

export default Settings
