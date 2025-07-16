const cameraBox = document.getElementById("liveView");
const cameraList = document.getElementById("cameraList");
const listDanger = document.querySelector(".alert-high .list");
const listMedium = document.querySelector(".alert-medium .list");
const listNormal = document.querySelector(".alert-normal .list");
const allList = document.querySelectorAll(".list");
const sideBar = document.querySelector(".sidebar");
const showSideBarBtn = document.getElementById("btnShowSidebar");
const hideSidebarBtn = document.querySelector(".sidebar-close");
const toggleAlertsBtn = document.querySelector(".close-alerts");
const alertColors = {
  high: "red",
  medium: "orange",
  normal: "green",
};

const fakeApiCamera = [
  { id: 1, name: "دوربین 1", status: true },
  { id: 2, name: "دوربین 2", status: false },
  { id: 3, name: "دوربین 3", status: true },
  { id: 4, name: "دوربین 4", status: true },
  { id: 5, name: "دوربین 5", status: false },
];

const fakeAlerts = [
  {
    id: 1,
    subject: "تشخیص حرکت غیر عادی",
    level: "high",
    location: "حیاط",
    time: "12:23",
  },
  {
    id: 2,
    subject: "باز شدن درب",
    level: "medium",
    location: "پارکینگ",
    time: "14:05",
  },
  {
    id: 3,
    subject: "تشخیص صدا بلند",
    level: "normal",
    location: "سالن",
    time: "16:45",
  },
  {
    id: 4,
    subject: "حرکت مشکوک ثبت شد",
    level: "high",
    location: "حیاط جنوبی",
    time: "17:15",
  },
  {
    id: 5,
    subject: "درب عقب باز شد",
    level: "medium",
    location: "انبار",
    time: "18:30",
  },
  {
    id: 6,
    subject: "حرکت کوچک تشخیص داده شد",
    level: "normal",
    location: "حیاط غربی",
    time: "19:50",
  },
];

function playCamera(name) {
  cameraBox.style.backgroundColor = "#ecf0f1";
  cameraBox.innerHTML = `<span>${name}</span>`;

  setTimeout(() => {
    cameraBox.innerHTML = `
      <iframe src="https://telewebion.com/live/hdtest" frameborder="0"></iframe>
    `;
  }, 700);
}

function renderCameraList() {
  cameraBox.textContent = "دوربینی را انتخاب کنید";
  cameraList.innerHTML = "";

  fakeApiCamera.forEach(({ id, name, status }) => {
    const div = document.createElement("div");
    div.className = `camera-item ${!status ? "offline" : ""}`;
    div.dataset.id = id;
    div.dataset.status = status;
    div.textContent = `${status ? "🟢" : "🔴"} - ${name}`;

    div.addEventListener("click", () => {
      document
        .querySelectorAll(".camera-item")
        .forEach((item) => item.classList.remove("active"));
      div.classList.add("active");

      if (status) {
        playCamera(`📷 تصویر زنده ${name}`);
      } else {
        cameraBox.textContent = "⛔️ آفلاین";
        cameraBox.style.backgroundColor = "#e0e0e0";
      }
    });

    cameraList.appendChild(div);
  });
}

function renderAlerts() {
  [listDanger, listMedium, listNormal].forEach((list) => (list.innerHTML = ""));

  fakeAlerts.forEach(({ subject, level, location, time }) => {
    const list =
      level === "high"
        ? listDanger
        : level === "medium"
        ? listMedium
        : listNormal;
    const li = `
      <li class="item">
        <div class="title">
          <span>${subject}</span>
          <button class="btn-detail">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${alertColors[level]}" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
          </button>
        </div>
        <div class="detail hide">
          <span>موقعیت: ${location}</span>
          <span> ${time}</span>
        </div>
      </li>
    `;
    list.insertAdjacentHTML("beforeend", li);
  });
}

function handleListClicks() {
  allList.forEach((list) =>
    list.addEventListener("click", function (e) {
      const li = e.target.closest("li");
      if (li) {
        li.classList.toggle("show-detail");
      }
    })
  );
}
let closeAlerts = false;
function toggleShowAlerts() {
  if (!closeAlerts) {
    allList.forEach((list) => (list.innerHTML = ""));
    toggleAlertsBtn.textContent = "نشون دادن";
    closeAlerts = true;
  } else {
    renderAlerts();
    toggleAlertsBtn.textContent = "بیصدا کردن";
    closeAlerts = false;
  }
}

function toggleSidebar() {
  sideBar.classList.toggle("show-sidebar");
}

window.addEventListener("load", () => {
  renderCameraList();
  renderAlerts();
  handleListClicks();
});

showSideBarBtn.addEventListener("click", toggleSidebar);
hideSidebarBtn.addEventListener("click", toggleSidebar);
toggleAlertsBtn.addEventListener("click", toggleShowAlerts);
