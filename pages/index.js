import Head from 'next/head';
import { useState, useEffect } from 'react';
import Card from '../components/Card';

export default function Home({ data }) {
  const [countries, setCountries] = useState(data);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  const [number, setNumber] = useState(9);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(null);

  const setregion = new Set(data.map((d) => d.region, region));
  const uniqueregion = Array.from(setregion);
  uniqueregion.unshift('All');

  useEffect(() => {
    if (region !== 'All') {
      const filteredData = data.filter((country) => {
        return (
          country.region.toLowerCase().indexOf(region.toLowerCase()) !== -1
        );
      });
      setCountries(filteredData);
      if (search !== '') {
        const searchfilteredata = filteredData.filter((country) => {
          return (
            country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
          );
        });
        setCountries(searchfilteredata);
      }
    } else {
      setCountries(data);
      if (search !== '') {
        const searchfilteredata = data.filter((country) => {
          return (
            country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
          );
        });
        setCountries(searchfilteredata);
      }
    }
  }, [region, search, data]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleRegion = (e) => {
    setRegion(e.target.value);
  };

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setNumber((number) => number + 9);
      setLoading(false);
    }, 200);
  };

  const handleSortPopulation = (e) => {
    e.preventDefault();
    if (sort === null) {
      setSort('asc');
    }
    if (sort === 'asc') {
      setSort('desc');
    }
    if (sort === 'desc') {
      setSort(null);
    }
  };

  return (
    <div>
      <Head>
        <title>Next.js Countries App</title>
        <meta name='description' content='Next.js Countries App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='container mx-auto py-10 px-10 md:px-20'>
        <h1 className='text-3xl font-semibold mb-10 text-center'>
          Next.js Countries App
        </h1>

        <div className='block md:mb-0 md:flex justify-between'>
          <div className='w-full md:w-1/2 lg:w-1/4 mr-20'>
            <select
              id='location'
              name='location'
              className='mt-1 block w-full pl-3 pr-10 py-2 mb-5 md:mb-0 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
              value={region}
              onChange={handleRegion}
            >
              {uniqueregion.map((country) => {
                return <option key={country}>{country}</option>;
              })}
            </select>
          </div>
          <div className='relative w-full md:w-1/2 lg:w-1/4 mb-10'>
            <input
              type='text'
              className='w-full p-3 lg:p-4 md:pr-12 text-sm border-gray-400 rounded-lg shadow-lg'
              placeholder='Search countries...'
              value={search}
              onChange={handleChange}
            />

            <span className='absolute inset-y-0 inline-flex items-center right-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-gray-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
          </div>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 md:gap-10'>
          {countries.length > 0
            ? sort === null
              ? countries.slice(0, number).map((country) => {
                  return (
                    <Card
                      key={country.code}
                      flag={country.flag[0]}
                      region={country.region}
                      name={country.name}
                      population={country.population}
                      capital={country.capital}
                      area={country.area}
                      handleSortPopulation={handleSortPopulation}
                    />
                  );
                })
              : sort === 'asc'
              ? countries
                  .slice(0, number)
                  .sort((a, b) => a.population - b.population)
                  .map((country) => {
                    return (
                      <Card
                        key={country.code}
                        flag={country.flag[0]}
                        region={country.region}
                        name={country.name}
                        population={country.population}
                        capital={country.capital}
                        area={country.area}
                        handleSortPopulation={handleSortPopulation}
                      />
                    );
                  })
              : sort === 'desc'
              ? countries
                  .slice(0, number)
                  .sort((a, b) => b.population - a.population)
                  .map((country) => {
                    return (
                      <Card
                        key={country.code}
                        flag={country.flag[0]}
                        region={country.region}
                        name={country.name}
                        population={country.population}
                        capital={country.capital}
                        area={country.area}
                        handleSortPopulation={handleSortPopulation}
                      />
                    );
                  })
              : ''
            : 'No countries'}
        </div>
        {countries.length > number ? (
          loading ? (
            <p className='text-center mt-8 text-lg text-gray-600'>Loading...</p>
          ) : (
            <button
              className='py-3 px-6 mt-8 bg-yellow-400 hover:text-yellow-600 text-black mx-auto block text-lg rounded-lg'
              onClick={handleLoad}
            >
              Load more
            </button>
          )
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `https://restcountries.com/v3/all?fields=name,population,region,flags,cca2,capital,area`
  );
  const result = await res.json();
  const data = result.map((country) => {
    return {
      flag: country.flags,
      region: country.region,
      name: country.name.common,
      population: country.population,
      code: country.cca2,
      capital: country.capital,
      area: country.area,
    };
  });
  return {
    props: {
      data,
      revalidate: 10,
    },
  };
}
