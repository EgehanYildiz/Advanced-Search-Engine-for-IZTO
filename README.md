# Advanced-Search-Engine-for-İZTO (Web App for PCs)

#### To access the project, click here: https://advanced-search-engine-for-izto.vercel.app/ -> Please note that there may be a delay of approximately 50 seconds due to the deployment platforms used.
#### Only for PCs!

## Izmir Chamber of Commerce (İZTO): 

The Izmir Chamber of Commerce (İZTO) is a well-established non-governmental organization that brings together commercial and industrial enterprises operating in Izmir. Founded in 1885, İZTO is one of the largest chambers of commerce in Turkey, working to organize, develop, and protect the interests of its members within the commercial life of Izmir.

İZTO consists of 80 different committees. These committees are organizations where companies operating in various sectors of Izmir come together in similar business fields. Each committee is structured according to the characteristics of its sector and aims to address the issues faced by its members, develop their commercial activities, and enhance intra-sector solidarity.

Among İZTO's duties are supporting the commercial activities of its members, conducting sectoral research, promoting local and international cooperation, and carrying out efforts to increase Izmir's trade volume. Additionally, İZTO organizes training sessions, provides consultancy services, and mediates in commercial disputes to meet the various needs of its members.

On İZTO's public website, there is a section where individuals can access information about companies registered with the Izmir Chamber of Commerce. This section is an important resource for individuals and businesses seeking information about commercial activities in Izmir.

## Origin of the Project:
- On the Izmir Chamber of Commerce's (İZTO) public website, there is a section under "Online İşlemler". Here, there is a section called "Oda Sicil İşlemleri" and within this section there is a subsection called "Oda Sicil Üye Firma Sorgulama" where individuals can query companies registered with the Izmir Chamber of Commerce.
- The hierarchy works as follows: Sectors -> Committees -> Companies. In other words, multiple committees emerge from a sector, and these committees are groups of companies engaged in similar business activities.
- On the currently public website of the Izmir Chamber of Commerce, individuals can query and learn about companies from the database using information such as "Commercial No", "Chamber Registration No", "District Code", "Title", and "Occupational Group".
- While this system works in practice, it is insufficient for complex queries because it only operates based on exact matches. For example, you must know the exact commercial number, chamber registration number, district code, or the exact title of the company you want to look up in the database; partial input is not enough. The "Occupational Group" section allows queries via a dropdown menu (as of 16.08.2024).
- However, to perform more complex queries among committees, additional filters are necessary. In essence, a more sophisticated filtering system that produces better results could be presented to users with a more refined UI.
- The purpose of this project is to enable users to query the companies they have in mind through more complex filters. For example, if a user wants to query a list of companies whose district name starts with "B" and whose occupational group number is between 30 and 60, this cannot be done with the current system. The project you are currently examining addresses this issue.

Query system access link: https://eoda.izto.org.tr/web/uye_firmalar_yeni.aspx

You can click the link above and try querying for yourself. The only advanced feature this web application, which operates under the Chamber of Commerce, currently has over the application you are reviewing is the ability to save queries to Excel. This feature will be added to this application in future versions.

## Example Scenerio & How the Project Functions:

In this web application, users can choose from nine main condition areas, each equipped with an on/off toggle button. Each main condition area contains subconditions. For example, a user might want to query companies registered in districts where the name starts with the letter "B" and also require that the companies' occupational group numbers fall between 30 and 60. To do this, the user would use the on/off toggles to activate the "Occupational Group Number" and "District Name" main condition areas, meaning these two areas will be active while the other seven areas will be inactive. Filters in inactive areas will be ignored, meaning parameters from these areas will not be considered.

Next, in the active "District Name" condition area, the user would check the "Starts with" box and enter the letter "B." Similarly, in the active "Occupational Group Number" main condition area, the user would check and activate the "Between ... and ..." box, entering the parameters 30 and 60. Inactive checkboxes within active main condition areas will be disregarded, so any parameters from these will not influence the filtering process.

These selected conditions and subconditions will be converted into a request on the backend, which will then modify the SQL query accordingly. If the user wants to perform more complex filtering, they can activate additional main condition areas. Each main condition area corresponds to a column in the database, while the subconditions modify the SQL query by determining the operation to be performed on that column.

## Tech Stack and Technical Overview

### Backend:
- **Flask**: The backend of the application is built using Flask, a lightweight yet powerful web framework for Python. Flask is used to create a RESTful API that handles incoming HTTP requests, manages routing, and connects seamlessly with the database. Its simplicity and flexibility make it an excellent choice for this project.
  
- **SQLAlchemy**: For database management, the application utilizes SQLAlchemy, a sophisticated ORM (Object-Relational Mapping) library. SQLAlchemy abstracts the complexities of database operations by allowing Python developers to work with database records as Python objects. It enables dynamic query construction and complex filtering logic, which are essential for the advanced search functionalities of this project.

