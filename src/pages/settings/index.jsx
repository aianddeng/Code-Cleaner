const Settings = () => {
  return <h1>Not Found</h1>
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
