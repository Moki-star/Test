const loginBtn = document.getElementById("googleLoginBtn");
const usernameSection = document.getElementById("usernameSection");
const usernameInput = document.getElementById("usernameInput");
const saveUsernameBtn = document.getElementById("saveUsernameBtn");

const profile = document.getElementById("profile");
const profileName = document.getElementById("profileName");
const profileScore = document.getElementById("profileScore");

let puzzles = [];
let currentPuzzleIndex = 0;
let currentUser = null;
let userDocRef = null;

loginBtn.onclick = async () => {
  const { auth, db, signInWithPopup, GoogleAuthProvider, doc, getDoc } = window.firebase;
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    currentUser = user;
    userDocRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDocRef);

    if (ADMIN_UIDS.includes(user.uid)) {
      loadAdminPanel();
      return;
    }

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const now = Date.now();
      if (userData.cooldownEndTime && now < userData.cooldownEndTime) {
        showCooldown(userData.cooldownEndTime);
      } else {
        showProfile(userData.username, userData.score);
        await loadPuzzles();
        showPuzzle();
      }
    } else {
      usernameSection.classList.remove("hidden");
      saveUsernameBtn.onclick = async () => {
        const username = usernameInput.value.trim();
        if (username) {
          await window.firebase.setDoc(userDocRef, {
            username,
            score: 0,
            consecutiveLosses: 0
          });
          showProfile(username, 0);
          await loadPuzzles();
          showPuzzle();
        }
      };
    }
  } catch (error) {
    alert("Login failed: " + error.message);
  }
};

function showProfile(username, score) {
  usernameSection.classList.add("hidden");
  profile.classList.remove("hidden");
  profileName.textContent = username;
  profileScore.textContent = score;
  loadLeaderboard();
}

async function loadPuzzles() {
  const res = await fetch("puzzles.json");
  puzzles = await res.json();
  currentPuzzleIndex = Math.floor(Math.random() * puzzles.length);
}

function showPuzzle() {
  if (!puzzles.length) return;
  const q = puzzles[currentPuzzleIndex];
  document.getElementById("questionText").textContent = q.question;
  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option, q.answer);
    optionsContainer.appendChild(btn);
  });
  document.getElementById("gameArea").classList.remove("hidden");
}

async function checkAnswer(selected, correct) {
  const isCorrect = selected === correct;
  const { db, doc, updateDoc, getDoc } = window.firebase;
  const userSnap = await getDoc(userDocRef);
  const userData = userSnap.data();

  if (isCorrect) {
    const newScore = userData.score + 1;
    await updateDoc(userDocRef, {
      score: newScore,
      consecutiveLosses: 0
    });
    showResult("အမယ်‌ ကြောက်စရာကြီး");
    profileScore.textContent = newScore;
  } else {
    const newLoss = (userData.consecutiveLosses || 0) + 1;
    let update = {
      consecutiveLosses: newLoss
    };
    if (newLoss >= 3) {
      const cooldownEnd = Date.now() + 60 * 60 * 1000;
      update.cooldownEndTime = cooldownEnd;
      showCooldown(cooldownEnd);
    } else {
      showResult("အရမ်းတော်တယ် ပိန်းတဲ့နေရာမှာ");
    }
    await updateDoc(userDocRef, update);
  }
}

function showResult(msg) {
  document.getElementById("resultMessage").textContent = msg;
  document.getElementById("resultModal").classList.remove("hidden");
  document.getElementById("gameArea").classList.add("hidden");
}

function loadNextPuzzle() {
  document.getElementById("resultModal").classList.add("hidden");
  currentPuzzleIndex = Math.floor(Math.random() * puzzles.length);
  showPuzzle();
}

function showCooldown(endTime) {
  document.getElementById("gameArea").classList.add("hidden");
  document.getElementById("resultModal").classList.add("hidden");
  document.getElementById("cooldown").classList.remove("hidden");

  const timer = document.getElementById("cdTimer");
  const interval = setInterval(() => {
    const now = Date.now();
    const diff = endTime - now;
    if (diff <= 0) {
      clearInterval(interval);
      document.getElementById("cooldown").classList.add("hidden");
      loadNextPuzzle();
      return;
    }
    const hrs = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const mins = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const secs = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    timer.textContent = `${hrs}:${mins}:${secs}`;
  }, 1000);
}

async function loadLeaderboard() {
  const { db, collection, getDocs, query, orderBy, limit } = window.firebase;
  const q = query(collection(db, "users"), orderBy("score", "desc"), limit(10));
  const querySnapshot = await getDocs(q);
  const list = document.getElementById("leaderboardList");
  list.innerHTML = "";
  querySnapshot.forEach(doc => {
    const user = doc.data();
    const li = document.createElement("li");
    li.textContent = `${user.username}: ${user.score}`;
    list.appendChild(li);
  });
  document.getElementById("leaderboard").classList.remove("hidden");
}

async function loadAdminPanel() {
  const { db, collection, getDocs, deleteDoc, doc } = window.firebase;
  const querySnapshot = await getDocs(collection(db, "users"));
  const tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = "";
  querySnapshot.forEach(userDoc => {
    const user = userDoc.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user.username}</td>
      <td>${user.score}</td>
      <td>${user.consecutiveLosses || 0}</td>
      <td>${user.cooldownEndTime ? new Date(user.cooldownEndTime).toLocaleString() : "None"}</td>
      <td><button onclick="deleteUser('${userDoc.id}')">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });
  document.getElementById("adminPanel").classList.remove("hidden");
}

async function deleteUser(uid) {
  const { db, doc, deleteDoc } = window.firebase;
  if (confirm("Are you sure you want to delete this user?")) {
    await deleteDoc(doc(db, "users", uid));
    alert("User deleted.");
    loadAdminPanel();
  }
}
