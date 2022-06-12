import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import MapChart from '../../components/Map';

function Country({ country }) {
  const [currency, setCurrency] = useState();

  useEffect(() => {
    if (country.region !== 'Antarctic') {
      const cur = Object.entries(country.currencies).map(([key]) => {
        return key;
      });
      setCurrency(cur);
    } else {
      setCurrency('No currency');
    }
  }, [country.currencies, country.region]);

  return (
    <div className='py-10 md:px-10'>
      <Head>
        <title>{country.name.common} - Next.js Countries App</title>
        <meta name='description' content='Next.js Countries App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='text-3xl font-semibold mb-10 text-center'>
        Next.js Countries App
      </h1>

      <div className='px-10 lg:w-4/5 xl:w-3/5 mx-auto block'>
        <span className='text-gray-700 hover:text-gray-900'>
          <Link href='/'>Go Back</Link>
        </span>

        <div className='flex flex-col w-full md:flex-row mt-2 md:justify-between'>
          <div className='justify-center relative w-3/4 md:w-3/4 h-[175px] mb-2 md:h-[380px] md:mb-0 mr-5 md:mr-10'>
            <Image
              src={country.flags.svg}
              layout='fill'
              objectFit='contain'
              alt={country.name.common}
              priority={true}
            />
          </div>
          <div className='w-full md:w-2/6 flex flex-col justify-center text-gray-600'>
            <h2 className='mb-2'>
              <span className='font-semibold'>Country: </span>
              {country.name.common}
            </h2>
            <h2 className='mb-2'>
              <span className='font-semibold'>Population: </span>
              {country.population}
            </h2>
            <h2 className='mb-2'>
              <span className='font-semibold'>Continent: </span>
              {country.region}
            </h2>
            <h2 className='mb-2'>
              <span className='font-semibold'>Capital: </span>
              {country.capital?.length > 0 ? country.capital[0] : 'No Capital'}
            </h2>
            <h2 className='mb-2'>
              <span className='font-semibold'>Area: </span>
              {country.area} km²
            </h2>
            <h2 className='mb-2'>
              <span className='font-semibold'>Currency: </span>
              {currency}
            </h2>
            <h2 className='mb-2'>
              <span className='font-semibold'>Independent: </span>
              {country.independent ? 'yes' : 'no'}
            </h2>
          </div>
        </div>

        <div className='mt-3 md:mt-10'>
          <MapChart
            name={country.name.common}
            region={country.region}
            latlng={country.latlng}
            subregion={country.subregion}
          />
        </div>
      </div>
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
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${params.name}?fields=name,population,region,flags,latlng,subregion,capital,indepentent,area,currencies`
  );
  const data = await res.json();
  const country = data[0];

  return {
    props: { country },
  };
}

export default Country;
