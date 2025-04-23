'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { Box, Typography, useTheme } from '@mui/material';
import { useEffect, useRef } from 'react';

export interface TimelineStep {
    icon: React.ReactNode;
    title: string;
    summary: string;
    status?: 'pass' | 'fail' | 'in-progress';
    testType?: 'Dev' | 'Functional QA' | 'Staging' | 'Operational' | 'Release';
    issues?: {
        title: string;
        description: string;
        resolved: boolean;
        type: 'Performance' | 'Recovery' | 'Monitoring' | 'Configuration';
    }[];
}


export interface TimelineProps {
    steps: TimelineStep[];
}

export default function Timeline({ steps }: TimelineProps) {
    const ref = useRef(null);
    const controls = useAnimation();
    const inView = useInView(ref, { once: true });
    const theme = useTheme();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [inView, controls]);

    const timelineVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.6,
                ease: 'easeInOut',
            },
        }),
    };

    return (
        <Box ref={ref} sx={{ position: 'relative', paddingLeft: '30px' }}>
            {/* Vertical line */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: '14px',
                    width: '2px',
                    height: '100%',
                    backgroundColor: theme.palette.grey[400],
                    zIndex: 0,
                }}
            />

            {/* Arrowhead marker defs */}
            <svg width="0" height="0">
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="8"
                        markerHeight="8"
                        refX="5"
                        refY="4"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <path d="M0,0 L8,4 L0,8" fill={theme.palette.secondary.main} />
                    </marker>
                </defs>
            </svg>

            {steps.map((step, i) => (
                <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate={controls}
                    variants={timelineVariants}
                    whileHover={{
                        scale: 1.025,
                        boxShadow: `0px 6px 24px ${theme.palette.primary.main}33`,
                        transition: {
                            type: 'spring',
                            stiffness: 120,
                            damping: 18,
                        },
                    }}
                    style={{
                        position: 'relative',
                        marginBottom: '60px',
                        borderRadius: '10px',
                        background: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper,
                        padding: '16px',
                        cursor: 'pointer',
                        borderLeft: step.status === 'fail'
                            ? '6px solid #e53935'
                            : step.status === 'pass'
                                ? '6px solid #43a047'
                                : '',
                    }}
                >
                    {/* Icon */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.main,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            zIndex: 1,
                            fontSize: '16px',
                        }}
                    >
                        {step.icon}
                    </Box>
                    {/* Step content */}
                    <Box sx={{ ml: 5 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            {step.title}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            {step.summary}
                        </Typography>

                        {step.issues && step.issues.length > 0 && (
                            <Box component="ul" sx={{ pl: 2, mb: 1 }}>
                                {step.issues.map((issue, idx) => (
                                    <Box key={idx} component="li" sx={{ color: issue.resolved ? 'text.secondary' : 'error.main' }}>
                                        <strong>{issue.title}</strong>: {issue.description}
                                    </Box>
                                ))}
                            </Box>
                        )}

                        {step.testType && (
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Test Type: {step.testType}
                            </Typography>
                        )}
                    </Box>
                </motion.div>
            ))}
        </Box>
    );
}
