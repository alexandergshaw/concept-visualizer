import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface SectionProps {
    title: string
    subtitle?: string
    className?: string
    children?: React.ReactNode
}

export default function Section(props: SectionProps) {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">{props.title}</Typography>
            {props.subtitle && (
                <Typography sx={{ mb: 2 }}>
                    {props.subtitle}
                </Typography>
            )}
            <div className={props.className}>
                {props.children}
            </div>
        </Box>
    );
}