# Hack\_the\_day











🍃 Smart Chef — Smart Waste Food Recipe Generator



Turn Leftover Food into Delicious Recipes with AI.



Smart Chef is an AI-powered web application that transforms leftover food ingredients into creative, practical recipes using Google's Gemini AI. The platform helps users reduce household food waste, discover new cooking ideas, and make better use of available ingredients.



\---



📌 Project Overview



Food waste is a growing global problem. A significant amount of edible food is discarded every day because people do not know how to reuse leftover ingredients.



WasteLess AI addresses this problem through an intelligent recipe generation platform. Users can enter their available leftover ingredients, customize their food preferences, and receive AI-generated recipes with cooking instructions, preparation time, and estimated nutritional information.



🎯 Main Objectives



\- Reduce avoidable food waste.

\- Transform leftover ingredients into useful recipes.

\- Provide personalized AI-generated cooking suggestions.

\- Encourage sustainable food consumption.

\- Make cooking easier and more accessible.



✨ Key Features



1\. AI Recipe Generator



\- Generate recipes from leftover ingredients.

\- Get creative cooking suggestions.

\- Receive step-by-step cooking instructions.

\- View estimated preparation and cooking times.



2\. Smart Ingredient Understanding



\- Understand combinations of available ingredients.

\- Identify possible ingredient substitutions.

\- Suggest alternative ways to reuse leftovers.



3\. Personalized Recipes



\- Customize recipes based on food preferences.

\- Support vegetarian and non-vegetarian preferences.

\- Adjust recipe suggestions based on available ingredients.



4\. Explore Recipes



\- Discover previously generated recipes.

\- Explore different cooking ideas.

\- Filter recipes by category and preferences.



5\. Saved Recipes



\- Save favorite AI-generated recipes.

\- Access saved recipes anytime.

\- Manage personal recipe collections.



6\. Waste Tracker



\- Track leftover ingredients.

\- Monitor food reuse activity.

\- Estimate the amount of food waste avoided.



7\. Food Image Understanding



\- Upload food images.

\- Use AI vision capabilities to identify possible ingredients.

\- Generate recipe suggestions from identified ingredients.



🛠️ Technology Stack



Technology| Purpose

React.js| Frontend development

HTML5| Web structure

CSS3| Styling and responsive design

JavaScript| Frontend functionality

Python| Backend programming

Django| Backend framework

Django REST Framework| REST API development

Google Gemini API| AI recipe generation

PostgreSQL| Database management

Axios| API communication

Git \& GitHub| Version control



🏗️ System Architecture



&#x20;            USER

&#x20;              |

&#x20;              v

&#x20;      REACT FRONTEND

&#x20;              |

&#x20;              v

&#x20;       AXIOS API REQUEST

&#x20;              |

&#x20;              v

&#x20;      DJANGO BACKEND

&#x20;         /         \\

&#x20;        v           v

&#x20;  GEMINI API    POSTGRESQL

&#x20;        |           |

&#x20;        v           v

&#x20;  AI GENERATED   STORED DATA

&#x20;     RECIPES

&#x20;        |

&#x20;        v

&#x20;  DJANGO REST API

&#x20;        |

&#x20;        v

&#x20;   REACT FRONTEND

&#x20;        |

&#x20;        v

&#x20;   DISPLAY RESULTS



📂 Project Structure



wasteless-ai/

│

├── frontend/

│   ├── public/

│   ├── src/

│   │   ├── assets/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── services/

│   │   ├── App.js

│   │   ├── App.css

│   │   └── index.js

│   ├── .env.example

│   ├── .gitignore

│   └── package.json

│

├── backend/

│   ├── backend/

│   │   ├── settings.py

│   │   ├── urls.py

│   │   └── wsgi.py

│   ├── recipes/

│   ├── manage.py

│   ├── requirements.txt

│   └── .env.example

│

└── README.md



⚙️ Installation \& Setup



Prerequisites



Install the following:



\- Node.js (LTS)

\- Python 3.x

\- PostgreSQL

\- Git

\- Visual Studio Code



1\. Clone Repository



git clone YOUR\_REPOSITORY\_URL

cd wasteless-ai



2\. Frontend Setup



cd frontend

npm install



Create a ".env" file:



REACT\_APP\_API\_URL=http://127.0.0.1:8000/api



Start React:



npm start



3\. Backend Setup



Open another terminal:



cd backend

python -m venv venv



Activate virtual environment:



Windows:



venv\\Scripts\\activate



Install dependencies:



pip install -r requirements.txt



4\. Environment Configuration



Create a ".env" file inside the backend folder:



SECRET\_KEY=your\_django\_secret\_key

DEBUG=True



DB\_NAME=waste\_food\_db

DB\_USER=postgres

DB\_PASSWORD=your\_database\_password

DB\_HOST=localhost

DB\_PORT=5432



GEMINI\_API\_KEY=your\_gemini\_api\_key



Never commit actual API keys, database passwords, or secret keys to GitHub.



5\. Database Migration



python manage.py makemigrations

python manage.py migrate



6\. Run Django Server



python manage.py runserver



7\. Access Application



\- Frontend: http://localhost:3000

\- Backend: http://127.0.0.1:8000

\- Django Admin: http://127.0.0.1:8000/admin



🤖 AI Integration



WasteLess AI integrates Google's Gemini API to provide intelligent recipe generation.



The AI system processes:



1\. Available leftover ingredients.

2\. User food preferences.

3\. Dietary requirements.

4\. Cooking preferences.

5\. Ingredient substitution requests.



The Gemini API generates structured recipe suggestions containing:



\- Recipe name

\- Required ingredients

\- Cooking instructions

\- Preparation time

\- Estimated nutritional information

\- Food safety guidance



Note: AI-generated nutrition values are estimates. Food safety must not be determined solely by AI predictions.



🔐 Security



\- Store API keys in backend environment variables.

\- Never expose Gemini API credentials in React.

\- Use Django authentication and permission controls.

\- Validate user inputs.

\- Configure CORS securely.

\- Keep production DEBUG mode disabled.



🌱 Expected Impact



\- Encourage responsible food consumption.

\- Reduce avoidable household food waste.

\- Increase awareness of food reuse.

\- Help users discover creative recipes.

\- Promote sustainable cooking habits.



🚀 Future Enhancements



\- Advanced food image recognition.

\- Voice-based cooking assistant.

\- Multilingual recipe generation.

\- Personalized AI cooking recommendations.

\- Advanced nutrition analysis.

\- Smart food expiry reminders.

\- More detailed food waste analytics.



👨‍💻 Development



Project Name: WasteLess AI



Project Category: Artificial Intelligence / Sustainable Technology



Primary AI Technology: Google Gemini API



Frontend: React.js



Backend: Django REST Framework



Database: PostgreSQL



📄 License



This project is intended for educational, research, and innovation purposes.



A formal open-source license can be added when the project licensing terms are finalized.



\---



Smart Chef — Save Food. Reduce Waste. Cook Smarter. 🍃

