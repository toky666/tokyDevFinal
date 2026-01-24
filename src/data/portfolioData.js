const portafolioData = [
  {
    imgSrc: "/img/portfolios/olakontaIMG.png",
    title: "Free Financial and Professional Education",
    skills: ["CSS", "HTML", "JavaScript"],
    excerpt:
      "It is a platform that offers accessible courses and training in areas such as accounting, corporate finance, financial mathematics and customer service, with the aim of promoting personal, professional and business development.",
    demoURL: "https://olakonta.vercel.app/",
    repoURL: "https://github.com/toky666/olakonta",
    description: `<p><strong>Ola Konta</strong> is a free educational platform dedicated to providing training programs in finance, accounting, and professional development. <strong>Its mission</strong> is to promote key skills such as collaboration, communication, decision-making and practical use of technology. It offers courses in areas such as: <strong>Banking Accounting, Financial Mathematics, Corporate Finance and Excel for Management.</strong></p>`,
  },
  {
    imgSrc: "/img/portfolios/bancosIMG.png",
    title: "Banking Community – Accounting and Finance Platform",
    skills: ["CSS", "HTML", "JavaScript"],
    excerpt:
      "An educational and collaborative initiative that brings together students and professionals to share financial statements, experiences, and resources about banking in Bolivia.",
    demoURL: "https://bancos-web.vercel.app/",
    repoURL: "https://github.com/toky666/Bancos-Web",
    description: `<p><strong>Comunidad Bancos</strong> is a virtual platform created by students to simplify the learning of banking accounting and finance. Their mission is to <strong>offer up-to-date information</strong> and practical tools that improve academic and professional performance.</p>`,
  },
  {
    imgSrc: "/img/portfolios/costoIMG.png",
    title: "Costos Web – Cost Management and Analysis Platform",
    skills: ["CSS", "HTML", "JavaScript"],
    excerpt:
      "Costos Web is an educational and practical tool designed to support students and professionals in calculating, analyzing, and controlling business costs.",
    demoURL: "https://costos-web.vercel.app/",
    repoURL: "https://github.com/toky666/Costos-Web",
    description: `<p>It allows you to understand and apply key concepts of <strong>cost accounting, budgeting, and financial management.</strong> It promotes values ​​of <strong>precision, transparency and efficiency</strong>, helping to train professionals capable of making strategic decisions based on data.</p>`,
  },
];

export const skillIcons = {
  JavaScript: "skill-icons:javascript",
  React: "skill-icons:react-dark",
  Astro: "skill-icons:astro",
  CSS: "vscode-icons:file-type-css",
  Sass: "skill-icons:sass",
  StyledComponents: "skill-icons:styledcomponents",
  Bootstrap: "devicon:bootstrap",
  Tailwind: "skill-icons:tailwindcss-dark",
  NodeJs: "skill-icons:nodejs-dark",
  Express: "skill-icons:expressjs-dark",
  MySQL: "skill-icons:mysql-dark",
  Wordpress: "skill-icons:wordpress",
  HTML: "skill-icons:html",
  Vue: "skill-icons:vuejs-dark",
  GraphQL: "skill-icons:graphql-dark",
};
const skillsIconsMapped = portafolioData.map((item) => {
  return {
    ...item,
    skills: item.skills.map((skiil) => skillIcons[skiil]),
  };
});

export { portafolioData, skillsIconsMapped };
