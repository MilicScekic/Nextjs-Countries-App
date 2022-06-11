import React from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { useState, useEffect } from 'react';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + 'Bn';
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + 'M';
  } else {
    return Math.round(num / 100) / 10 + 'K';
  }
};

const markerOffset = 15;

const MapChart = ({ latlng, name, region, subregion }) => {
  const [projection, setProjection] = useState();
  const [projectionConfig, setProjectionConfig] = useState();

  useEffect(() => {
    switch (region) {
      case 'Europe':
        setProjection('geoAzimuthalEqualArea');
        setProjectionConfig({
          rotate: [-10.0, -52.0, 0],
          scale: 500,
        });
        break;
      case 'Africa':
        setProjection('geoAzimuthalEqualArea');
        setProjectionConfig({
          rotate: [-20.0, -2.0, 0],
          scale: 480,
        });
        break;
      case 'Asia':
        setProjection('geoAzimuthalEqualArea');
        setProjectionConfig({
          rotate: [-80.0, -45.0, 0],
          scale: 430,
        });
        break;
      case 'Oceania':
        setProjection('geoAzimuthalEqualArea');
        setProjectionConfig({
          rotate: [-140.0, 0, 0],
          scale: 330,
        });
        break;
      case 'Antarctic':
        setProjection('geoAzimuthalEqualArea');
        setProjectionConfig({
          rotate: [0.0, 70, 0],
          scale: 330,
        });
        break;
    }

    switch (subregion) {
      case 'South America':
        setProjection('geoAzimuthalEqualArea');
        setProjectionConfig({
          rotate: [70.0, 20, 0],
          scale: 400,
        });
        break;
      case 'North America':
        setProjection('geoAzimuthalEqualArea');
        setProjectionConfig({
          rotate: [100.0, -40, 0],
          scale: 400,
        });
        break;
    }
  }, [region, subregion]);

  return (
    <ComposableMap projection={projection} projectionConfig={projectionConfig}>
      <ZoomableGroup>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill='#D6D6DA'
                stroke='#EAEAEC'
                outline='none'
                style={{
                  default: {
                    fill: '#D6D6DA',
                    outline: 'none',
                  },
                  hover: {
                    outline: 'none',
                  },
                }}
              />
            ))
          }
        </Geographies>
        <Marker key={name} coordinates={[latlng[1], latlng[0]]}>
          <g
            fill='#F53'
            stroke='#FF5533'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            transform='translate(-12, -24)'
          >
            <circle cx='12' cy='10' r='3' />
            <path d='M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z' />
          </g>
          <text
            textAnchor='middle'
            className='top-5 text-gray-500'
            y={markerOffset}
          >
            {name}
          </text>
        </Marker>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
