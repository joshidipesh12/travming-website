export const Custom404 = () => <div></div>;

export const getServerSideProps = () => {
  return {redirect: {destination: '/', permanent: true}};
};

export default Custom404;
