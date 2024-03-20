// ** MUI Imports
import Box from '@mui/material/Box';
import { Direction } from '@mui/material';

// ** Third Party Components
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css'; // Import CSS untuk keen-slider

import { Library1, Library2, Library3, Library4, Library5 } from '@src/image';
import { Paper } from '@nxweb/react-bootstrap';

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
    <Paper>
      <Box
        ref={ref}
        className="keen-slider"
        sx={{
          height: {
            xs: '300px',
            sm: '600px',
            xl: '800px',
          },
          width: {
            xs: '600px',
            sm: '700px',
            md: '1000px',
          },
        }}
        borderRadius={1}
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
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'fill',
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
              maxHeight: '100%',
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
              maxHeight: '100%',
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
              maxHeight: '100%',
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
              maxWidth: '95%',
              maxHeight: '100%',
              // objectFit: 'scale-down',
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default Carousell;
