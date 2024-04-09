import { useRouter } from 'next/router';

const RedirectPage = () => {
  const router = useRouter();
  const { code } = router.query;

  return (
    <div>
      <h1>Redirect Page</h1>
      <p>redirect to {code}</p>
    </div>
  )
};

export default RedirectPage;
