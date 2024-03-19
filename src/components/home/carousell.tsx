// ** MUI Imports
import Box from '@mui/material/Box';
import { Direction } from '@mui/material';

// ** Third Party Components
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css'; // Import CSS untuk keen-slider

import { Library1, Library2, Library3, Library4, Library5 } from '@src/image';

interface CarousellProps {
  direction: Direction;
}

const Carousell: React.FC<CarousellProps> = ({ direction }) => {
  // ** Hook
  const [ref] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      rtl: direction === 'rtl',
    },
    [
      (slider) => {
        let mouseOver = false;
        let timeout: number | ReturnType<typeof setTimeout>;
        const clearNextTimeout = () => {
          clearTimeout(timeout as number);
        };
        const nextTimeout = () => {
          clearTimeout(timeout as number);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        };
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );

  return (
    <Box
      ref={ref}
      className="keen-slider"
      style={{ overflow: 'hidden' }}
      sx={{ height: '400px', width: '700px' }}
    >
      <Box
        className="keen-slider__slide"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={Library1}
          alt="swiper 1"
          style={{
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box
        className="keen-slider__slide"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={Library2}
          alt="swiper 2"
          style={{
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box
        className="keen-slider__slide"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={Library3}
          alt="swiper 3"
          style={{
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box
        className="keen-slider__slide"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={Library4}
          alt="swiper 4"
          style={{
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box
        className="keen-slider__slide"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={Library5}
          alt="swiper 5"
          style={{
            objectFit: 'cover',
          }}
        />
      </Box>
    </Box>
  );
};

export default Carousell;
