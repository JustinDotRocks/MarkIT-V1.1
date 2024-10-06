# MarkIT

## Description

**MarkIT** is an interactive event space management application designed to
simplify the planning and organization of event layouts for event planners and
venue managers.

- **Live App**: [Use MarkIT](https://justindotrocks.github.io/MarkIT-V1.1/)  
   **GitHub Repository**: [GitHub Profile](https://github.com/JustinDotRocks/MarkIT-V1.1)

![image](https://github.com/user-attachments/assets/b44a7b2f-1380-4f25-a2da-e00c838506fc)

## Motivation

Having extensive experience in event management, I recognized the need for a
tool that streamlines the design and organization of event spaces. Traditional
methods can be time-consuming and lack flexibility. **MarkIT** was created to
provide an intuitive platform that addresses these challenges, making event
planning more effective and efficient.

## **Technologies Used**

MarkIT was developed utilizing **React** and **TypeScript** for a robust
frontend, **Tailwind CSS** for efficient styling, **Konva.js** for interactive
canvas rendering and local storage to store vendor and venue information.

## **About MarkIT**

MarkIT is an interactive tool that enhances event space planning and management
for event planners and venue managers. Key features include:

- **Venue Mode**: Design and customize event rooms by adding tables and
  features. Easily drag, drop (includes collision detection), reposition, rotate
  elements, and move the entire room to fit your layout. Assign vendors to
  tables directly from the options bar within Venue Mode. Control your layout by
  locking all objects to prevent changes or lock individual items while
  adjusting others.

## ![image](https://github.com/user-attachments/assets/a57de880-bdd1-47cb-8f36-b54a13051fa9)

- **Vendor Mode**: Efficiently manage your vendor list by adding vendor details
  such as names, products, descriptions, and electricity needs. Update vendor
  information anytime and sign in vendors upon arrival, which highlights their
  assigned tables in green.
  ![image](https://github.com/user-attachments/assets/13da0256-1b24-47e9-8ced-185f8f181a64)

---

## **How It Works**

1. **Getting Started**: Navigate to the "Venue" Mode to create and edit your
   room layout or the “Vendor” Mode to create and edit vendors.
2. **Adding Elements**: Use the toolbar to add tables and features to your
   layout. You can rotate and position elements as needed.
3. **Vendor Management**: In Vendor Mode, create and manage a vendor list, and
   sign vendors in upon arrival.
4. **Interactive Design**: Utilize the canvas to drag, lock, and rotate objects.
   Assign vendors to tables and sign them in upon arrival.

### Setup and Run

To run the project locally, follow these steps:

1. **Clone the Repository**:  
   git clone https://github.com/JustinDotRocks/MarkIT-V1.1
2. **Navigate to the Project Directory**:  
   cd markit
3. **Install Dependencies**:  
   yarn install
4. **Run the Development Server**:  
   yarn dev  
   The app should now be running at http://localhost:5173.

### Building for Production

To build the project for production, run:

yarn build

This will generate optimized static files in the dist directory.

### Deployment

The project is configured to be deployed on GitHub Pages using the gh-pages
package. To deploy the latest build, run:

yarn deploy

This command builds the project and pushes the dist directory to the gh-pages
branch.

---

## Upcoming Features

MarkIT is currently an MVP, and I will be continuously updating it over time.
Upcoming features include:

- **User Interface Enhancements**: Updating some small parts of the UI for a
  better user experience.
- **Improved Options Bar Positioning**: Refining the positioning of the Options
  Bar on desktop for optimal accessibility.
- **Backend Integration**: Implementing a database to save and load layouts and
  the vendor list (Module 3).
- **User Authentication**: Allowing users to create accounts and manage their
  event plans (Module 3).

---

### Acknowledgements

I want to express my deepest gratitude to **Andrew Reynolds**. You have been
instrumental every step of the way. Your unwavering support and guidance
throughout the entire project made all the difference. I couldn't have done it
without you, and I honestly can't thank you enough.

Special thanks to **Jan Mertlik** and **Sahand** for fostering an amazing
community at GetCoding that ensures students can thrive. You've created an
environment where opportunities like this are possible, and I’m grateful to be
part of it.

---

## Authors and Credits

- **Justin Smith** - _Initial work_ -
  [Justin Smith](https://github.com/JustinDotRocks)
