'use client';

import { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ConceptWrapper from '../../../../../components/common/ConceptWrapper';
import Timeline, { TimelineStep } from '../../../../../components/common/Timeline';
import Section from '../../../../../components/common/Section';
import PhoneFrame from '../../../../../components/common/PhoneFrame';
import MockTestingApp from '../../../../../components/common/MockTestingApp';
import UserAcceptanceTestingCheckList from './UserAcceptanceTestingCheckList';
import "../../../../styles/common.css"
import ScrumBoard from '../../../../../components/common/ScrumBoard';
import userStories from "./data/UserStories.json"
import UserAcceptanceTestCreator, { UATTest } from './UserAcceptanceTestCreator';

const timelineSteps: TimelineStep[] = [
  {
    icon: <ChecklistIcon fontSize="small" />,
    title: 'Create Test Cases',
    summary: 'Each user story is translated into a testable scenario with clear, expected outcomes.',
  },
  {
    icon: <PlayCircleIcon fontSize="small" />,
    title: 'Execute Tests',
    summary: 'Real users simulate real-world use of the system, walking through the tests as if they were actual users.',
  },
  {
    icon: <FeedbackIcon fontSize="small" />,
    title: 'Collect Feedback',
    summary: 'Testers report issues, confusion points, and usability concerns. Developers fix the bugs, then tests are rerun.',
  },
  {
    icon: <CheckCircleIcon fontSize="small" />,
    title: 'Sign Off',
    summary: 'After all test cases pass and feedback is addressed, the product owner signs off for production release.',
  },
];


export default function UserAcceptanceTestingConcept() {
  const [uatTests, setUatTests] = useState<UATTest[]>([]);

  return (
    <>
      <ConceptWrapper
        title={"User Acceptance Testing (UAT)"}
        description={"The final check to make sure an application works for real users in the real world. It's like taking a car for a test drive before buying—if everything runs smoothly and meets expectations, it's ready to launch."}
      >
        <Section title={'Steps in UAT'} subtitle={"This timeline highlights the key stages involved in this process."}>
          <Timeline steps={timelineSteps} />
        </Section>
      </ConceptWrapper>

      <ConceptWrapper
        title={"Example Scenario"}
        description={"Your Agile team has just about finished coding and testing an app, and is nearly ready to deploy it out to the public. One of the last things you all need to do is to put it through user acceptance testing."}
      >
        <Section title={"The App"} subtitle={"This is a simple task management app designed to help users organize and prioritize their to-dos. Take a second to familiarize yourself with it."}>
          <PhoneFrame><MockTestingApp /></PhoneFrame>
        </Section>

        <Section
          title={"Time for UAT"}
          subtitle={"To get an idea of how user acceptance testing works, you'll be filling a couple of the roles that are involved in UAT: a test-writer, a tester, and a feedback-taker."}
        />

        <Section
          title={"Role 1: Test-Writer"}
          className={"double-column"}
          subtitle={"For the first role, imagine you're a person writing the user acceptance tests. Your job is to take each user story and write simple, testable scenarios that confirm the app behaves the way a real person would expect. An example test has been provided."}
        >
          <ScrumBoard className={"half-width"} visibleColumn={"Done"} userStories={userStories.userStories} scrumBoardLabel={"User Stories"} />
          <UserAcceptanceTestCreator onTestsChange={setUatTests} />
        </Section>

        <Section
          title={"Role 2: Tester"}
          subtitle={"This time, imagine you're the person performing the user acceptance tests. Your role is to walk through each test case as if you were the actual user, verifying that the app functions as expected. Follow the outlined workflows closely—but also stay alert for anything broken, unexpected or confusing that might impact the user experience."}
          className="double-column"
        >
          <PhoneFrame><MockTestingApp /></PhoneFrame>
          <UserAcceptanceTestingCheckList workflows={uatTests} />
        </Section>

        <Section
          title={"Role 3: Feedback-Taker"}
          subtitle={"For this role, imagine you're the person collecting feedback from testers. Your role is to review their notes and look for patterns—common issues, repeated confusion points, or missing features. Focus on identifying trends that could guide meaningful improvements to the app's usability and functionality."}
          className="double-column"
        >
          <TextField
            label="Trends"
            fullWidth
            multiline
          />
        </Section>
      </ConceptWrapper>
    </>
  );
}
