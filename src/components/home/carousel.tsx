// ** MUI Imports
import Box from '@mui/material/Box';
import { Direction } from '@mui/material';

// ** Third Party Components
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css'; // CSS for keen-slider

import {
  Library1,
  Library2,
  Library4,
  Library5
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
      rtl: direction === 'rtl'
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
      }
    ]
  );

  return (
    <Box
      ref={ref}
      className="keen-slider"
      sx={{
        height: '400px',
        width: '700px',
        overflow: 'hidden',
        borderRadius: '8px'
      }}>
      {carouselImages.map((image, index) => (
        <Box
          className="keen-slider__slide"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <img
            src={image}
            alt={`swiper ${index}`}
            style={{
              objectFit: 'cover'
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Carousel;
