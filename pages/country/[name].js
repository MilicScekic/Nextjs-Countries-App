import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

function Country({ country }) {
  return (
    <div className='container mx-auto py-10 px-10 md:px-20'>
      <Head>
        <title>{country.name.common} - Next.js Countries App</title>
        <meta name='description' content='Next.js Countries App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='text-3xl font-semibold mb-10 text-center'>
        Next.js Countries App
      </h1>
      <Link href='/'>Go Back</Link>
      <div>{country.name.common}</div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const countries = await res.json();
  const paths = countries.map((country) => ({
    params: { name: country.name.common },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${params.name}`);
  const data = await res.json();
  const country = data[0];

  return {
    props: { country },
  };
}

export default Country;
