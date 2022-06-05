import Image from 'next/image';
import React from 'react';

function Card({ flag, region, name, population }) {
  return (
    <a
      className='relative block p-8 border border-gray-100 shadow-xl rounded-xl'
      href=''
    >
      <span className='flex absolute left-4 top-4 rounded-full px-3 py-1.5 bg-yellow-100 text-yellow-600 font-medium text-xs'>
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
      {population > 12000000 ? (
        <span className='flex absolute right-4 top-4 rounded-full px-3 py-1.5 bg-green-100 text-green-600 font-medium text-xs'>
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
        <span className='flex absolute right-4 top-4 rounded-full px-3 py-1.5 bg-red-100 text-red-600 font-medium text-xs'>
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

      <div className='mt-6 text-gray-500 sm:pr-8'>
        <div className='relative w-20 h-20'>
          <Image src={flag} layout='fill' objectFit='contain' />
        </div>

        <h5 className='mt-4 text-xl font-bold text-gray-900'>{name}</h5>

        <a
          class='inline-flex items-center py-2 mt-4 text-yellow-400 hover:text-yellow-500'
          href='/download'
        >
          <span class='text-sm font-medium'>Read more</span>

          <svg
            class='w-5 h-5 ml-3'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M17 8l4 4m0 0l-4 4m4-4H3'
            />
          </svg>
        </a>
      </div>
    </a>
  );
}

export default Card;
