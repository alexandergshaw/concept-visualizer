'use client';

import ConceptWrapper from "../../../common/ConceptWrapper";
import Timeline, { TimelineStep } from "../../../common/Timeline";
import BugReportIcon from '@mui/icons-material/BugReport';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StorageIcon from '@mui/icons-material/Storage';
import Section from "../../../common/Section";
import Carousel, { CarouselItem } from "../../../common/Carousel";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SpeedIcon from '@mui/icons-material/Speed';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReplayIcon from '@mui/icons-material/Replay';
import BackupIcon from '@mui/icons-material/Backup';
import DescriptionIcon from '@mui/icons-material/Description';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';

export default function UserAcceptanceTestingConcept() {
    const timelineSteps: TimelineStep[] = [
        {
            icon: <BuildIcon fontSize="small" />,
            title: 'Development Complete',
            summary: 'The team finishes building the app. All features are coded and ready to be tested.',
        },
        {
            icon: <CheckCircleIcon fontSize="small" />,
            title: 'QA Complete',
            summary: 'Basic testing is done. The app works as expected in normal conditions with no major bugs.',
        },
        {
            icon: <StorageIcon fontSize="small" />,
            title: 'Staging Deploy',
            summary: 'We launch the app in a fake “live” environment that looks just like production, so we can do more serious testing.',
        },
        {
            icon: <BugReportIcon fontSize="small" />,
            title: 'User Simulation',
            summary: 'We use the app the way a real person would—clicking, typing, navigating—to make sure nothing breaks along the way.',
        },
        {
            icon: <BugReportIcon fontSize="small" />,
            title: 'Load Testing',
            summary: 'We throw a bunch of fake users at the app to see if it slows down or crashes when lots of people use it at once.',
        },
        {
            icon: <BugReportIcon fontSize="small" />,
            title: 'Stress Testing',
            summary: `We intentionally push the app way past its normal limits to see how it handles extreme situations. (i.e. simulating thousands of users logging in at the same time, uploading massive files, maxing out the database with huge amounts of data, etc). The goal is to figure out how the app fails, and whether it does so in a controlled way (without corrupting data or locking up).`,
        },
        {
            icon: <BugReportIcon fontSize="small" />,
            title: 'Crash Recovery Testing',
            summary: 'We shut things off and restart them to test whether the app comes back online without losing progress or data.',
        },
        {
            icon: <BugReportIcon fontSize="small" />,
            title: 'Database Backup Testing',
            summary: 'We check that backups are actually happening and that we can restore everything if something goes wrong.',
        },
        {
            icon: <BugReportIcon fontSize="small" />,
            title: 'Logging Verification',
            summary: 'We make sure the app is keeping a record of what is happening — especially errors — so we can debug problems later.',
        },
        {
            icon: <BugReportIcon fontSize="small" />,
            title: 'Monitoring & Alerts',
            summary: 'We confirm the app sends alerts when something breaks, slows down, or behaves in a weird way.',
        },
        {
            icon: <BugReportIcon fontSize="small" />,
            title: 'Security Check',
            summary: 'We test things like passwords, permissions, and data privacy to make sure users are protected.',
        },
        {
            icon: <BugReportIcon fontSize="small" />,
            title: 'Environment Setup Check',
            summary: 'We double-check that all the app’s settings are correct for launch—like links, API keys, and file paths.',
        },
        {
            icon: <BugReportIcon fontSize="small" />,
            title: 'Fix & Re-Test',
            summary: 'If anything failed, we fix it and run the tests again to make sure the app is ready.',
        },
        {
            icon: <RocketLaunchIcon fontSize="small" />,
            title: 'Production Launch',
            summary: 'Everything works. Everyone signs off. We go live and let real users in.',
        },
    ]

    const opsTestingAspects: CarouselItem[] = [
        {
            title: 'User Simulation',
            description: 'We interact with the app like a real person would—clicking buttons, navigating pages, and completing tasks—to find broken or confusing flows.',
            icon: <PeopleAltIcon fontSize="large" color="primary" />,
        },
        {
            title: 'Load Testing',
            description: 'We simulate lots of people using the app at the same time to see if it slows down, freezes, or crashes under pressure.',
            icon: <SpeedIcon fontSize="large" color="primary" />,
        },
        {
            title: 'Stress Testing',
            description: 'We push the app beyond what it’s designed to handle—thousands of users, huge uploads, or terrible internet—to see what breaks and how gracefully it fails.',
            icon: <TrendingUpIcon fontSize="large" color="primary" />,
        },
        {
            title: 'Crash Recovery',
            description: 'We purposely shut down or break parts of the system to see if the app can recover on its own without losing progress or data.',
            icon: <ReplayIcon fontSize="large" color="primary" />,
        },
        {
            title: 'Backup & Restore',
            description: 'We test whether the system is creating backups properly and whether we can fully restore everything if disaster strikes.',
            icon: <BackupIcon fontSize="large" color="primary" />,
        },
        {
            title: 'Logging',
            description: 'We make sure the app is keeping a record of what’s happening, especially when errors occur, so developers can debug problems.',
            icon: <DescriptionIcon fontSize="large" color="primary" />,
        },
        {
            title: 'Monitoring & Alerts',
            description: 'We confirm that alerts are triggered when something goes wrong, like a crash or traffic spike, so the team can fix it quickly.',
            icon: <NotificationsActiveIcon fontSize="large" color="primary" />,
        },
        {
            title: 'Security Check',
            description: 'We test things like passwords, permissions, and sensitive data to make sure users are protected and nothing is exposed.',
            icon: <SecurityIcon fontSize="large" color="primary" />,
        },
        {
            title: 'Environment Config',
            description: 'We double-check that production settings—like API keys, file paths, and timeouts—are properly set before launch.',
            icon: <SettingsIcon fontSize="large" color="primary" />,
        },
    ];

    return (
        <ConceptWrapper
            title={"Operation Testing (Ops Testing)"}
            description={"Operational testing checks whether our application can actually survive and perform in the real world. It's like stress-testing a building before opening it to the public — we're making sure the lights stay on, the alarms go off if something breaks, and there's a plan in place if the power goes out."}>
            <Section title={"Parts of Ops Testing"} subtitle="Operational testing isn't just one test — it's a series of checks. Each of them are described here.">
                <Carousel items={opsTestingAspects}/>
            </Section>
            
            <Section title={"Timeline"} subtitle="These are the key steps that happen before, during and after ops testing.">
                <Timeline steps={timelineSteps} />
            </Section>
        </ConceptWrapper>
    );
}
