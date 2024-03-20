// ** MUI Imports

import { Direction, Box, Paper } from '@mui/material';

// ** Third Party Components
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css'; // CSS for keen-slider

import {
  Library1,
  Library2,
  Library4,
  Library5,
} from '@assets/images/carousel';

interface CarouselProps {
  direction: Direction;
}

const Carousel: React.FC<CarouselProps> = ({ direction }) => {
  const carouselImages = [Library1, Library2, Library4, Library5];

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
            md: '700px',
            lg: '800px',
            xl: '900px',
          },
          width: {
            xs: '600px',
            sm: '700px',
            md: '800px',
            lg: '1000px',
            xl: '1500px',
          },

          overflow: 'hidden',
          borderRadius: '8px',
        }}
      >
        {carouselImages.map((image, index) => (
          <Box
            key={index}
            className="keen-slider__slide"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={image}
              alt={`swiper ${index}`}
              style={{
                maxHeight: '100%',
                maxWidth: '155%',
                objectFit: 'cover',
              }}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default Carousel;
