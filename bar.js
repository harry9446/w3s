const skills = [
      { icon: "fa-code", title: "Web Dev", percentage: 95, info: "HTML, CSS, JS, React" },
      { icon: "fa-paint-brush", title: "UI/UX", percentage: 85, info: "Figma, Adobe XD" },
      { icon: "fa-database", title: "Database", percentage: 75, info: "MySQL, MongoDB" },
      { icon: "fa-robot", title: "AI Tools", percentage: 70, info: "OpenAI, APIs" },
      { icon: "fa-mobile", title: "Responsive", percentage: 90, info: "Flex/Grid, Media" },
    ];

    const container = document.getElementById("skills-box");
    const hoverSound = document.getElementById("hover-sound");

    skills.forEach((skill, i) => {
      const card = document.createElement("div");
      card.className = "skill-card";
      card.setAttribute("data-tilt", "");
      card.setAttribute("data-tilt-scale", "1.05");
      card.setAttribute("data-tilt-speed", "1000");
      card.setAttribute("role", "listitem");

      card.innerHTML = `
        <div class="icon"><i class="fas ${skill.icon}"></i></div>
        <div class="title">${skill.title}</div>
        <div class="tooltip">${skill.info}</div>
        <div class="circle-container">
          <svg width="110" height="110">
            <circle class="circle-bg" r="50" cx="55" cy="55" />
            <circle class="circle-fill" r="50" cx="55" cy="55" stroke="url(#gradientStroke)" stroke-dasharray="314" />
          </svg>
          <div class="percentage-text">${skill.percentage}%</div>
        </div>
        <div class="progress-line">
          <div class="progress-fill" data-value="${skill.percentage}"></div>
        </div>
      `;

      card.addEventListener("mouseenter", () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
      });

      container.appendChild(card);
    });

    window.onload = () => {
      VanillaTilt.init(document.querySelectorAll(".skill-card"));
    };

    gsap.from(".skill-card", {
      y: 80,
      opacity: 0,
      stagger: 0.2,
      duration: 1.2,
      ease: "power3.out"
    });

    document.querySelectorAll(".progress-fill").forEach((bar, i) => {
      let val = bar.getAttribute("data-value");
      gsap.to(bar, {
        width: val + "%",
        duration: 2,
        delay: 0.2 * i,
        ease: "power2.out"
      });
    });

    document.querySelectorAll(".circle-fill").forEach((circle, i) => {
      let val = skills[i].percentage;
      const offset = 314 - (314 * val) / 100;
      gsap.to(circle, {
        strokeDashoffset: offset,
        duration: 2,
        delay: 0.3 * i,
        ease: "power2.out"
      });
    });