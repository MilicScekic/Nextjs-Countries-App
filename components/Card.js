import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Card({
  flag,
  region,
  name,
  population,
  capital,
  area,
  handleSortPopulation,
}) {
  return (
    <Link href={`/country/${name}`}>
      <a>
        <div className='relative block p-8 border border-gray-100 shadow-xl rounded-xl min-h-full max-h-full'>
          <div className='flex'>
            <span className='flex absolute left-4 top-4 rounded-full px-3 py-1.5 bg-yellow-100 text-yellow-900 font-medium text-xs'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 mr-1'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='self-center'>{region}</span>
            </span>
            <div onClick={handleSortPopulation}>
              {population > 12000000 ? (
                <span className='flex absolute right-4 top-4 rounded-full px-3 py-1.5 bg-green-100 text-green-900 font-medium text-xs'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 mr-2'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
                  </svg>
                  <span className='self-center'>{population}</span>
                </span>
              ) : (
                <span className='flex absolute right-4 top-4 rounded-full px-3 py-1.5 bg-red-100 text-red-900 font-medium text-xs'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 mr-2'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
                  </svg>
                  <span className='self-center'>{population}</span>
                </span>
              )}
            </div>
          </div>
          <div className='mt-6 text-gray-500 '>
            <div className='relative w-20 h-20'>
              <Image src={flag} layout='fill' objectFit='contain' alt={name} />
            </div>

            <h5 className='mt-4 mb-4 text-xl font-bold text-gray-600'>
              {name}
            </h5>
            <div className='md:flex justify-between'>
              <p>
                <span className='font-semibold'>Capital: </span>
                {capital}
              </p>
              <p>
                <span className='font-semibold'>Area: </span>
                {area}km²
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default Card;
