const preDefinedQuestions = {
    webdev: [
      {
        question: "What's your experience with HTML, CSS, and JavaScript?",
        options: [
          { text: "I'm just starting to learn the basics", score: 1 },
          { text: "I can build simple websites", score: 2 },
          { text: "I'm comfortable with complex layouts and interactions", score: 3 },
          { text: "I'm proficient in advanced concepts and frameworks", score: 4 }
        ]
      },
      {
        question: "How familiar are you with React or Vue.js?",
        options: [
          { text: "I've never used them", score: 1 },
          { text: "I've built a few small projects", score: 2 },
          { text: "I use them regularly for projects", score: 3 },
          { text: "I'm an expert and can teach others", score: 4 }
        ]
      },
      {
        question: "What's your experience with backend technologies?",
        options: [
          { text: "I only know frontend development", score: 1 },
          { text: "I understand basic Node.js or Python", score: 2 },
          { text: "I can build APIs and work with databases", score: 3 },
          { text: "I'm comfortable with microservices and architecture", score: 4 }
        ]
      },
      {
        question: "How do you approach responsive web design?",
        options: [
          { text: "I'm still learning about mobile-first design", score: 1 },
          { text: "I use CSS media queries for basic responsiveness", score: 2 },
          { text: "I implement fluid layouts and flexible grids", score: 3 },
          { text: "I design with accessibility and performance in mind", score: 4 }
        ]
      },
      {
        question: "What's your experience with version control (Git)?",
        options: [
          { text: "I'm new to version control", score: 1 },
          { text: "I know basic Git commands", score: 2 },
          { text: "I'm comfortable with branching and merging", score: 3 },
          { text: "I can manage complex workflows and collaboration", score: 4 }
        ]
      },
      {
        question: "How comfortable are you with CSS preprocessors like SASS?",
        options: [
          { text: "I don't use CSS preprocessors", score: 1 },
          { text: "I've tried them but don't use regularly", score: 2 },
          { text: "I use them in most projects", score: 3 },
          { text: "I'm expert in advanced features and mixins", score: 4 }
        ]
      },
      {
        question: "What's your experience with testing frameworks?",
        options: [
          { text: "I don't write tests for my code", score: 1 },
          { text: "I write basic unit tests occasionally", score: 2 },
          { text: "I regularly write unit and integration tests", score: 3 },
          { text: "I implement comprehensive test suites including E2E", score: 4 }
        ]
      },
      {
        question: "How familiar are you with Webpack or other build tools?",
        options: [
          { text: "I don't use build tools", score: 1 },
          { text: "I use them but don't configure myself", score: 2 },
          { text: "I can configure basic setups", score: 3 },
          { text: "I can optimize complex build configurations", score: 4 }
        ]
      },
      {
        question: "What's your experience with RESTful API design?",
        options: [
          { text: "I don't design APIs", score: 1 },
          { text: "I can consume APIs but not design them", score: 2 },
          { text: "I've designed simple APIs", score: 3 },
          { text: "I design robust, well-documented APIs", score: 4 }
        ]
      },
      {
        question: "How would you handle website performance optimization?",
        options: [
          { text: "I don't optimize performance", score: 1 },
          { text: "I implement basic optimizations", score: 2 },
          { text: "I use advanced techniques like lazy loading", score: 3 },
          { text: "I conduct comprehensive performance audits", score: 4 }
        ]
      },
      {
        question: "What's your experience with GraphQL?",
        options: [
          { text: "I don't use GraphQL", score: 1 },
          { text: "I've made queries but not set up servers", score: 2 },
          { text: "I've implemented basic GraphQL APIs", score: 3 },
          { text: "I'm expert in advanced GraphQL concepts", score: 4 }
        ]
      },
      {
        question: "How familiar are you with TypeScript?",
        options: [
          { text: "I don't use TypeScript", score: 1 },
          { text: "I've tried it but prefer JavaScript", score: 2 },
          { text: "I use it regularly in projects", score: 3 },
          { text: "I'm expert in advanced TypeScript features", score: 4 }
        ]
      },
      {
        question: "What's your experience with serverless architectures?",
        options: [
          { text: "I don't use serverless", score: 1 },
          { text: "I've deployed simple serverless functions", score: 2 },
          { text: "I've built applications using serverless", score: 3 },
          { text: "I design complex serverless architectures", score: 4 }
        ]
      },
      {
        question: "How would you implement authentication in a web app?",
        options: [
          { text: "I'd use basic session-based auth", score: 1 },
          { text: "I'd implement JWT tokens", score: 2 },
          { text: "I'd use OAuth with third-party providers", score: 3 },
          { text: "I'd implement advanced security measures", score: 4 }
        ]
      },
      {
        question: "What's your experience with WebSockets?",
        options: [
          { text: "I don't use WebSockets", score: 1 },
          { text: "I've implemented basic real-time features", score: 2 },
          { text: "I've built complex real-time applications", score: 3 },
          { text: "I optimize WebSocket performance at scale", score: 4 }
        ]
      },
      {
        question: "How familiar are you with Progressive Web Apps?",
        options: [
          { text: "I don't build PWAs", score: 1 },
          { text: "I've added basic PWA features", score: 2 },
          { text: "I've built full-featured PWAs", score: 3 },
          { text: "I implement advanced PWA capabilities", score: 4 }
        ]
      },
      {
        question: "What's your experience with CSS-in-JS solutions?",
        options: [
          { text: "I don't use CSS-in-JS", score: 1 },
          { text: "I've tried styled-components or similar", score: 2 },
          { text: "I use CSS-in-JS regularly", score: 3 },
          { text: "I'm expert in advanced CSS-in-JS patterns", score: 4 }
        ]
      },
      {
        question: "How would you handle internationalization in a web app?",
        options: [
          { text: "I don't implement i18n", score: 1 },
          { text: "I've used basic translation libraries", score: 2 },
          { text: "I've implemented full i18n solutions", score: 3 },
          { text: "I design complex multilingual architectures", score: 4 }
        ]
      },
      {
        question: "What's your experience with Web Components?",
        options: [
          { text: "I don't use Web Components", score: 1 },
          { text: "I've used existing web components", score: 2 },
          { text: "I've created custom web components", score: 3 },
          { text: "I build complex component libraries", score: 4 }
        ]
      },
      {
        question: "How would you optimize a website for SEO?",
        options: [
          { text: "I don't optimize for SEO", score: 1 },
          { text: "I implement basic meta tags", score: 2 },
          { text: "I follow comprehensive SEO best practices", score: 3 },
          { text: "I implement advanced SEO strategies", score: 4 }
        ]
      }
    ],
    datascience: [
      {
        question: "What's your experience with Python for data analysis?",
        options: [
          { text: "I'm just starting to learn Python", score: 1 },
          { text: "I can write basic scripts and use pandas", score: 2 },
          { text: "I'm comfortable with data manipulation and visualization", score: 3 },
          { text: "I'm proficient in advanced libraries and optimization", score: 4 }
        ]
      },
      {
        question: "How familiar are you with machine learning concepts?",
        options: [
          { text: "I've heard about it but haven't practiced", score: 1 },
          { text: "I understand basic algorithms like linear regression", score: 2 },
          { text: "I can implement various ML models and evaluate them", score: 3 },
          { text: "I can design and deploy production ML systems", score: 4 }
        ]
      },
      {
        question: "What's your experience with data visualization?",
        options: [
          { text: "I'm new to data visualization", score: 1 },
          { text: "I can create basic charts with matplotlib or seaborn", score: 2 },
          { text: "I create interactive dashboards with Plotly or Tableau", score: 3 },
          { text: "I design comprehensive analytics solutions", score: 4 }
        ]
      },
      {
        question: "How comfortable are you with statistics and probability?",
        options: [
          { text: "I have basic understanding of statistics", score: 1 },
          { text: "I can perform hypothesis testing and analysis", score: 2 },
          { text: "I understand advanced statistical concepts", score: 3 },
          { text: "I can design and interpret complex statistical models", score: 4 }
        ]
      },
      {
        question: "What's your experience with big data technologies?",
        options: [
          { text: "I work with small datasets in Excel/CSV", score: 1 },
          { text: "I use SQL databases for data analysis", score: 2 },
          { text: "I'm familiar with Spark or Hadoop ecosystems", score: 3 },
          { text: "I design scalable data pipelines and architectures", score: 4 }
        ]
      },
      {
        question: "How familiar are you with deep learning frameworks?",
        options: [
          { text: "I don't use deep learning", score: 1 },
          { text: "I've experimented with TensorFlow/PyTorch", score: 2 },
          { text: "I've implemented neural networks for projects", score: 3 },
          { text: "I design and optimize complex deep learning models", score: 4 }
        ]
      },
      {
        question: "What's your experience with natural language processing?",
        options: [
          { text: "I don't work with NLP", score: 1 },
          { text: "I've used basic text processing techniques", score: 2 },
          { text: "I've implemented NLP models for specific tasks", score: 3 },
          { text: "I design advanced NLP systems", score: 4 }
        ]
      },
      {
        question: "How would you approach feature engineering?",
        options: [
          { text: "I don't perform feature engineering", score: 1 },
          { text: "I perform basic feature selection", score: 2 },
          { text: "I create new features from existing data", score: 3 },
          { text: "I design comprehensive feature pipelines", score: 4 }
        ]
      },
      {
        question: "What's your experience with cloud-based data solutions?",
        options: [
          { text: "I don't use cloud data solutions", score: 1 },
          { text: "I've used basic cloud storage", score: 2 },
          { text: "I've implemented cloud-based data processing", score: 3 },
          { text: "I design complex cloud data architectures", score: 4 }
        ]
      },
      {
        question: "How familiar are you with time series analysis?",
        options: [
          { text: "I don't work with time series data", score: 1 },
          { text: "I've performed basic trend analysis", score: 2 },
          { text: "I've implemented forecasting models", score: 3 },
          { text: "I design advanced time series solutions", score: 4 }
        ]
      },
      {
        question: "What's your experience with A/B testing?",
        options: [
          { text: "I don't conduct A/B tests", score: 1 },
          { text: "I understand basic A/B testing concepts", score: 2 },
          { text: "I've designed and analyzed A/B tests", score: 3 },
          { text: "I implement complex experimental designs", score: 4 }
        ]
      },
      {
        question: "How would you handle missing data in a dataset?",
        options: [
          { text: "I remove rows with missing data", score: 1 },
          { text: "I use basic imputation techniques", score: 2 },
          { text: "I apply advanced imputation methods", score: 3 },
          { text: "I design custom solutions based on data context", score: 4 }
        ]
      },
      {
        question: "What's your experience with recommendation systems?",
        options: [
          { text: "I haven't built recommendation systems", score: 1 },
          { text: "I've implemented basic collaborative filtering", score: 2 },
          { text: "I've built hybrid recommendation systems", score: 3 },
          { text: "I design advanced personalized recommendation engines", score: 4 }
        ]
      },
      {
        question: "How familiar are you with MLOps practices?",
        options: [
          { text: "I don't use MLOps", score: 1 },
          { text: "I understand basic model deployment", score: 2 },
          { text: "I've implemented CI/CD for ML models", score: 3 },
          { text: "I design comprehensive MLOps pipelines", score: 4 }
        ]
      },
      {
        question: "What's your experience with computer vision?",
        options: [
          { text: "I don't work with computer vision", score: 1 },
          { text: "I've implemented basic image processing", score: 2 },
          { text: "I've built CNN models for vision tasks", score: 3 },
          { text: "I design advanced computer vision systems", score: 4 }
        ]
      },
      {
        question: "How would you evaluate model performance?",
        options: [
          { text: "I use basic accuracy metrics", score: 1 },
          { text: "I consider precision/recall/F1 scores", score: 2 },
          { text: "I use domain-specific evaluation metrics", score: 3 },
          { text: "I design custom evaluation frameworks", score: 4 }
        ]
      },
      {
        question: "What's your experience with graph databases?",
        options: [
          { text: "I don't use graph databases", score: 1 },
          { text: "I understand basic graph concepts", score: 2 },
          { text: "I've implemented graph-based solutions", score: 3 },
          { text: "I design complex graph analytics systems", score: 4 }
        ]
      },
      {
        question: "How familiar are you with reinforcement learning?",
        options: [
          { text: "I don't use reinforcement learning", score: 1 },
          { text: "I understand basic concepts", score: 2 },
          { text: "I've implemented RL solutions", score: 3 },
          { text: "I design advanced RL systems", score: 4 }
        ]
      },
      {
        question: "What's your experience with data storytelling?",
        options: [
          { text: "I don't focus on data storytelling", score: 1 },
          { text: "I create basic reports with insights", score: 2 },
          { text: "I craft compelling data narratives", score: 3 },
          { text: "I design interactive data storytelling experiences", score: 4 }
        ]
      },
      {
        question: "How would you approach anomaly detection?",
        options: [
          { text: "I use basic statistical methods", score: 1 },
          { text: "I implement standard algorithms", score: 2 },
          { text: "I design custom detection systems", score: 3 },
          { text: "I build real-time anomaly detection at scale", score: 4 }
        ]
      }
    ],
    cybersecurity: [
      {
        question: "What's your understanding of network security fundamentals?",
        options: [
          { text: "Basic awareness of concepts", score: 1 },
          { text: "Understand common protocols and threats", score: 2 },
          { text: "Can configure network security measures", score: 3 },
          { text: "Expert in advanced network security", score: 4 }
        ]
      },
      {
        question: "How familiar are you with encryption technologies?",
        options: [
          { text: "Basic understanding of encryption", score: 1 },
          { text: "Can implement common encryption methods", score: 2 },
          { text: "Understand cryptographic protocols", score: 3 },
          { text: "Expert in advanced cryptography", score: 4 }
        ]
      },
      {
        question: "What's your experience with penetration testing?",
        options: [
          { text: "No practical experience", score: 1 },
          { text: "Basic vulnerability scanning", score: 2 },
          { text: "Conducted penetration tests", score: 3 },
          { text: "Expert in advanced pen testing", score: 4 }
        ]
      },
      {
        question: "How would you handle a security breach?",
        options: [
          { text: "Would escalate to senior team", score: 1 },
          { text: "Follow basic incident response procedures", score: 2 },
          { text: "Lead incident response efforts", score: 3 },
          { text: "Design comprehensive breach response plans", score: 4 }
        ]
      },
      {
        question: "What's your experience with security compliance standards?",
        options: [
          { text: "Basic awareness of standards", score: 1 },
          { text: "Worked with one compliance framework", score: 2 },
          { text: "Implemented multiple compliance programs", score: 3 },
          { text: "Expert in regulatory requirements", score: 4 }
        ]
      },
      {
        question: "How familiar are you with malware analysis?",
        options: [
          { text: "Basic understanding of malware", score: 1 },
          { text: "Can perform static analysis", score: 2 },
          { text: "Can conduct dynamic analysis", score: 3 },
          { text: "Expert in advanced reverse engineering", score: 4 }
        ]
      },
      {
        question: "What's your experience with SIEM solutions?",
        options: [
          { text: "No practical experience", score: 1 },
          { text: "Basic monitoring with SIEM", score: 2 },
          { text: "Configured and managed SIEM", score: 3 },
          { text: "Designed SIEM architectures", score: 4 }
        ]
      },
      {
        question: "How would you secure a cloud environment?",
        options: [
          { text: "Would follow basic cloud security", score: 1 },
          { text: "Implement standard cloud security measures", score: 2 },
          { text: "Design cloud security architectures", score: 3 },
          { text: "Expert in advanced cloud security", score: 4 }
        ]
      },
      {
        question: "What's your experience with identity management?",
        options: [
          { text: "Basic understanding of IAM", score: 1 },
          { text: "Configured basic IAM policies", score: 2 },
          { text: "Implemented enterprise IAM solutions", score: 3 },
          { text: "Designed comprehensive IAM frameworks", score: 4 }
        ]
      },
      {
        question: "How familiar are you with threat intelligence?",
        options: [
          { text: "Basic awareness of threats", score: 1 },
          { text: "Consume threat intelligence feeds", score: 2 },
          { text: "Produce threat intelligence reports", score: 3 },
          { text: "Lead threat intelligence programs", score: 4 }
        ]
      },
      {
        question: "What's your experience with secure coding practices?",
        options: [
          { text: "Basic awareness of vulnerabilities", score: 1 },
          { text: "Follow OWASP Top 10 guidelines", score: 2 },
          { text: "Implement security in SDLC", score: 3 },
          { text: "Lead secure development initiatives", score: 4 }
        ]
      },
      {
        question: "How would you assess security risks?",
        options: [
          { text: "Follow basic risk assessment templates", score: 1 },
          { text: "Conduct qualitative risk assessments", score: 2 },
          { text: "Perform quantitative risk analysis", score: 3 },
          { text: "Design enterprise risk management programs", score: 4 }
        ]
      },
      {
        question: "What's your experience with forensic analysis?",
        options: [
          { text: "No practical experience", score: 1 },
          { text: "Basic forensic techniques", score: 2 },
          { text: "Conducted digital investigations", score: 3 },
          { text: "Expert in advanced forensics", score: 4 }
        ]
      },
      {
        question: "How familiar are you with zero trust architecture?",
        options: [
          { text: "Basic understanding of concept", score: 1 },
          { text: "Implemented components of zero trust", score: 2 },
          { text: "Designed zero trust networks", score: 3 },
          { text: "Expert in zero trust implementations", score: 4 }
        ]
      },
      {
        question: "What's your experience with security automation?",
        options: [
          { text: "No automation experience", score: 1 },
          { text: "Basic scripting for security tasks", score: 2 },
          { text: "Implemented security automation", score: 3 },
          { text: "Designed comprehensive automation frameworks", score: 4 }
        ]
      },
      {
        question: "How would you secure IoT devices?",
        options: [
          { text: "Basic understanding of IoT risks", score: 1 },
          { text: "Implement standard IoT security", score: 2 },
          { text: "Design IoT security architectures", score: 3 },
          { text: "Expert in advanced IoT security", score: 4 }
        ]
      },
      {
        question: "What's your experience with red team exercises?",
        options: [
          { text: "No red team experience", score: 1 },
          { text: "Participated in red team exercises", score: 2 },
          { text: "Led red team engagements", score: 3 },
          { text: "Designed comprehensive red team programs", score: 4 }
        ]
      },
      {
        question: "How familiar are you with container security?",
        options: [
          { text: "Basic understanding of containers", score: 1 },
          { text: "Implement basic container security", score: 2 },
          { text: "Design secure container architectures", score: 3 },
          { text: "Expert in advanced container security", score: 4 }
        ]
      },
      {
        question: "What's your experience with security awareness training?",
        options: [
          { text: "No training experience", score: 1 },
          { text: "Delivered basic security training", score: 2 },
          { text: "Developed training programs", score: 3 },
          { text: "Designed comprehensive awareness initiatives", score: 4 }
        ]
      },
      {
        question: "How would you approach API security?",
        options: [
          { text: "Basic understanding of API risks", score: 1 },
          { text: "Implement standard API security", score: 2 },
          { text: "Design secure API architectures", score: 3 },
          { text: "Expert in advanced API security", score: 4 }
        ]
      }
    ],
    cloud: [
      {
        question: "What's your experience with cloud service providers?",
        options: [
          { text: "Basic understanding of cloud concepts", score: 1 },
          { text: "Worked with one cloud provider", score: 2 },
          { text: "Experienced with multiple providers", score: 3 },
          { text: "Expert in multi-cloud architectures", score: 4 }
        ]
      },
      {
        question: "How familiar are you with IaaS solutions?",
        options: [
          { text: "Basic understanding of IaaS", score: 1 },
          { text: "Deployed basic IaaS resources", score: 2 },
          { text: "Designed IaaS solutions", score: 3 },
          { text: "Expert in complex IaaS deployments", score: 4 }
        ]
      },
      {
        question: "What's your experience with PaaS offerings?",
        options: [
          { text: "No practical experience", score: 1 },
          { text: "Used basic PaaS services", score: 2 },
          { text: "Designed applications for PaaS", score: 3 },
          { text: "Expert in PaaS architectures", score: 4 }
        ]
      },
      {
        question: "How would you approach cloud migration?",
        options: [
          { text: "Would follow basic migration guides", score: 1 },
          { text: "Migrated simple applications", score: 2 },
          { text: "Led complex migration projects", score: 3 },
          { text: "Designed enterprise migration strategies", score: 4 }
        ]
      },
      {
        question: "What's your experience with serverless computing?",
        options: [
          { text: "No serverless experience", score: 1 },
          { text: "Deployed simple serverless functions", score: 2 },
          { text: "Built serverless applications", score: 3 },
          { text: "Expert in serverless architectures", score: 4 }
        ]
      },
      {
        question: "How familiar are you with cloud networking?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Configured basic cloud networks", score: 2 },
          { text: "Designed complex cloud networks", score: 3 },
          { text: "Expert in advanced cloud networking", score: 4 }
        ]
      },
      {
        question: "What's your experience with cloud storage solutions?",
        options: [
          { text: "Used basic storage services", score: 1 },
          { text: "Configured different storage types", score: 2 },
          { text: "Optimized storage performance", score: 3 },
          { text: "Expert in storage architecture design", score: 4 }
        ]
      },
      {
        question: "How would you optimize cloud costs?",
        options: [
          { text: "Follow basic cost-saving tips", score: 1 },
          { text: "Use cost management tools", score: 2 },
          { text: "Implement cost optimization strategies", score: 3 },
          { text: "Design cost-efficient architectures", score: 4 }
        ]
      },
      {
        question: "What's your experience with cloud security?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Implemented security controls", score: 2 },
          { text: "Designed security architectures", score: 3 },
          { text: "Expert in cloud security", score: 4 }
        ]
      },
      {
        question: "How familiar are you with container orchestration?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Deployed containerized applications", score: 2 },
          { text: "Managed Kubernetes clusters", score: 3 },
          { text: "Expert in large-scale orchestration", score: 4 }
        ]
      },
      {
        question: "What's your experience with cloud monitoring?",
        options: [
          { text: "Used basic monitoring tools", score: 1 },
          { text: "Configured alerts and dashboards", score: 2 },
          { text: "Designed monitoring solutions", score: 3 },
          { text: "Expert in observability at scale", score: 4 }
        ]
      },
      {
        question: "How would you implement cloud automation?",
        options: [
          { text: "Basic scripting", score: 1 },
          { text: "Use infrastructure as code", score: 2 },
          { text: "Implement CI/CD pipelines", score: 3 },
          { text: "Design comprehensive automation", score: 4 }
        ]
      },
      {
        question: "What's your experience with hybrid cloud?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Worked with hybrid environments", score: 2 },
          { text: "Designed hybrid solutions", score: 3 },
          { text: "Expert in hybrid architectures", score: 4 }
        ]
      },
      {
        question: "How familiar are you with cloud databases?",
        options: [
          { text: "Used basic database services", score: 1 },
          { text: "Configured different database types", score: 2 },
          { text: "Optimized database performance", score: 3 },
          { text: "Expert in database architecture", score: 4 }
        ]
      },
      {
        question: "What's your experience with edge computing?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Deployed edge solutions", score: 2 },
          { text: "Designed edge architectures", score: 3 },
          { text: "Expert in edge computing", score: 4 }
        ]
      },
      {
        question: "How would you approach disaster recovery?",
        options: [
          { text: "Follow basic backup procedures", score: 1 },
          { text: "Implemented DR plans", score: 2 },
          { text: "Designed DR strategies", score: 3 },
          { text: "Expert in business continuity", score: 4 }
        ]
      },
      {
        question: "What's your experience with cloud governance?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Implemented governance policies", score: 2 },
          { text: "Designed governance frameworks", score: 3 },
          { text: "Expert in enterprise governance", score: 4 }
        ]
      },
      {
        question: "How familiar are you with AI cloud services?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Used pre-built AI services", score: 2 },
          { text: "Customized AI solutions", score: 3 },
          { text: "Expert in cloud AI architectures", score: 4 }
        ]
      },
      {
        question: "What's your experience with cloud certifications?",
        options: [
          { text: "No certifications", score: 1 },
          { text: "Entry-level certification", score: 2 },
          { text: "Professional certification", score: 3 },
          { text: "Multiple expert certifications", score: 4 }
        ]
      },
      {
        question: "How would you approach cloud-native development?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Built cloud-native applications", score: 2 },
          { text: "Designed cloud-native architectures", score: 3 },
          { text: "Expert in cloud-native patterns", score: 4 }
        ]
      }
    ],
    blockchain: [
      {
        question: "What's your understanding of blockchain fundamentals?",
        options: [
          { text: "Basic awareness of concepts", score: 1 },
          { text: "Understand how blockchain works", score: 2 },
          { text: "Can explain consensus mechanisms", score: 3 },
          { text: "Expert in blockchain theory", score: 4 }
        ]
      },
      {
        question: "How familiar are you with cryptocurrencies?",
        options: [
          { text: "Basic understanding of Bitcoin", score: 1 },
          { text: "Understand multiple cryptocurrencies", score: 2 },
          { text: "Can analyze crypto economics", score: 3 },
          { text: "Expert in cryptocurrency systems", score: 4 }
        ]
      },
      {
        question: "What's your experience with smart contracts?",
        options: [
          { text: "No practical experience", score: 1 },
          { text: "Written simple smart contracts", score: 2 },
          { text: "Developed complex dApps", score: 3 },
          { text: "Expert in smart contract security", score: 4 }
        ]
      },
      {
        question: "How would you approach blockchain security?",
        options: [
          { text: "Follow basic security practices", score: 1 },
          { text: "Implement standard security measures", score: 2 },
          { text: "Design secure blockchain architectures", score: 3 },
          { text: "Expert in advanced blockchain security", score: 4 }
        ]
      },
      {
        question: "What's your experience with consensus algorithms?",
        options: [
          { text: "Basic understanding of PoW/PoS", score: 1 },
          { text: "Understand multiple consensus models", score: 2 },
          { text: "Implemented custom consensus", score: 3 },
          { text: "Expert in consensus research", score: 4 }
        ]
      },
      {
        question: "How familiar are you with decentralized applications?",
        options: [
          { text: "Basic understanding of dApps", score: 1 },
          { text: "Used existing dApps", score: 2 },
          { text: "Developed dApps", score: 3 },
          { text: "Expert in dApp architecture", score: 4 }
        ]
      },
      {
        question: "What's your experience with blockchain platforms?",
        options: [
          { text: "Basic understanding of Ethereum", score: 1 },
          { text: "Worked with multiple platforms", score: 2 },
          { text: "Developed on different platforms", score: 3 },
          { text: "Expert in platform comparisons", score: 4 }
        ]
      },
      {
        question: "How would you approach token economics?",
        options: [
          { text: "Basic understanding of tokens", score: 1 },
          { text: "Can design simple token models", score: 2 },
          { text: "Designed complex token economies", score: 3 },
          { text: "Expert in tokenomics research", score: 4 }
        ]
      },
      {
        question: "What's your experience with blockchain scalability?",
        options: [
          { text: "Basic understanding of scaling issues", score: 1 },
          { text: "Understand layer 2 solutions", score: 2 },
          { text: "Implemented scaling solutions", score: 3 },
          { text: "Expert in scaling research", score: 4 }
        ]
      },
      {
        question: "How familiar are you with DeFi protocols?",
        options: [
          { text: "Basic understanding of DeFi", score: 1 },
          { text: "Used DeFi applications", score: 2 },
          { text: "Developed DeFi protocols", score: 3 },
          { text: "Expert in DeFi architecture", score: 4 }
        ]
      },
      {
        question: "What's your experience with NFTs?",
        options: [
          { text: "Basic understanding of NFTs", score: 1 },
          { text: "Created or traded NFTs", score: 2 },
          { text: "Developed NFT platforms", score: 3 },
          { text: "Expert in NFT standards", score: 4 }
        ]
      },
      {
        question: "How would you approach blockchain interoperability?",
        options: [
          { text: "Basic understanding of bridges", score: 1 },
          { text: "Understand cross-chain protocols", score: 2 },
          { text: "Implemented interoperability solutions", score: 3 },
          { text: "Expert in interoperability research", score: 4 }
        ]
      },
      {
        question: "What's your experience with zero-knowledge proofs?",
        options: [
          { text: "Basic understanding of ZKP", score: 1 },
          { text: "Understand zk-SNARKs/zk-STARKs", score: 2 },
          { text: "Implemented ZKP solutions", score: 3 },
          { text: "Expert in ZKP research", score: 4 }
        ]
      },
      {
        question: "How familiar are you with DAOs?",
        options: [
          { text: "Basic understanding of DAOs", score: 1 },
          { text: "Participated in DAOs", score: 2 },
          { text: "Developed DAO frameworks", score: 3 },
          { text: "Expert in DAO governance", score: 4 }
        ]
      },
      {
        question: "What's your experience with blockchain analytics?",
        options: [
          { text: "Basic blockchain exploration", score: 1 },
          { text: "Used blockchain explorers", score: 2 },
          { text: "Conducted chain analysis", score: 3 },
          { text: "Expert in blockchain forensics", score: 4 }
        ]
      },
      {
        question: "How would you approach privacy in blockchain?",
        options: [
          { text: "Basic understanding of privacy coins", score: 1 },
          { text: "Understand privacy protocols", score: 2 },
          { text: "Implemented privacy solutions", score: 3 },
          { text: "Expert in privacy research", score: 4 }
        ]
      },
      {
        question: "What's your experience with enterprise blockchain?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Worked with enterprise solutions", score: 2 },
          { text: "Developed enterprise blockchains", score: 3 },
          { text: "Expert in enterprise adoption", score: 4 }
        ]
      },
      {
        question: "How familiar are you with blockchain regulations?",
        options: [
          { text: "Basic awareness", score: 1 },
          { text: "Understand key regulatory issues", score: 2 },
          { text: "Advise on compliance", score: 3 },
          { text: "Expert in blockchain law", score: 4 }
        ]
      },
      {
        question: "What's your experience with oracles?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Used oracle services", score: 2 },
          { text: "Developed oracle solutions", score: 3 },
          { text: "Expert in oracle design", score: 4 }
        ]
      },
      {
        question: "How would you approach blockchain education?",
        options: [
          { text: "Self-learner", score: 1 },
          { text: "Completed formal courses", score: 2 },
          { text: "Teach blockchain concepts", score: 3 },
          { text: "Develop educational programs", score: 4 }
        ]
      }
    ],
    ai: [
      {
        question: "What's your understanding of machine learning fundamentals?",
        options: [
          { text: "Basic awareness of concepts", score: 1 },
          { text: "Understand supervised/unsupervised learning", score: 2 },
          { text: "Can implement various algorithms", score: 3 },
          { text: "Expert in ML theory", score: 4 }
        ]
      },
      {
        question: "How familiar are you with deep learning?",
        options: [
          { text: "Basic understanding of neural networks", score: 1 },
          { text: "Implemented basic neural networks", score: 2 },
          { text: "Designed complex architectures", score: 3 },
          { text: "Expert in deep learning research", score: 4 }
        ]
      },
      {
        question: "What's your experience with NLP?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Implemented text processing", score: 2 },
          { text: "Developed NLP models", score: 3 },
          { text: "Expert in advanced NLP", score: 4 }
        ]
      },
      {
        question: "How would you approach computer vision?",
        options: [
          { text: "Basic image processing", score: 1 },
          { text: "Implemented basic CV models", score: 2 },
          { text: "Developed complex vision systems", score: 3 },
          { text: "Expert in CV research", score: 4 }
        ]
      },
      {
        question: "What's your experience with reinforcement learning?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Implemented simple RL", score: 2 },
          { text: "Developed RL solutions", score: 3 },
          { text: "Expert in RL research", score: 4 }
        ]
      },
      {
        question: "How familiar are you with AI ethics?",
        options: [
          { text: "Basic awareness", score: 1 },
          { text: "Understand key ethical issues", score: 2 },
          { text: "Implement ethical AI practices", score: 3 },
          { text: "Expert in AI ethics research", score: 4 }
        ]
      },
      {
        question: "What's your experience with AI deployment?",
        options: [
          { text: "No deployment experience", score: 1 },
          { text: "Deployed simple models", score: 2 },
          { text: "Implemented production pipelines", score: 3 },
          { text: "Expert in MLOps", score: 4 }
        ]
      },
      {
        question: "How would you approach model interpretability?",
        options: [
          { text: "Use basic feature importance", score: 1 },
          { text: "Implement standard explainability", score: 2 },
          { text: "Design comprehensive interpretability", score: 3 },
          { text: "Expert in explainable AI", score: 4 }
        ]
      },
      {
        question: "What's your experience with transfer learning?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Used pre-trained models", score: 2 },
          { text: "Fine-tuned models for tasks", score: 3 },
          { text: "Expert in transfer learning research", score: 4 }
        ]
      },
      {
        question: "How familiar are you with generative AI?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Used generative models", score: 2 },
          { text: "Developed generative applications", score: 3 },
          { text: "Expert in generative AI research", score: 4 }
        ]
      },
      {
        question: "What's your experience with AI hardware?",
        options: [
          { text: "Basic awareness", score: 1 },
          { text: "Used GPUs for training", score: 2 },
          { text: "Optimized for specific hardware", score: 3 },
          { text: "Expert in AI hardware", score: 4 }
        ]
      },
      {
        question: "How would you approach data preparation for AI?",
        options: [
          { text: "Basic data cleaning", score: 1 },
          { text: "Feature engineering", score: 2 },
          { text: "Design data pipelines", score: 3 },
          { text: "Expert in data-centric AI", score: 4 }
        ]
      },
      {
        question: "What's your experience with AI in edge devices?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Deployed simple edge AI", score: 2 },
          { text: "Optimized models for edge", score: 3 },
          { text: "Expert in edge AI research", score: 4 }
        ]
      },
      {
        question: "How familiar are you with AI benchmarks?",
        options: [
          { text: "Basic awareness", score: 1 },
          { text: "Used standard benchmarks", score: 2 },
          { text: "Designed evaluation metrics", score: 3 },
          { text: "Expert in benchmark development", score: 4 }
        ]
      },
      {
        question: "What's your experience with AI in healthcare?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Worked on healthcare projects", score: 2 },
          { text: "Developed medical AI solutions", score: 3 },
          { text: "Expert in medical AI research", score: 4 }
        ]
      },
      {
        question: "How would you approach AI for robotics?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Implemented basic robotics AI", score: 2 },
          { text: "Developed complex robotic systems", score: 3 },
          { text: "Expert in robotics AI research", score: 4 }
        ]
      },
      {
        question: "What's your experience with AI in finance?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Worked on financial models", score: 2 },
          { text: "Developed trading algorithms", score: 3 },
          { text: "Expert in financial AI", score: 4 }
        ]
      },
      {
        question: "How familiar are you with AI regulations?",
        options: [
          { text: "Basic awareness", score: 1 },
          { text: "Understand compliance requirements", score: 2 },
          { text: "Implement regulatory measures", score: 3 },
          { text: "Expert in AI policy", score: 4 }
        ]
      },
      {
        question: "What's your experience with AI startups?",
        options: [
          { text: "No startup experience", score: 1 },
          { text: "Worked at an AI startup", score: 2 },
          { text: "Founded an AI startup", score: 3 },
          { text: "Expert in AI entrepreneurship", score: 4 }
        ]
      },
      {
        question: "How would you approach AI education?",
        options: [
          { text: "Self-learner", score: 1 },
          { text: "Completed formal courses", score: 2 },
          { text: "Teach AI concepts", score: 3 },
          { text: "Develop AI curricula", score: 4 }
        ]
      }
    ],
    mobile: [
      {
        question: "What's your experience with native mobile development?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Built simple native apps", score: 2 },
          { text: "Developed complex native apps", score: 3 },
          { text: "Expert in native development", score: 4 }
        ]
      },
      {
        question: "How familiar are you with cross-platform frameworks?",
        options: [
          { text: "Basic awareness", score: 1 },
          { text: "Built apps with Flutter/React Native", score: 2 },
          { text: "Developed complex cross-platform apps", score: 3 },
          { text: "Expert in cross-platform development", score: 4 }
        ]
      },
      {
        question: "What's your experience with mobile UI design?",
        options: [
          { text: "Basic UI implementation", score: 1 },
          { text: "Designed custom UI components", score: 2 },
          { text: "Created complex animations", score: 3 },
          { text: "Expert in mobile UX/UI", score: 4 }
        ]
      },
      {
        question: "How would you approach mobile performance optimization?",
        options: [
          { text: "Basic optimizations", score: 1 },
          { text: "Implemented standard optimizations", score: 2 },
          { text: "Designed performance strategies", score: 3 },
          { text: "Expert in mobile performance", score: 4 }
        ]
      },
      {
        question: "What's your experience with mobile APIs?",
        options: [
          { text: "Consumed simple APIs", score: 1 },
          { text: "Integrated multiple APIs", score: 2 },
          { text: "Designed API consumption patterns", score: 3 },
          { text: "Expert in mobile API architecture", score: 4 }
        ]
      },
      {
        question: "How familiar are you with mobile security?",
        options: [
          { text: "Basic awareness", score: 1 },
          { text: "Implemented standard security", score: 2 },
          { text: "Designed security architectures", score: 3 },
          { text: "Expert in mobile security", score: 4 }
        ]
      },
      {
        question: "What's your experience with offline capabilities?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Implemented offline storage", score: 2 },
          { text: "Designed offline-first apps", score: 3 },
          { text: "Expert in offline solutions", score: 4 }
        ]
      },
      {
        question: "How would you approach mobile testing?",
        options: [
          { text: "Manual testing", score: 1 },
          { text: "Implemented unit tests", score: 2 },
          { text: "Designed test automation", score: 3 },
          { text: "Expert in mobile QA", score: 4 }
        ]
      },
      {
        question: "What's your experience with app publishing?",
        options: [
          { text: "No publishing experience", score: 1 },
          { text: "Published simple apps", score: 2 },
          { text: "Managed complex release cycles", score: 3 },
          { text: "Expert in app distribution", score: 4 }
        ]
      },
      {
        question: "How familiar are you with mobile analytics?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Integrated analytics SDKs", score: 2 },
          { text: "Designed analytics strategies", score: 3 },
          { text: "Expert in mobile data analysis", score: 4 }
        ]
      },
      {
        question: "What's your experience with push notifications?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Implemented basic notifications", score: 2 },
          { text: "Designed notification strategies", score: 3 },
          { text: "Expert in engagement systems", score: 4 }
        ]
      },
      {
        question: "How would you approach mobile payments?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Integrated payment SDKs", score: 2 },
          { text: "Designed payment flows", score: 3 },
          { text: "Expert in mobile finance", score: 4 }
        ]
      },
      {
        question: "What's your experience with AR/VR in mobile?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Implemented basic AR/VR", score: 2 },
          { text: "Developed complex AR/VR apps", score: 3 },
          { text: "Expert in mobile AR/VR", score: 4 }
        ]
      },
      {
        question: "How familiar are you with mobile accessibility?",
        options: [
          { text: "Basic awareness", score: 1 },
          { text: "Implemented basic accessibility", score: 2 },
          { text: "Designed accessible apps", score: 3 },
          { text: "Expert in mobile accessibility", score: 4 }
        ]
      },
      {
        question: "What's your experience with IoT mobile apps?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Connected apps to IoT devices", score: 2 },
          { text: "Developed complex IoT solutions", score: 3 },
          { text: "Expert in mobile IoT", score: 4 }
        ]
      },
      {
        question: "How would you approach mobile game development?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Developed simple games", score: 2 },
          { text: "Built complex game engines", score: 3 },
          { text: "Expert in mobile gaming", score: 4 }
        ]
      },
      {
        question: "What's your experience with mobile CI/CD?",
        options: [
          { text: "No CI/CD experience", score: 1 },
          { text: "Set up basic pipelines", score: 2 },
          { text: "Designed complex workflows", score: 3 },
          { text: "Expert in mobile DevOps", score: 4 }
        ]
      },
      {
        question: "How familiar are you with mobile backend services?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Used BaaS platforms", score: 2 },
          { text: "Designed custom backends", score: 3 },
          { text: "Expert in mobile backend architecture", score: 4 }
        ]
      },
      {
        question: "What's your experience with wearables?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Developed simple wearable apps", score: 2 },
          { text: "Built complex wearable solutions", score: 3 },
          { text: "Expert in wearable technology", score: 4 }
        ]
      },
      {
        question: "How would you approach mobile localization?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Localized simple apps", score: 2 },
          { text: "Designed global-ready apps", score: 3 },
          { text: "Expert in internationalization", score: 4 }
        ]
      }
    ],
    devops: [
      {
        question: "What's your experience with CI/CD pipelines?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Set up basic pipelines", score: 2 },
          { text: "Designed complex workflows", score: 3 },
          { text: "Expert in CI/CD architecture", score: 4 }
        ]
      },
      {
        question: "How familiar are you with infrastructure as code?",
        options: [
          { text: "Basic awareness", score: 1 },
          { text: "Used Terraform/CloudFormation", score: 2 },
          { text: "Designed complex infrastructures", score: 3 },
          { text: "Expert in IaC patterns", score: 4 }
        ]
      },
      {
        question: "What's your experience with containerization?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Created Docker containers", score: 2 },
          { text: "Designed container architectures", score: 3 },
          { text: "Expert in container ecosystems", score: 4 }
        ]
      },
      {
        question: "How would you approach configuration management?",
        options: [
          { text: "Basic scripting", score: 1 },
          { text: "Used Ansible/Puppet/Chef", score: 2 },
          { text: "Designed configuration systems", score: 3 },
          { text: "Expert in configuration patterns", score: 4 }
        ]
      },
      {
        question: "What's your experience with monitoring solutions?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Set up monitoring tools", score: 2 },
          { text: "Designed observability systems", score: 3 },
          { text: "Expert in monitoring at scale", score: 4 }
        ]
      },
      {
        question: "How familiar are you with cloud platforms?",
        options: [
          { text: "Basic awareness", score: 1 },
          { text: "Worked with one cloud provider", score: 2 },
          { text: "Designed multi-cloud solutions", score: 3 },
          { text: "Expert in cloud architectures", score: 4 }
        ]
      },
      {
        question: "What's your experience with version control?",
        options: [
          { text: "Basic Git commands", score: 1 },
          { text: "Comfortable with branching", score: 2 },
          { text: "Designed workflows", score: 3 },
          { text: "Expert in version control systems", score: 4 }
        ]
      },
      {
        question: "How would you approach infrastructure security?",
        options: [
          { text: "Basic security measures", score: 1 },
          { text: "Implemented standard security", score: 2 },
          { text: "Designed security architectures", score: 3 },
          { text: "Expert in infrastructure security", score: 4 }
        ]
      },
      {
        question: "What's your experience with orchestration?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Managed Kubernetes clusters", score: 2 },
          { text: "Designed orchestration systems", score: 3 },
          { text: "Expert in large-scale orchestration", score: 4 }
        ]
      },
      {
        question: "How familiar are you with logging solutions?",
        options: [
          { text: "Basic log viewing", score: 1 },
          { text: "Set up logging tools", score: 2 },
          { text: "Designed log aggregation", score: 3 },
          { text: "Expert in log analysis", score: 4 }
        ]
      },
      {
        question: "What's your experience with performance tuning?",
        options: [
          { text: "Basic optimizations", score: 1 },
          { text: "Implemented standard tuning", score: 2 },
          { text: "Designed performance strategies", score: 3 },
          { text: "Expert in system optimization", score: 4 }
        ]
      },
      {
        question: "How would you approach disaster recovery?",
        options: [
          { text: "Basic backups", score: 1 },
          { text: "Implemented DR plans", score: 2 },
          { text: "Designed DR strategies", score: 3 },
          { text: "Expert in business continuity", score: 4 }
        ]
      },
      {
        question: "What's your experience with microservices?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Worked with microservices", score: 2 },
          { text: "Designed microservice architectures", score: 3 },
          { text: "Expert in distributed systems", score: 4 }
        ]
      },
      {
        question: "How familiar are you with serverless?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Deployed serverless functions", score: 2 },
          { text: "Designed serverless architectures", score: 3 },
          { text: "Expert in serverless patterns", score: 4 }
        ]
      },
      {
        question: "What's your experience with databases in DevOps?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Managed database deployments", score: 2 },
          { text: "Designed database strategies", score: 3 },
          { text: "Expert in database DevOps", score: 4 }
        ]
      },
      {
        question: "How would you approach infrastructure costs?",
        options: [
          { text: "Basic cost awareness", score: 1 },
          { text: "Implemented cost controls", score: 2 },
          { text: "Designed cost-efficient architectures", score: 3 },
          { text: "Expert in cloud economics", score: 4 }
        ]
      },
      {
        question: "What's your experience with networking in DevOps?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Configured networks", score: 2 },
          { text: "Designed network architectures", score: 3 },
          { text: "Expert in cloud networking", score: 4 }
        ]
      },
      {
        question: "How familiar are you with GitOps?",
        options: [
          { text: "Basic awareness", score: 1 },
          { text: "Implemented basic GitOps", score: 2 },
          { text: "Designed GitOps workflows", score: 3 },
          { text: "Expert in GitOps patterns", score: 4 }
        ]
      },
      {
        question: "What's your experience with compliance in DevOps?",
        options: [
          { text: "Basic awareness", score: 1 },
          { text: "Implemented compliance controls", score: 2 },
          { text: "Designed compliance frameworks", score: 3 },
          { text: "Expert in regulatory DevOps", score: 4 }
        ]
      },
      {
        question: "How would you approach DevOps culture?",
        options: [
          { text: "Basic understanding", score: 1 },
          { text: "Promoted collaboration", score: 2 },
          { text: "Led DevOps transformations", score: 3 },
          { text: "Expert in organizational DevOps", score: 4 }
        ]
      }
    ]
  };

  export default preDefinedQuestions