'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  useTheme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface CarouselItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface CarouselProps {
  items: CarouselItem[];
  height?: number | string;
  renderItem?: (item: CarouselItem, index: number) => React.ReactNode;
  showArrows?: boolean;
  autoplayInterval?: number;
  pauseOnHover?: boolean;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.33, 1, 0.68, 1], // smooth cubic
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  }),
};

export default function Carousel({
  items,
  height = 300,
  renderItem,
  showArrows = true,
  autoplayInterval = 0,
  pauseOnHover = true,
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const theme = useTheme();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (autoplayInterval > 0 && !isPaused) {
      intervalRef.current = setInterval(handleNext, autoplayInterval);
      return () => clearInterval(intervalRef.current!);
    }
  }, [autoplayInterval, isPaused]);

  return (
    <Box
      sx={{
        position: 'relative',
        p: 4,
        borderRadius: 2,
        backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#1e1e1e',
        height: height,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        overflow: 'hidden',
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {showArrows && (
        <IconButton
          onClick={handlePrev}
          sx={{ position: 'absolute', left: 8 }}
          aria-label="Previous"
        >
          <ArrowBackIosIcon />
        </IconButton>
      )}

      <Box sx={{ maxWidth: '500px', width: '100%', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              width: '100%',
            }}
          >
            {renderItem ? (
              renderItem(items[index], index)
            ) : (
              <>
                {items[index].icon && <Box sx={{ mb: 1 }}>{items[index].icon}</Box>}
                <Typography variant="h6" gutterBottom>
                  {items[index].title}
                </Typography>
                <Typography variant="body1">{items[index].description}</Typography>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Dots */}
        <Box
          sx={{
            mt: 6,
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          {items.map((_, i) => (
            <Box
              key={i}
              onClick={() => {
                if (i !== index) {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }
              }}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backgroundColor: i === index
                  ? theme.palette.primary.main
                  : theme.palette.grey[500],
                opacity: i === index ? 1 : 0.4,
              }}
            />
          ))}
        </Box>
      </Box>

      {showArrows && (
        <IconButton
          onClick={handleNext}
          sx={{ position: 'absolute', right: 8 }}
          aria-label="Next"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      )}
    </Box>
  );
}
