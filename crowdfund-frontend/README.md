# CrowdFund : A Social Cause Crowdfunding Platform

## Description

A platform that allows users to create and support social causes through donations. It integrates storytelling, transparency, and gamification to inspire action and build trust.

## Key Features

### User Accounts
* **Login/Signup**: Users can register or log in to the platform.

* **Authentication** : Uses JWT-based authentication.

### User Dashboard
* **My Causes**: Displays causes created by the user.

* **My Donations**: Lists causes the user has supported.

### Cause Management
* **Create Cause**: Users can create a cause with the following:

    - **Basic Information**: Title, category, target amount, start & end dates.
    - **Storytelling**: Description, image uploads, and updates.
    - **Milestones/Updates**: Timeline-based updates for transparency.

* **Cause Details**:

    Sections:
    - **Header**: Title, creator name, and category.
    - **Image Gallery**: Displays uploaded images.
    Progress Details: Visual progress bar and funding details.
    - **Detailed Description**: Expandable story section.
    - **Donation Section**: Preset and custom donation amounts.
    - **Updates Timeline**: Chronological updates from the creator.
    - **Comments Section**: Users can add comments to causes.
    - **Donor List**: Displays the list of donors (anonymous or named).

* **Explore Causes**: View causes with filters (by category, more options coming in future versions) and sorting options.

### Donation Management
* Users can donate to causes using preset or custom amounts.
* Donor details are tracked in the backend, including anonymity preferences.
* Causes show the list of donors and their contributions (if not anonymous).
* Transparency & Engagement

* **Progress Tracking**:
    - Real-time funding progress.
    - Timeline updates for milestones.

* **Social Sharing**: Share causes on social media with a single click.

# Pages

## Home Page

* **Hero Section**: Highlights the platform’s purpose.
**Categories Section**: Displays available categories.
**Trending Causes**: Carousel of trending causes.

## Cause Details Page

Comprehensive view of a cause with all relevant information and actions.

## Dashboard

Tabular views of:

* **My Causes**: Editable list of causes created by the user.
* **My Donations**: Causes the user has supported.
Includes filters and sorting.

## Create Cause Page

**Multi-step form**:
* Basic Info like Title, target amount, dates, and category dropdown.

* Storytelling with upload images and write updates.
Preview the cause before submission.

## Authentication Pages

**Login Page**: JWT-based authentication for existing users.

**Register Page**: Allows new users to create an account.