- **MySQL**: The relational database management system used in this application is MySQL. MySQL is renowned for its reliability, performance, and ease of use. The database schema is designed to efficiently store and query structured data, particularly the company records being managed. During development, MySQL Workbench is employed for local database management, while the production environment will utilize a remote MySQL database, ensuring data availability and security.

- **Pandas**: Pandas, a powerful data manipulation library in Python, plays a crucial role in the ETL (Extract, Transform, Load) processes of this project. It is utilized in scripts that handle data cleaning, transformation, and preparation before importing it into the database. Pandas excels in processing and converting Excel and CSV files, enabling the creation of structured datasets from raw inputs. These datasets are then imported into the MySQL database, ensuring that the data is accurate and well-organized for subsequent querying and analysis. The trio of scripts leveraging Pandas streamlines the entire ETL workflow, making the data ingestion process both efficient and scalable.

### Frontend:
- **HTML/CSS/JavaScript**: The frontend is constructed using standard web technologies. HTML provides the structure of the web pages, CSS enhances the visual styling, and JavaScript adds dynamic interactivity. The UI is designed with a focus on user experience, enabling users to apply complex filters easily and view results in real-time.

- **AJAX**: AJAX (Asynchronous JavaScript and XML) is used to handle asynchronous data exchanges between the frontend and backend without needing to refresh the page. This technology is critical for maintaining a responsive user interface, especially when executing and retrieving results from complex database queries.

- **REACT**: React is a powerful JavaScript library utilized to build the frontend of the web application. It allows for efficient and flexible development by enabling the creation of reusable UI components. React’s component-based architecture simplifies the process of managing complex user interfaces and ensures a seamless, dynamic user experience.
  
### Testing:
- **POSTMAN**: The backend part is tested with POSTMAN when frontend was missing. POSTMAN is a popular API testing tool used by developers to send requests to the backend server and receive responses, enabling them to test the functionality of APIs.

### Deployment:
- **Vercel**: Vercel is the chosen platform for deploying the frontend of the application. Vercel is well-suited for modern web applications, offering seamless integration with frontend frameworks and providing a streamlined deployment process. The Flask backend will be connected through API routes hosted either on Vercel or a suitable backend hosting service.

- **Render**: Render is considered for deploying the Flask backend. It offers easy deployment options for web services and APIs, providing automatic SSL, custom domains, and a straightforward CI/CD pipeline. Render’s flexibility allows for seamless integration with Vercel, ensuring that both the frontend and backend work together cohesively.
  
- **AWS RDS (Amazon Relational Database Service)**: AWS RDS is utilized for managing the application’s relational database. It offers scalable, secure, and high-performance database solutions, ensuring that the data is reliably stored and easily accessible. AWS RDS supports MySQL, which is used to manage the application's data, and offers automated backups, software patching, and monitoring to maintain the database's health and security.

**Note:** All deployment services have been carefully selected to ensure that the application is fully built and deployed at no cost.
  
### Workflow:
1. **User Interaction**: Users interact with a carefully designed UI consisting of nine main condition areas, each corresponding to a specific database column. Each area can be toggled on or off, and users can select from various subconditions to apply specific filters.
   
2. **Backend Processing**: The user’s filter selections are transmitted to the backend via an AJAX request. The Flask application processes these filters and dynamically builds an SQL query using SQLAlchemy. The modular filtering approach allows for complex and precise query customization.

3. **Database Query**: The dynamically constructed query is executed against the MySQL database. SQLAlchemy’s ORM capabilities ensure that the data retrieved is fully aligned with the filters applied by the user.

4. **Results Display**: The filtered results are returned to the frontend, where they are displayed in a scrollable interface. Users can easily browse through the companies that match their search criteria. Users can also export filtered results to Excel, further enhancing data accessibility.

### Downsides of the Project:
- **Non-automated Database / No pipeline**: The system currently lacks an automated build pipeline that continuously monitors and updates the database with new company entries. As an intern without access to IZTO’s internal company entry systems, I am unable to implement a real-time update mechanism. Consequently, the database is static and reflects all publicly available data as of August 22, 2024. However, I have developed the necessary scripts that, if provided with a trigger, would enable the creation of such a pipeline.

- **Mobile Responsiveness**: While the application could be made mobile-responsive, this feature was not prioritized due to the limited timeframe of the project (completed within 8 days). After discussing with my supervisor, we agreed to focus on other core aspects of the internship. Mobile responsiveness could be implemented with further adjustments to the CSS, leveraging media queries, percentage-based layouts, viewport height (vh), and modern layout techniques such as flexbox and grid.
