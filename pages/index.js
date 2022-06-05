import Head from 'next/head';
import Card from '../components/Card';

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Next.js Countries App</title>
        <meta name='description' content='Next.js Countries App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='container mx-auto py-10 px-20'>
        <h1 className='text-3xl font-semibold mb-10 text-center'>
          Next.js Countries App
        </h1>

        <div className='grid md:grid-cols-3 md:gap-10'>
          {data.map((country) => {
            return (
              <Card
                flag={country.flag}
                region={country.region}
                name={country.name}
                population={country.population}
                code={country.code}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`https://restcountries.com/v3.1/all`);
  const result = await res.json();
  const data = result.slice(0, 10).map((r) => {
    return {
      flag: r.flags.svg,
      region: r.region,
      name: r.name.common,
      population: r.population,
      code: r.cca2,
    };
  });
  return {
    props: {
      data,
    },
  };
}
