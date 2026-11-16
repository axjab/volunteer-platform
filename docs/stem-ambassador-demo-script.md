# STEM Ambassador demo script — revised

> **Demo framing:** The live application is a front-end proof of concept. Catalogue interactions and the sign-up confirmation are simulated in the browser. Profile, activity, reward, progress and leaderboard views are illustrative seeded data; they are not live employee records or verified impact reporting. Avoid claiming that the prototype sends confirmation emails, writes registrations to a central database, records attendance, or integrates with Thales identity, HR or partner systems.

## Mission in Action

**Ahmad**

Hi, I’m Ahmad, a cybersecurity analyst at Thales. I’d like to use one of my volunteer days to share my experience with students. The STEM Ambassador platform is intended to make it easier to discover an opportunity that fits my interests and availability.

**[Open https://stem-ambassador.xyz. Navigate to Catalogue.]**

I start in the opportunity catalogue. Here I can browse the STEM activities that are available to employees.

**[Show the catalogue. Type a search term or apply a category, format and location filter.]**

I can narrow the list by STEM area, delivery format — in person, virtual or hybrid — and location. For this example, I’ll look for a cybersecurity activity in Ottawa.

**[Select “Cybersecurity Workshop Ambassador”, then choose “Learn More”.]**

The opportunity details show the age group, format, location, duration, expected participants and the intended impact. It also describes the kind of contribution I would make: sharing my experience, explaining real-world applications and helping students discover STEM career pathways.

**[Choose “Sign Up”.]**

I enter or review the contact details in the sign-up form and confirm my interest. The prototype then displays an on-screen sign-up confirmation.

**Demo note:** The displayed profile details are sample data. The current prototype simulates the sign-up in the browser; it does not send an email or create a centrally stored registration. In the intended service, this step would be connected to Thales identity and the programme's opportunity-management process.

**Nathan**

The goal is to keep the employee's part straightforward: find an opportunity, understand what is expected and register their interest. Once an activity is confirmed, the programme team and delivery partner would coordinate the school, teachers, timing and classroom arrangements. The ambassador can then focus on sharing their experience with students.

For example, a cybersecurity session could help students understand how cybersecurity protects critical systems, how STEM is used to solve real-world problems, and the different career paths available in a company like Thales.

**[Navigate to Profile.]**

The profile gives an example of how an employee's volunteering story could be presented: activities, hours, participants reached and recognition milestones.

**[Point to the milestone progress and reward history. Optionally open Progress or Rewards.]**

The progress and rewards sections illustrate how participation could be recognised over time, with completed activities, progress towards milestones and badges. These screens currently use illustrative sample data; hours and student reach are not automatically updated from a completed event in this prototype.

**[Optionally open Leaderboard.]**

The leaderboard is another proposed engagement mechanism. It illustrates how teams or departments could celebrate participation. For a real programme, this would need agreed rules, validated data and appropriate employee privacy controls.

**Nathan — transition to pilot scope**

This is the experience we want to test: making opportunities easier to find, making registration simpler, and giving employees and programme owners a clearer view of participation. The next step is to validate this workflow with a bounded pilot and connect the prototype to the people and processes that would operate the programme.

## Presenter checklist

- Open the deployed application before the presentation; confirm it loads and the catalogue is populated.
- Use the “Cybersecurity Workshop Ambassador” opportunity; it is present in the seeded opportunity data.
- Demonstrate the category / format / location filters and the Learn More and Sign Up modals.
- Treat the confirmation as an on-screen prototype response, not an email notification.
- Use Profile, Progress, Rewards and Leaderboard only as illustrative screens; the underlying records are mock data.
- Do not claim live attendance logging, automatic hour accrual, student-impact verification, employee SSO, central registration storage, partner integration or email delivery.
- If the live site behaves differently from the repository version, follow the live application and update this script after checking the deployed build.
